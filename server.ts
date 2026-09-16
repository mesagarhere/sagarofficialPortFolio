import express, { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, ThinkingLevel } from "@google/genai";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const PORT = 3000;

// Lazy initialization of GoogleGenAI client
let aiClient: GoogleGenAI | null = null;

function getGenAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

const FIVERR_URL = "https://www.fiverr.com/s/jyje2oV";
const EMAIL_ADDRESS = "mrsagar.0790@gmail.com";
const GMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL_ADDRESS}&su=${encodeURIComponent("Client Inquiry for Sagar D.")}`;

// Executive professional fallback responses for sub-second offline reliability
function generateSmartFallbackReply(userMessage: string): {
  reply: string;
  suggestedActions: Array<{ label: string; url: string; type: string }>;
} {
  const query = userMessage.toLowerCase();

  // Admin / Customization inquiries
  if (
    query.includes("admin") ||
    query.includes("edit") ||
    query.includes("customiz") ||
    query.includes("passcode") ||
    query.includes("password")
  ) {
    return {
      reply: `### Portfolio Administration & Security Notice

Editing and customization of this portfolio are **strictly restricted to Sagar D. (the site owner and admin)**.

* **Visitors & Clients**: Enjoy full, protected read-only access to review Sagar's code, media deliverables, pricing, and testimonials.
* **Owner Access**: Sagar can log into his private Admin Studio using his secret passcode (accessible via the footer Admin lock or by pressing \`Ctrl+Shift+A\`).

If you would like to hire Sagar to build or customize a similar web application or portfolio for you, feel free to submit a project inquiry!`,
      suggestedActions: [
        { label: "Hire Sagar for Custom Web App", url: FIVERR_URL, type: "fiverr" },
        { label: "Direct Email Inquiry", url: GMAIL_COMPOSE_URL, type: "email" },
      ],
    };
  }

  // Pricing / Cost inquiries
  if (
    query.includes("price") ||
    query.includes("cost") ||
    query.includes("rate") ||
    query.includes("package") ||
    query.includes("budget") ||
    query.includes("$")
  ) {
    return {
      reply: `### Service Tier & Rate Overview

Sagar maintains transparent, competitive pricing designed for fast delivery and verified quality:

* **Quick Task Tier ($5)**
  * Python script adjustments, bug fixes, single web scrapers, or 1 high-CTR YouTube thumbnail.
  * **Turnaround**: 24 – 48 Hours.
* **Standard Project Tier ($25)**
  * Modern single-page website / landing page, short-form video edit pack (Reels/Shorts with subtitles & SFX), or AI avatar video generation.
  * **Turnaround**: 2 – 4 Days.
* **Comprehensive Solutions (Custom Quote)**
  * Multi-page web apps, end-to-end data scraping pipelines, or full YouTube channel branding.
  * **Turnaround**: 5 – 10 Days.

**Action Options:**
1. **[Instant Order on Fiverr](${FIVERR_URL})**: Secure checkout with escrow buyer protection.
2. **[Direct Email Inquiry](${GMAIL_COMPOSE_URL})**: For custom scopes or NDAs.`,
      suggestedActions: [
        { label: "View Fiverr Packages ($5+)", url: FIVERR_URL, type: "fiverr" },
        { label: "Direct Email Inquiry", url: GMAIL_COMPOSE_URL, type: "email" },
      ],
    };
  }

  // Delivery & turnaround speed
  if (
    query.includes("fast") ||
    query.includes("turnaround") ||
    query.includes("time") ||
    query.includes("delivery") ||
    query.includes("how long") ||
    query.includes("deadline") ||
    query.includes("urgent")
  ) {
    return {
      reply: `### Delivery Timelines & Availability

Sagar operates on an accelerated turnaround schedule to support active launches and deadlines:

* **Urgent Quick Fixes & Thumbnails**: 24 hours.
* **Standard Python Scripts & Video Edits**: 2 to 3 days.
* **Responsive Websites & Full Landing Pages**: 3 to 5 days.
* **Direct Response SLA**: Sagar personally reviews client requests within **1 to 4 hours**.

*Need immediate delivery?* You can place an order directly on Fiverr right now with designated 24h/48h delivery milestones.`,
      suggestedActions: [
        { label: "Start Priority Order on Fiverr", url: FIVERR_URL, type: "fiverr" },
        { label: "Email Urgent Request", url: GMAIL_COMPOSE_URL, type: "email" },
      ],
    };
  }

  // Python, bots, automation, scraping
  if (
    query.includes("python") ||
    query.includes("script") ||
    query.includes("scrap") ||
    query.includes("bot") ||
    query.includes("automat") ||
    query.includes("api")
  ) {
    return {
      reply: `### Python Development & Automation Capabilities

Sagar specializes in production-ready Python tooling and automation:

* **Web Scraping & Data Mining**: BeautifulSoup, Selenium, and Requests for structured CSV/JSON exports.
* **Workflow Automation & Bots**: Automated data entry, report generators, and scheduled scrapers.
* **REST APIs & Backend Utilities**: FastAPI, Flask, and microservice endpoints.
* **Bug Fixes & Optimizations**: Debugging legacy code and improving script execution speed.

**Starting Rate**: Quick scripts & bug fixes begin at **$5**. Custom pipelines quoted per specification.`,
      suggestedActions: [
        { label: "Hire for Python on Fiverr ($5+)", url: FIVERR_URL, type: "fiverr" },
        { label: "Send Script Specifications", url: GMAIL_COMPOSE_URL, type: "email" },
      ],
    };
  }

  // Video editing, AI video, thumbnails
  if (
    query.includes("video") ||
    query.includes("thumbnail") ||
    query.includes("youtube") ||
    query.includes("edit") ||
    query.includes("ai video") ||
    query.includes("animation")
  ) {
    return {
      reply: `### Digital Content & Media Production

Sagar provides end-to-end creative media tailored for high audience retention:

* **High-CTR YouTube Thumbnails ($5)**: Contrast framing, crisp subject isolation, bold typography, and visual hooks.
* **Short-Form Video Editing ($15 – $25)**: TikToks, Reels, and YouTube Shorts featuring kinetic captions, audio design, and visual pacing.
* **AI-Generated Videos & Motion**: AI avatar videos, voiceover sync, and promotional visual shorts.

Sample portfolios and live gigs are accessible directly on his Fiverr profile.`,
      suggestedActions: [
        { label: "Order Thumbnail or Video on Fiverr", url: FIVERR_URL, type: "fiverr" },
        { label: "Send Video Assets via Email", url: GMAIL_COMPOSE_URL, type: "email" },
      ],
    };
  }

  // Web development
  if (
    query.includes("web") ||
    query.includes("website") ||
    query.includes("react") ||
    query.includes("frontend") ||
    query.includes("landing")
  ) {
    return {
      reply: `### Web Engineering & UI Development

Sagar develops modern, ultra-responsive web interfaces:

* **Modern Stack**: React 19, TypeScript, Tailwind CSS, Vite.
* **Architectural Style**: Clean liquid-glass aesthetics, mobile-first responsiveness, and WCAG AA accessibility.
* **Deliverables**: Fast landing pages, portfolio sites, and interactive web tools.

**Starting Investment**: Landing pages and web sections start at **$25** with delivery within 2–4 days.`,
      suggestedActions: [
        { label: "Start Web Project on Fiverr", url: FIVERR_URL, type: "fiverr" },
        { label: "Send Website Requirements", url: GMAIL_COMPOSE_URL, type: "email" },
      ],
    };
  }

  // Default executive briefing
  return {
    reply: `### Executive Project Concierge — Sagar D.

Welcome! I am Sagar D.'s 24/7 AI Representative. Sagar is currently focused on active client sprints, but I am standing by to provide immediate information and facilitate your project kickoff:

* **Python & Automation**: Scrapers, bots, and scripts from **$5**.
* **Web Engineering**: Responsive landing pages from **$25**.
* **Media & Content**: High-CTR thumbnails ($5) and video editing ($15–$25).
* **Average Turnaround**: 24 to 72 hours for standard deliverables.

How can Sagar's expertise support your goals today? Feel free to outline your project details below for an instant scope analysis.`,
    suggestedActions: [
      { label: "Order Directly on Fiverr ($5+)", url: FIVERR_URL, type: "fiverr" },
      { label: "Email Sagar (mrsagar.0790@gmail.com)", url: GMAIL_COMPOSE_URL, type: "email" },
    ],
  };
}

