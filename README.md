# Sagar D. — Personal Portfolio & Creative Studio

A modern, interactive portfolio website for **Sagar D.** — Python Developer, Web Developer, and AI Digital Creator. Features an interactive 3D particle canvas (Three.js), project showcase with live previews, administrative studio for instant in-browser customization, and integrated AI assistant.

---

## ✨ Key Features

- **Interactive 3D Visuals**: Three.js particle waves, interactive galaxy canvas, and smooth motion transitions.
- **Project Showcase & Case Studies**: Filterable project gallery with modal case studies, GitHub links, and live demos.
- **Owner Admin Studio**: Built-in editing suite allowing live editing of bio, projects, skills, and pricing packages with custom passcode security.
- **AI Virtual Assistant**: Interactive AI assistant powered by Google Gemini to answer questions about skills, experience, and contact details.
- **Dark / Light Modes**: Full theme support with persistent state.
- **Resume Viewer & Download**: Integrated interactive resume reader and download actions.
- **Responsive Architecture**: Fully responsive across mobile, tablet, and ultra-wide screens.

---

## 🚀 Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Motion (`motion/react`), Three.js (`three`), Lucide Icons (`lucide-react`)
- **Backend**: Node.js, Express, Vite middleware
- **AI Integration**: `@google/genai` (Google Gemini SDK)
- **Bundler**: Vite & esbuild

---

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18+ recommended)
- `npm` or `pnpm` or `yarn`

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/sagar-d-portfolio.git
   cd sagar-d-portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables** (Optional for AI assistant):
   Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Add your Gemini API key (if you want the AI chat assistant enabled):
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser at [http://localhost:3000](http://localhost:3000).

---

## 📦 Scripts

- `npm run dev` — Starts the local dev server on `http://localhost:3000` with hot reload.
- `npm run build` — Builds the client with Vite and bundles the server using esbuild into `dist/`.
- `npm run start` — Runs the compiled production server.
- `npm run lint` — Type-checks TypeScript code (`tsc --noEmit`).

---

## 🔐 Admin Passcode
Password can only access Admin if you need DM me direclty on my Email ThankYou

---

## 📄 License

MIT License — Feel free to use and adapt this project for your personal portfolio.
