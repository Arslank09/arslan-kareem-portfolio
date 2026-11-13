// Everything the portfolio assistant is allowed to know about Arslan.
// Files starting with "_" inside /api are NOT deployed as endpoints by Vercel.
// Edit this text to update what the assistant knows.

export const KNOWLEDGE = `
# Arslan Kareem: profile

## Basics
- Full name: Arslan Kareem
- Current role: Junior AI Engineer at EHB Technologies (SMC-Private) Ltd, Islamabad (2026 to present)
- Student: BS Computer Science at Federal Urdu University of Arts, Science & Technology (FUUAST), Islamabad (2023 to present)
- Location: Islamabad, Pakistan
- Languages spoken: English, Urdu, Hindko

## Contact
- Email: arslankarim9963@gmail.com
- Phone: +92 311 8892301
- LinkedIn: https://www.linkedin.com/in/arslankareem
- GitHub: https://github.com/Arslank09
- Portfolio: https://arslankareem.vercel.app
- For jobs, internships, freelance or collaboration, the best way is email or LinkedIn.

## Education & training
- BS Computer Science, Federal Urdu University, Islamabad (2023 to present)
- ICS (Intermediate in Computer Science), GDC Balakot (2019 to 2021)
- AI & Data Analytics Program covering:
  - Python, NumPy and Pandas (EDA, data cleaning)
  - Seaborn, Plotly and Streamlit dashboards
  - SQL and SQLite
  - Machine learning with Scikit-learn (supervised and unsupervised), and model evaluation
  - Deep learning
  - OpenAI API and LangChain
  - Deployment on Streamlit Cloud

## Work at EHB Technologies (Junior AI Engineer, 2026 to present)
He works across a multi-service platform (commerce, identity, payments and analytics). It uses Next.js frontends, NestJS microservices and a Python AI service. In 2026 he made 740+ commits across 17 production repositories.
- Conversational AI & LLM agents:
  - Tool-calling assistants built with Python, FastAPI, LangChain and LangGraph, for buyers, sellers, delivery riders and back-office staff.
  - Each role can only use its own tools, and sessions are kept separate.
  - Supports several model providers (OpenAI, Anthropic, Groq, Hugging Face), conversation memory and streaming (SSE) replies.
- An AI finance assistant for an internal admin console, which lets non-technical staff ask about live business data in plain language.
- A RAG pipeline on pgvector, with query-embedding caching, health checks and evaluation suites.
- English, Roman Urdu and Urdu language detection, plus a translation service.
- AI safety guardrails: input filtering, cleaning model replies, removing internal IDs, and blocking leaked credentials. All covered by automated regression tests.
- Hybrid product search: PostgreSQL full-text search plus fuzzy (pg_trgm) matching plus vector embeddings, combined with rank fusion.
- A real-time buyer–seller chat built end to end with NestJS, Socket.IO and Redis. It shows who is online, has moderation and rate limits, sends browser push notifications, and has FAQ auto-replies with handover to a human.
- Identity and verification (KYC/KYB) workflows using NestJS, Prisma and PostgreSQL, with signed webhooks, Redis caching and audit logs.
- A code-based single sign-on (SSO) flow, a transactional outbox with retries, and rate limiting on Redis with an in-memory fallback.
- Marketplace pricing features:
  - Price suggestions tested in shadow mode before launch, and flash discounts.
  - Demand tracking from search data, and automated price negotiation.
  - Blocking of contact details shared in chat.
- Wallet features: top-ups, buying credits, service charges and daily spending limits.
- Analytics dashboards and a community module (posts, threaded comments, reactions) in React and Next.js.

## Personal projects
- AI Shopping Copilot (FastAPI + React):
  - Answers product questions from a live catalogue.
  - Recommends products when a user describes a need (e.g. "my AC broke").
  - Replies in English or Roman Urdu and works with any OpenAI-compatible model.
  - https://github.com/Arslank09/ecommerce-ai-Assistant
- News Summarizer: a T5-small model fine-tuned on CNN/DailyMail for abstractive summarisation, with a Streamlit app (PyTorch, Hugging Face Transformers). https://github.com/Arslank09/t5-news-summarizer
- Legal RAG (in progress): retrieval-augmented question answering over Pakistani law, with cited answers. https://github.com/Arslank09/legal_rag-pk
- Inventory Management System: an object-oriented Python CLI with role-based login, product CRUD and low-stock alerts. https://github.com/Arslank09/Inventory-Management-System
- This portfolio website: minimal design, parallax scrolling, a loading screen and this AI assistant (running on Groq), deployed on Vercel. https://github.com/Arslank09/arslan-kareem-portfolio

## Skills
- AI / ML:
  - LLMs, tool calling, LangChain, LangGraph, RAG, embeddings, pgvector
  - Prompt engineering, guardrails, evaluation
  - OpenAI / Anthropic / Groq APIs, Hugging Face, PyTorch, TensorFlow, Scikit-learn, n8n
- Backend: Python, FastAPI, TypeScript, NestJS, Prisma, REST, WebSockets, SSE, webhooks, the outbox pattern, rate limiting, SSO
- Frontend: React, Next.js, HTML, CSS, JavaScript, Streamlit
- Data & infrastructure: PostgreSQL, SQL, SQLite, Redis, Pandas, NumPy, Seaborn, Plotly, Docker, Git, GitHub, Vercel
- Other languages: Java, C++ (basics)
- Soft skills: communication, leadership and team coordination, problem solving, time management, teamwork
`;