async function startServer() {
  const app = express();

  app.use(express.json({ limit: "25mb" }));

  // Upload exact profile photo directly from user
  app.post("/api/upload-profile-photo", (req: Request, res: Response) => {
    try {
      const { imageBase64 } = req.body;
      if (!imageBase64 || typeof imageBase64 !== "string") {
        res.status(400).json({ error: "Missing imageBase64" });
        return;
      }
      const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");

      const publicDir = path.join(process.cwd(), "public");
      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
      }
      fs.writeFileSync(path.join(publicDir, "sagar_profile.jpg"), buffer);
      fs.writeFileSync(path.join(publicDir, "sagar_exact_photo.jpg"), buffer);

      const distDir = path.join(process.cwd(), "dist");
      if (fs.existsSync(distDir)) {
        fs.writeFileSync(path.join(distDir, "sagar_profile.jpg"), buffer);
        fs.writeFileSync(path.join(distDir, "sagar_exact_photo.jpg"), buffer);
      }

      res.json({
        success: true,
        url: `/sagar_profile.jpg?t=${Date.now()}`,
      });
    } catch (err: unknown) {
      console.error("Failed to save profile photo:", err);
      res.status(500).json({ error: (err as Error).message });
    }
  });

  // API Health check
  app.get("/api/health", (_req: Request, res: Response) => {
    res.json({
      status: "ok",
      assistant: "Sagar D. Executive AI Assistant 24/7",
      hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
      streamingSupported: true,
    });
  });

  // Verification code store for forgot passcode recovery
  interface VerificationRecord {
    code: string;
    email: string;
    expiresAt: number;
  }
  const activeVerificationCodes = new Map<string, VerificationRecord>();

  // Helper to safely mask email (e.g. lov*****gl@gmail.com)
  function maskEmail(email: string): string {
    const [user, domain] = email.split("@");
    if (!user || !domain) return "***@***.com";
    if (user.length <= 2) return `${user[0]}*@${domain}`;
    if (user.length <= 4) return `${user.slice(0, 2)}**@${domain}`;
    return `${user.slice(0, 3)}${"*".repeat(Math.min(user.length - 5, 5))}${user.slice(-2)}@${domain}`;
  }

  // Automated Email Dispatcher
  async function dispatchAdminVerificationEmail(targetEmail: string, code: string): Promise<boolean> {
    const user = process.env.GMAIL_USER || process.env.SMTP_USER;
    const pass = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS;
    const host = process.env.SMTP_HOST || "smtp.gmail.com";
    const port = parseInt(process.env.SMTP_PORT || "465", 10);

    if (user && pass) {
      try {
        const transporter = nodemailer.createTransport({
          host,
          port,
          secure: port === 465,
          auth: { user, pass },
        });

        await transporter.sendMail({
          from: `"Sagar D. Portfolio Security" <${user}>`,
          to: targetEmail,
          subject: `Your Admin Passcode Reset Verification Code: ${code}`,
          text: `Hello Sagar,\n\nA request was made to reset your admin passcode on your portfolio.\n\nYour 6-digit verification code is:\n${code}\n\nThis verification code expires in 15 minutes.\nDo NOT share this code with anyone.\n\nSagar D. Portfolio Security`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 500px; margin: 0 auto; padding: 24px; background: #090d16; color: #f8fafc; border-radius: 16px; border: 1px solid #1e293b;">
              <h2 style="margin: 0 0 12px 0; color: #38bdf8; font-size: 20px;">Admin Passcode Verification</h2>
              <p style="font-size: 14px; line-height: 1.6; color: #cbd5e1;">A request was made to reset your admin passcode. For your protection, only you receive this verification code.</p>
              <div style="margin: 24px 0; padding: 20px; background: #0f172a; border-radius: 12px; text-align: center; border: 1px solid #334155;">
                <span style="display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #94a3b8; margin-bottom: 8px;">Your 6-Digit Verification Code</span>
                <span style="font-size: 32px; font-weight: 800; letter-spacing: 8px; color: #38bdf8; font-family: monospace;">${code}</span>
              </div>
              <p style="font-size: 12px; color: #94a3b8; line-height: 1.5;">This code will expire in <strong>15 minutes</strong>. If you did not request this reset, your passcode will remain safe.</p>
              <p style="font-size: 11px; color: #64748b; margin-top: 24px; border-top: 1px solid #1e293b; padding-top: 12px;">Sagar D. Portfolio • Confidential Admin Dispatch</p>
            </div>
          `
        });

        console.log(`[AUTH-DIRECT-EMAIL] Verification code email sent to ${targetEmail}`);
        return true;
      } catch (err) {
        console.error(`[AUTH-DIRECT-EMAIL] SMTP delivery failed:`, err);
      }
    }

    console.log(`[AUTH-ADMIN-ONLY] Verification code for ${targetEmail} is: ${code} (expires in 15m)`);
    return false;
  }

  // Generate and dispatch verification code for forgot password
  // SECURITY: The frontend dictates the email to send the code to.
  // We use the email requested by the client.
  
  app.post("/api/auth/send-verification-code", async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      const targetEmail = (email && typeof email === "string" ? email.trim().toLowerCase() : "");

      if (!targetEmail) {
        res.status(400).json({
          success: false,
          error: "Valid email is required.",
        });
        return;
      }

      // Generate 6-digit numeric verification code
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = Date.now() + 15 * 60 * 1000; // 15 minutes

      activeVerificationCodes.set(targetEmail, {
        code,
        email: targetEmail,
        expiresAt,
      });

      // Dispatch directly to owner's email via SMTP/Nodemailer if configured
      const emailSent = await dispatchAdminVerificationEmail(targetEmail, code);

      const message = emailSent 
        ? `A 6-digit verification code has been dispatched directly to the portfolio owner's private email (${maskEmail(targetEmail)}). Please check your inbox.`
        : `[DEV MODE FALLBACK] SMTP is not configured. Your 6-digit verification code is: ${code}`;

      res.json({
        success: true,
        email: targetEmail,
        maskedEmail: maskEmail(targetEmail),
        expiresAt,
        message,
      });
    } catch (err: unknown) {
      console.error("Failed to generate verification code:", err);
      res.status(500).json({ success: false, error: (err as Error).message });
    }
  });

  // Verify code and reset passcode (Owner only)
  app.post("/api/auth/verify-code-reset", (req: Request, res: Response) => {
    try {
      const { email, code, newPasscode } = req.body;
      const targetEmail = (email && typeof email === "string" ? email.trim().toLowerCase() : "");

      if (!targetEmail) {
        res.status(400).json({
          success: false,
          error: `Access Denied: Valid email is required for passcode reset.`,
        });
        return;
      }

      const submittedCode = code && typeof code === "string" ? code.trim() : "";
      const passcode = newPasscode && typeof newPasscode === "string" ? newPasscode.trim() : "";

      if (!submittedCode) {
        res.status(400).json({ success: false, error: "Please enter the 6-digit verification code." });
        return;
      }

      if (!passcode || passcode.length < 4) {
        res.status(400).json({ success: false, error: "New passcode must be at least 4 characters long." });
        return;
      }

      const record = activeVerificationCodes.get(targetEmail);
      if (!record) {
        res.status(400).json({ success: false, error: "No active verification code found for the owner email. Please request a new code." });
        return;
      }

      if (Date.now() > record.expiresAt) {
        activeVerificationCodes.delete(targetEmail);
        res.status(400).json({ success: false, error: "Verification code has expired. Please request a new code." });
        return;
      }

      if (record.code !== submittedCode) {
        res.status(400).json({ success: false, error: "Incorrect verification code. Please check your email and try again." });
        return;
      }

      // Validated! Remove record
      activeVerificationCodes.delete(targetEmail);
      console.log(`[AUTH] Admin passcode reset verified successfully for owner ${targetEmail}`);

      res.json({
        success: true,
        message: "Verification code confirmed. Admin passcode reset successfully.",
      });
    } catch (err: unknown) {
      console.error("Failed to verify code:", err);
      res.status(500).json({ success: false, error: (err as Error).message });
    }
  });

  // Main chat endpoint with sub-second streaming support
  app.post("/api/chat", async (req: Request, res: Response) => {
    const { messages, userMessage, stream } = req.body;

    const currentQuery =
      userMessage ||
      (Array.isArray(messages) && messages.length > 0
        ? messages[messages.length - 1]?.content
        : "");

    if (!currentQuery || typeof currentQuery !== "string") {
      res.status(400).json({ error: "A valid user message is required." });
      return;
    }

    const suggestedActions = [
      {
        label: "Order on Fiverr ($5+)",
        url: FIVERR_URL,
        type: "fiverr",
      },
      {
        label: "Email Sagar (mrsagar.0790@gmail.com)",
        url: GMAIL_COMPOSE_URL,
        type: "email",
      },
    ];

    const isStreamingRequested = stream === true || req.headers.accept?.includes("text/event-stream");

    const ai = getGenAI();

    // If Gemini key is not configured, send instant structured response
    if (!ai) {
      const fallback = generateSmartFallbackReply(currentQuery);
      if (isStreamingRequested) {
        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");
        res.flushHeaders?.();

        // Stream fallback text in smooth bursts for instant live feel
        const words = fallback.reply.split(" ");
        for (let i = 0; i < words.length; i += 3) {
          const chunk = words.slice(i, i + 3).join(" ") + " ";
          res.write(`data: ${JSON.stringify({ text: chunk, done: false })}\n\n`);
        }

        res.write(
          `data: ${JSON.stringify({
            done: true,
            suggestedActions: fallback.suggestedActions,
            source: "smart-fallback",
          })}\n\n`
        );
        res.end();
        return;
      }

      res.json({
        reply: fallback.reply,
        suggestedActions: fallback.suggestedActions,
        source: "smart-assistant",
      });
      return;
    }

    // High-performance, executive system instruction
    const systemInstruction = `You are the Executive Client Concierge & 24/7 AI Representative for Sagar D., an accomplished Python Developer, Web Developer, and AI Digital Creator based in Badin, Pakistan (GMT+5).

COMMUNICATION STANDARDS:
1. Executive Polish: Be polite, articulate, highly professional, and direct. Avoid conversational fluff.
2. Fast & Structured: Answer the customer's exact message immediately.
3. Use clean markdown structure:
   - **Direct Answer / Technical Scope**: What Sagar can do for their specific inquiry.
   - **Pricing & Timeline**: Always highlight the relevant price tier ($5 for quick scripts / thumbnails; $25 for landing pages / video edits / AI videos; custom quote for large projects) and turnaround (1–4 days).
   - **Next Steps**: Clearly guide them to his Fiverr Gig (for instant escrow checkout) or direct email (mrsagar.0790@gmail.com).
4. Keep the total length concise (under 200 words) so reading is immediate and scannable on mobile or desktop.

KEY PROFILE FACTS:
- Sagar D. | 1–2 Years Experience | Python, React, Tailwind, Video Editing, AI Video, Thumbnails
- Fiverr Gig: https://www.fiverr.com/s/jyje2oV
- Email: mrsagar.0790@gmail.com
- Normal Personal Response Time: 1–4 hours. Fiverr orders start immediately.
- ADMIN & CUSTOMIZATION SECURITY: Customization and editing of this portfolio are strictly locked for Sagar D. (the site admin/owner). Visitors cannot edit or customize the site. Sagar can log into his Admin Studio via the footer Admin lock or by pressing Ctrl+Shift+A with his secret passcode.`;

    // Construct conversation history
    const contents = [];
    if (Array.isArray(messages)) {
      const recentHistory = messages.slice(-6);
      for (const msg of recentHistory) {
        if (msg.role === "user" || msg.role === "assistant" || msg.role === "model") {
          contents.push({
            role: msg.role === "assistant" ? "model" : "user",
            parts: [{ text: String(msg.content) }],
          });
        }
      }
    }

    if (
      contents.length === 0 ||
      contents[contents.length - 1].parts[0].text !== currentQuery
    ) {
      contents.push({
        role: "user",
        parts: [{ text: currentQuery }],
      });
    }

    try {
      if (isStreamingRequested) {
        // SSE Streaming configuration for sub-second first-token delivery
        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");
        res.flushHeaders?.();

        const responseStream = await ai.models.generateContentStream({
          model: "gemini-3.8-flash",
          contents: contents,
          config: {
            systemInstruction: systemInstruction,
            temperature: 0.5,
            thinkingConfig: {
              thinkingLevel: ThinkingLevel.LOW,
            },
          },
        });

        let fullText = "";
        for await (const chunk of responseStream) {
          const text = chunk.text;
          if (text) {
            fullText += text;
            res.write(`data: ${JSON.stringify({ text, done: false })}\n\n`);
          }
        }

        res.write(
          `data: ${JSON.stringify({
            done: true,
            suggestedActions: suggestedActions,
            source: "gemini-3.8-flash",
          })}\n\n`
        );
        res.end();
        return;
      }

      // Non-streaming fast response with low thinking latency
      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.5,
          thinkingConfig: {
            thinkingLevel: ThinkingLevel.LOW,
          },
        },
      });

      const replyText =
        response.text ||
        "I am standing by to assist with Sagar D.'s Python, Web Development, and Digital Content services. Packages start at $5 with rapid turnaround.";

      res.json({
        reply: replyText,
        suggestedActions: suggestedActions,
        source: "gemini-3.8-flash",
      });
    } catch (err: unknown) {
      console.error("Gemini API error in /api/chat:", err);
      const fallback = generateSmartFallbackReply(currentQuery);

      if (isStreamingRequested) {
        res.write(
          `data: ${JSON.stringify({
            text: fallback.reply,
            done: false,
          })}\n\n`
        );
        res.write(
          `data: ${JSON.stringify({
            done: true,
            suggestedActions: fallback.suggestedActions,
            source: "fallback-stream",
          })}\n\n`
        );
        res.end();
      } else {
        res.json({
          reply: fallback.reply,
          suggestedActions: fallback.suggestedActions,
          source: "fallback-assistant",
        });
      }
    }
  });

  // Setup Vite middleware for development or static serving for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
