import { TAGS, resolveTags } from "../constants/tags";

/**
 * Portfolio Projects Data
 * 
 * TO ADD A NEW PROJECT:
 * Simply add a new object to the top of this array.
 * - `id`: Any unique string (e.g. "my-project"). NO manual renumbering needed!
 * - `tags`: Use TAGS.<KEY> (e.g. TAGS.NEXTJS) or simply strings (e.g. "Next.js", "TypeScript").
 */
const rawProjects = [
  {
    id: "popcorn",
    title: "Popcorn – Real-Time Watch Party Platform",
    description:
      "A live synchronized watch-party platform with real-time video synchronization, peer-to-peer screen sharing, voice chat, and host room controls.",
    subDescription: [
      "Architected a full-stack real-time watch party platform using Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS.",
      "Engineered low-latency bidirectional synchronization with Socket.io to keep video playback, scrubbing, and pause states frame-accurate across all room participants.",
      "Integrated WebRTC for peer-to-peer low-latency voice chat and desktop screen sharing directly inside the theater room.",
      "Implemented role-based host controls with dynamic room generation, shareable invite links, participant management, and room privacy settings.",
      "Used MongoDB with Mongoose for persistent room data, session state tracking, and user profile management.",
      "Designed an intuitive theater UI with custom video player integration (YouTube IFrame API), light/dark themes, and responsive layout.",
    ],
    href: "https://popcorn.ragibshahrier.com",
    github: "https://github.com/R4nz5r/Popcorn",
    logo: "",
    image: "/assets/projects/popcorn.jpg",
    tags: [
      TAGS.NEXTJS,
      TAGS.TYPESCRIPT,
      TAGS.SOCKETIO,
      TAGS.WEBRTC,
      TAGS.MONGODB,
      TAGS.TAILWINDCSS,
    ],
  },
  {
    id: "ragib-dev",
    title: "ragib.dev – Tech Blog & Knowledge Base",
    description:
      "A fast, content-first developer blog and technical notebook featuring MDX articles, TinaCMS visual editing, Shiki syntax highlighting, instant client search, and newsletter integration.",
    subDescription: [
      "Architected a content-first technical blog platform using Next.js 16, React 19, TypeScript, and Tailwind CSS v4.",
      "Integrated TinaCMS for Git-backed visual content authoring with structured frontmatter schemas validated via Zod.",
      "Engineered an instant client-side full-text search index powered by MiniSearch with a global keyboard shortcut (⌘K).",
      "Built an optimized MDX rendering pipeline featuring Shiki syntax highlighting, interactive code blocks, table of contents, and estimated read times.",
      "Configured automated newsletter subscription workflows and post notification broadcasts powered by Resend.",
      "Integrated dynamic RSS feed generation, SEO OpenGraph metadata, and open-source GitHub release workflow.",
    ],
    href: "https://blog.ragibshahrier.com",
    github: "https://github.com/R4nz5r/ragib.dev",
    logo: "",
    image: "/assets/projects/ragibdev.jpg",
    tags: [
      TAGS.NEXTJS,
      TAGS.TYPESCRIPT,
      TAGS.TAILWINDCSS,
      TAGS.TINACMS,
      TAGS.MDX,
      TAGS.RESEND,
    ],
  },
  {
    id: "vertex",
    title: "Vertex – AI Learning Platform",
    description:
      "A production-grade, AI-powered learning platform featuring intelligent timestamp-precise video search, structured course curricula, learner progress tracking, and embedded playback.",
    subDescription: [
      "Architected a full-stack learning platform using Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS.",
      "Engineered an intelligent search engine powered by Sanity Context MCP and Vercel AI SDK to query CMS content and video transcripts via natural language.",
      "Implemented two-stage timestamp retrieval that pinpoints exact video moments and automatically seeks embedded players (YouTube/Vimeo) to that second.",
      "Modeled structured course content in Sanity Studio CMS with Portable Text curriculum notes and offline transcript chunk ingestion.",
      "Integrated Clerk for secure authentication, protected routes, and per-learner course progress and resume position tracking.",
      "Configured PostHog product analytics to track video watch depth, lesson completions, search queries, and catalog engagement.",
      "Designed a responsive, modern dark-themed interface with interactive course catalogs, curricula accordions, and lesson navigation.",
    ],
    href: "https://vertex.ragibshahrier.com",
    logo: "",
    image: "/assets/projects/vertex.jpg",
    tags: [
      TAGS.NEXTJS,
      TAGS.TYPESCRIPT,
      TAGS.TAILWINDCSS,
      TAGS.SANITY,
      TAGS.OPENAI,
      TAGS.CLERK,
      TAGS.POSTHOG,
    ],
  },

  {
    id: "timely-forms-ai",
    title: "Timely Forms Ai",
    description:
      "An AI-powered form builder that lets users create, customize, publish, and analyze forms with AI-assisted generation and a drag-and-drop editor.",
    subDescription: [
      "Built a full-stack application using React, Node.js, Express, and PostgreSQL.",
      "Integrated Google Gemini AI to generate forms from natural-language prompts.",
      "Implemented a drag-and-drop form builder for creating and customizing dynamic forms.",
      "Added JWT-based authentication and secure user session management.",
      "Built real-time analytics to track form responses and user engagement.",
      "Implemented shareable public forms for collecting responses without requiring authentication.",
      "Styled the application with Tailwind CSS for a modern, responsive user interface.",
    ],
    href: "https://forms.ragibshahrier.com",
    logo: "",
    image: "/assets/projects/timelyFormsAi.jpg",
    tags: [
      TAGS.REACT,
      TAGS.NODEJS,
      TAGS.EXPRESS,
      TAGS.POSTGRESQL,
      TAGS.GEMINI,
      TAGS.TAILWINDCSS,
    ],
  },

  {
    id: "bookified",
    title: "Bookified",
    description:
      "Converts books into interactive AI conversations, letting users listen to, learn from, and discuss their favorite reads through natural voice-driven interaction.",
    subDescription: [
      "Built with Next.js and TypeScript for a fast, type-safe full-stack architecture.",
      "Integrated Vapi to power real-time, voice-based AI conversations about book content.",
      "Implemented secure user authentication and session management with Clerk.",
      "Tracked user engagement and interaction analytics using PostHog.",
      "Designed a clean, responsive UI with Tailwind CSS and reusable component architecture.",
    ],
    href: "https://bookified-dun.vercel.app",
    logo: "",
    image: "/assets/projects/Bookified.jpg",
    tags: [
      TAGS.TYPESCRIPT,
      TAGS.NEXTJS,
      TAGS.VAPI,
      TAGS.CLERK,
      TAGS.POSTHOG,
      TAGS.TAILWINDCSS,
    ],
  },

  {
    id: "devevent",
    title: "DevEvent",
    description:
      "A hub for discovering developer events, letting users browse, explore, and join upcoming tech meetups, conferences, and hackathons they shouldn't miss.",
    subDescription: [
      "Built with Next.js 16 and React 19 for a fast, modern full-stack architecture.",
      "Used MongoDB with Mongoose for flexible event data modeling and storage.",
      "Integrated Cloudinary for optimized image upload and delivery of event media.",
      "Tracked user behavior and product analytics with PostHog.",
      "Styled with Tailwind CSS v4 and Lucide icons, with OGL-powered visual effects for an engaging UI.",
    ],
    href: "",
    logo: "",
    image: "/assets/projects/devevent.jpg",
    tags: [
      TAGS.NEXTJS,
      TAGS.REACT,
      TAGS.MONGODB,
      TAGS.CLOUDINARY,
      TAGS.POSTHOG,
      TAGS.TAILWINDCSS,
    ],
  },

  {
    id: "forever",
    title: "FOREVER",
    description:
      "A full-stack clothing e-commerce platform with a customer-facing storefront and a dedicated admin panel for managing products and orders.",
    subDescription: [
      "Built a MERN stack application with separate frontend, backend, and admin panel architecture.",
      "Used MongoDB for product, order, and user data storage.",
      "Developed RESTful APIs with Node.js and Express for handling authentication, products, and orders.",
      "Designed a responsive React frontend for browsing, filtering, and purchasing products.",
      "Built a standalone admin dashboard for product and inventory management.",
    ],
    href: "https://cloth-e-commerce-liard.vercel.app",
    logo: "",
    image: "/assets/projects/forever.jpg",
    tags: [
      TAGS.REACT,
      TAGS.NODEJS,
      TAGS.EXPRESS,
      TAGS.MONGODB,
      TAGS.TAILWINDCSS,
    ],
  },

  {
    id: "pure-drop-honey",
    title: "Pure Drop Honey",
    description:
      "A landing page and order funnel for a honey product brand, featuring a persuasive marketing flow along with an admin dashboard for managing orders and product variants.",
    subDescription: [
      "Built with React, TypeScript, and Vite for a fast, modern frontend.",
      "Designed a conversion-focused landing page with hero, problem/solution, social proof, and offer sections.",
      "Used Supabase for the backend, including database, authentication, and edge functions.",
      "Implemented serverless Supabase Edge Functions to handle order creation and admin operations.",
      "Built an admin dashboard with secure login for managing orders and product variants.",
      "Styled with Tailwind CSS and shadcn/ui components for a clean, responsive UI.",
    ],
    href: "https://pure-drop-honey.lovable.app/",
    logo: "",
    image: "/assets/projects/purehoney.jpg",
    tags: [
      TAGS.REACT,
      TAGS.TYPESCRIPT,
      TAGS.SUPABASE,
      TAGS.TAILWINDCSS,
    ],
  },

  {
    id: "beautystor",
    title: "BeautyStor",
    description:
      "A beauty products storefront and order management platform, built on a Supabase-backed architecture.",
    subDescription: [
      "Built with React, TypeScript, and Vite for a fast, modern frontend.",
      "Used Supabase for the backend, including database, authentication, and business logic.",
      "Styled with Tailwind CSS and shadcn/ui components for a clean, responsive UI.",
    ],
    href: "https://beautystor.lovable.app/",
    logo: "",
    image: "/assets/projects/beautystor.jpg",
    tags: [
      TAGS.REACT,
      TAGS.TYPESCRIPT,
      TAGS.SUPABASE,
      TAGS.TAILWINDCSS,
    ],
  },
];

export const myProjects = rawProjects.map((project, idx) => ({
  ...project,
  id: project.id || `project-${idx + 1}`,
  tags: resolveTags(project.tags),
}));
