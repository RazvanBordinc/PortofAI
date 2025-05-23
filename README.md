# PortofAI: AI-Powered Portfolio Assistant

<div align="center">

[![Frontend](https://img.shields.io/badge/Frontend-Next.js_15.3.1-black?style=flat-square&logo=next.js)](https://github.com/RazvanBordinc/PortofAI-client)
[![Backend](https://img.shields.io/badge/Backend-.NET_9.0-512BD4?style=flat-square&logo=dotnet)](https://github.com/RazvanBordinc/PortofAI-server)
[![Gemini AI](https://img.shields.io/badge/AI-Gemini_2.0-8BBEE8?style=flat-square&logo=google)](https://ai.google.dev/)
[![Redis](https://img.shields.io/badge/Database-Redis-DC382D?style=flat-square&logo=redis)](https://redis.io/)
[![Docker](https://img.shields.io/badge/Container-Docker-2496ED?style=flat-square&logo=docker)](https://www.docker.com/)

**An intelligent conversational interface powered by AI to showcase my skills, projects, and experience**

<div style="margin: 20px 0">
  <a href="https://github.com/RazvanBordinc/PortofAI-client">📱 Frontend Repository</a> • 
  <a href="https://github.com/RazvanBordinc/PortofAI-server">⚙️ Backend Repository</a>
</div>

[Live Demo](https://portofai.vercel.app/) • [Features](#-features) • [Architecture](#-architecture) • [Tech Stack](#-tech-stack) • [Setup](#-setup) • [Development](#-development) • [Deployment](#-deployment)

![PortofAI Banner](./assets/banner.png)

</div>

## 🔍 Overview

PortofAI is a modern, AI-powered portfolio application that replaces traditional static portfolio websites with an interactive conversational interface. Visitors can ask questions about my skills, experience, projects, and background through a chat interface and receive detailed, contextually relevant responses in real-time.

The application consists of a Next.js frontend for the chat interface and an ASP.NET Core backend that leverages Google's Gemini AI to generate intelligent responses. The backend fetches my latest information from GitHub, ensuring all AI responses contain current and accurate details.

## ✨ Features

### 💬 Interactive Chat Experience

- **AI-Powered Conversations** - Natural language interactions about my work and skills
- **Real-time Streaming Responses** - Watch AI responses appear with realistic typing animations
- **Multiple Response Styles** - Switch between formal, explanatory, or conversational tones
- **Rich Text Formatting** - Support for markdown, code blocks, links, and email formatting
- **Conversation History** - Persistent chat context throughout the session

### 🔄 Intelligent Context Management

- **GitHub Integration** - Automatically pulls the latest information about me from GitHub
- **Smart Portfolio Context** - Enhances AI responses with relevant portfolio information
- **Conversation Memory** - Maintains context throughout the chat session

### 🛡️ Robust System Design

- **Rate Limiting** - Prevents abuse with IP-based request limits
- **Docker Containerization** - Consistent deployment across environments
- **Redis Caching** - Efficient data storage and retrieval
- **Error Resilience** - Graceful degradation with comprehensive error handling

### 📱 Modern UI/UX

- **Responsive Design** - Works seamlessly across mobile, tablet, and desktop
- **Light and Dark Themes** - User-selectable interface themes
- **Animated Interactions** - Smooth transitions and micro-animations
- **Accessibility Focus** - Designed with keyboard navigation and screen reader support

## 🏗️ Architecture

PortofAI follows a modern microservices architecture with clearly separated frontend and backend components:

```
┌─────────────────────┐       ┌─────────────────────┐
│                     │       │                     │
│   Next.js Frontend  │◄─────►│   ASP.NET Backend   │
│                     │       │                     │
└─────────────────────┘       └──────────┬──────────┘
                                        │
                                        ▼
                              ┌─────────────────────┐
                              │                     │
                              │   Redis Database    │
                              │                     │
                              └──────────┬──────────┘
                                        │
                                        ▼
                       ┌────────────────────────────────┐
                       │                                │
                       │  External Services (Gemini AI, │
                       │  GitHub, SendGrid)             │
                       │                                │
                       └────────────────────────────────┘
```

### Data Flow

1. User sends a message through the Next.js frontend
2. Frontend sends the message to the ASP.NET backend API
3. Backend enriches the prompt with portfolio data from Redis
4. Enhanced prompt is sent to the Gemini AI service
5. AI response is streamed back to the frontend in real-time
6. Conversation history is stored in Redis for context preservation

## 🛠️ Tech Stack

### Frontend (Next.js)

- Next.js 15.3.1 with React 19.0.0
- Tailwind CSS 4 for styling
- Framer Motion for animations
- Server-Sent Events (SSE) for real-time streaming

### Backend (ASP.NET Core)

- .NET 9.0 with ASP.NET Core
- Server-Sent Events for response streaming
- StackExchange.Redis for Redis interaction
- SendGrid for email processing

### Database

- Redis (Upstash for production)
- In-memory rate limiting
- Conversation storage
- Portfolio data caching

### AI & External Services

- Google Gemini AI (gemini-2.0-flash model)
- GitHub repository integration
- SendGrid email service

### DevOps & Infrastructure

- Docker for containerization
- Docker Compose for local development
- Production deployments on Render (backend) and Vercel (frontend)

## 🚀 Setup

### Prerequisites

- [Docker](https://www.docker.com/get-started) and [Docker Compose](https://docs.docker.com/compose/install/)
- [.NET 9.0 SDK](https://dotnet.microsoft.com/download) (for local backend development)
- [Node.js 18+](https://nodejs.org/) (for local frontend development)
- Google Gemini API key
- SendGrid API key (optional, for contact form)
- Upstash Redis instance (for production)

### Clone the Repository

```bash
git clone https://github.com/yourusername/portofai.git
cd portofai
```

### Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Required for development
GOOGLE_API_KEY=your-google-api-key

# Optional for development (default values will be used)
ALLOWED_ORIGINS=http://localhost:3000
SENDGRID_API_KEY=your-sendgrid-api-key

# Required only for production
UPSTASH_REDIS_CONNECTION_STRING=your-upstash-redis-connection-string
ASPNETCORE_ENVIRONMENT=Production
```

## 💻 Development

### Using Docker Compose (recommended)

Start all services with a single command:

```bash
docker-compose up
```

This will launch:

- Frontend on http://localhost:3000
- Backend on http://localhost:5189
- Redis instance on port 6379

To rebuild after making changes:

```bash
docker-compose up --build
```

### Local Development (without Docker)

#### Backend

```bash
cd Portfolio-server
dotnet restore
dotnet run
```

#### Frontend

```bash
cd portfolio-client
npm install
npm run dev
```

Note: You'll need to have Redis running locally or configure the backend to use an external Redis instance.

## 📦 Project Structure

```
portofai/
├── Portfolio-server/           # ASP.NET Core backend
│   ├── Controllers/            # API endpoints
│   ├── Services/               # Business logic
│   ├── Models/                 # Data models
│   ├── Dockerfile             # Backend container definition
│   └── ...
│
├── portfolio-client/           # Next.js frontend
│   ├── app/                   # Next.js App Router
│   ├── components/            # React components
│   ├── lib/                   # Utilities
│   ├── Dockerfile             # Frontend container definition
│   └── ...
│
├── docker-compose.yml         # Services orchestration
├── .env                       # Environment variables
└── README.md                  # This file
```

## 🌐 Deployment

### Production Infrastructure

For optimal performance and cost-effectiveness, the recommended production setup is:

- **Frontend**: Deploy on Vercel
- **Backend**: Deploy on Render using Docker
- **Redis**: Use Upstash Redis

### Backend Deployment on Render

1. Create a new Web Service in Render
2. Link your GitHub repository
3. Specify the Dockerfile path: `./Portfolio-server/Dockerfile`
4. Configure environment variables:
   - `PORT`: 10000 (Render will set this automatically)
   - `GOOGLE_API_KEY`: Your Gemini API key
   - `UPSTASH_REDIS_CONNECTION_STRING`: Your Upstash Redis connection string
   - `ALLOWED_ORIGINS`: Your frontend URL (e.g., https://portofai.vercel.app)
   - `SENDGRID_API_KEY`: Your SendGrid API key
   - `ASPNETCORE_ENVIRONMENT`: Production

### Frontend Deployment on Vercel

1. Import your GitHub repository to Vercel
2. Set the root directory to `./portfolio-client`
3. Configure environment variables:
   - `NEXT_PUBLIC_API_URL`: Your Render backend URL

## ⚙️ Configuration

### Environment Variables

| Variable                          | Description                            | Required                              | Default                                   |
| --------------------------------- | -------------------------------------- | ------------------------------------- | ----------------------------------------- |
| `GOOGLE_API_KEY`                  | API key for Gemini AI                  | Yes                                   | None                                      |
| `UPSTASH_REDIS_CONNECTION_STRING` | Redis connection string for production | Production only                       | redis:6379,password=VeryPasswordStrongIs2 |
| `ALLOWED_ORIGINS`                 | CORS allowed origins                   | No                                    | http://localhost:3000                     |
| `SENDGRID_API_KEY`                | API key for SendGrid email             | No (Contact form disabled without it) | None                                      |
| `ASPNETCORE_ENVIRONMENT`          | Environment name                       | No                                    | Development                               |

### Rate Limiting

- **Chat Requests**: 15 requests per IP address per 24 hours
- **Contact Form**: 2 email submissions per IP address per 24 hours

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

For questions, feedback, or collaboration opportunities:

- Email: [bordincrazvan2004@gmail.com](mailto:bordincrazvan2004@gmail.com)
- LinkedIn: [Razvan Bordinc](https://linkedin.com/in/valentin-r%C4%83zvan-bord%C3%AEnc-30686a298/)
- GitHub: [RazvanBordinc](https://github.com/RazvanBordinc)

---

<div align="center">

### Built with ❤️ by Razvan Bordinc

</div>
