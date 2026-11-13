(() => {
  const root = document.getElementById("assistant");
  if (!root) return;

  const toggle = root.querySelector(".assistant__toggle");
  const panel = root.querySelector(".assistant__panel");
  const closeBtn = root.querySelector(".assistant__close");
  const list = root.querySelector(".assistant__messages");
  const form = root.querySelector(".assistant__form");
  const input = root.querySelector(".assistant__input");
  const send = root.querySelector(".assistant__send");
  const chips = root.querySelector(".assistant__chips");

  const history = []; // {role, content}
  let busy = false;

  /* ---------- open / close ---------- */
  function open() {
    root.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    panel.hidden = false;
    setTimeout(() => input.focus(), 50);
  }
  function close() {
    root.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    panel.hidden = true;
    toggle.focus();
  }
  toggle.addEventListener("click", () => (root.classList.contains("is-open") ? close() : open()));
  closeBtn.addEventListener("click", close);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && root.classList.contains("is-open")) close();
  });

  /* ---------- rendering (escape first, then tiny markdown) ---------- */
  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  function format(text) {
    let html = escapeHtml(text);
    html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/(https?:\/\/[^\s)<]+[^\s)<.,;:!?])/g, '<a href="$1" target="_blank" rel="noopener">$1</a>');
    html = html.replace(/([\w.+-]+@[\w-]+\.[\w.]+)/g, '<a href="mailto:$1">$1</a>');
    // bullet lines
    html = html
      .split("\n")
      .map((line) => (/^\s*[-•*]\s+/.test(line) ? "<li>" + line.replace(/^\s*[-•*]\s+/, "") + "</li>" : line))
      .join("\n")
      .replace(/(?:<li>.*<\/li>\n?)+/g, (m) => "<ul>" + m.replace(/\n/g, "") + "</ul>");
    return html.replace(/\n/g, "<br>");
  }
  function addMessage(role, text, extraClass = "") {
    const el = document.createElement("div");
    el.className = `assistant__msg assistant__msg--${role} ${extraClass}`.trim();
    el.innerHTML = role === "user" ? escapeHtml(text) : format(text);
    list.appendChild(el);
    list.scrollTop = list.scrollHeight;
    return el;
  }
  function addTyping() {
    const el = document.createElement("div");
    el.className = "assistant__msg assistant__msg--assistant assistant__typing";
    el.setAttribute("aria-label", "Assistant is typing");
    el.innerHTML = "<span></span><span></span><span></span>";
    list.appendChild(el);
    list.scrollTop = list.scrollHeight;
    return el;
  }

  /* ---------- sending ---------- */
  async function ask(question) {
    question = question.trim();
    if (!question || busy) return;
    busy = true;
    send.disabled = true;
    chips.hidden = true;

    addMessage("user", question);
    history.push({ role: "user", content: question });
    input.value = "";
    autoSize();
    const typing = addTyping();

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history.slice(-8) }),
      });
      const data = await res.json().catch(() => ({}));
      typing.remove();
      if (!res.ok || !data.reply) {
        addMessage("assistant", data.error || "Sorry, something went wrong. Please try again.", "is-error");
        history.pop(); // don't keep the unanswered question in context
      } else {
        addMessage("assistant", data.reply);
        history.push({ role: "assistant", content: data.reply });
      }
    } catch {
      typing.remove();
      addMessage("assistant", "I couldn't reach the server. Check your connection and try again.", "is-error");
      history.pop();
    } finally {
      busy = false;
      send.disabled = false;
      input.focus();
    }
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    ask(input.value);
  });
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      ask(input.value);
    }
  });
  function autoSize() {
    input.style.height = "auto";
    input.style.height = Math.min(input.scrollHeight, 110) + "px";
  }
  input.addEventListener("input", autoSize);

  chips.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (b) ask(b.dataset.q || b.textContent);
  });
})();
