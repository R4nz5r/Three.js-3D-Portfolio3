/**
 * Centralized Technology Tags Dictionary
 * Prevents redundant tag definitions, paths, and IDs across projects.
 */

export const TAGS = {
  // Core & Frameworks
  NEXTJS: {
    id: "nextjs",
    name: "Next.js",
    path: "/assets/logos/nextjs.svg",
  },
  REACT: {
    id: "react",
    name: "React",
    path: "/assets/logos/react.svg",
  },
  TYPESCRIPT: {
    id: "typescript",
    name: "TypeScript",
    path: "/assets/logos/TypeScript.svg",
  },
  JAVASCRIPT: {
    id: "javascript",
    name: "JavaScript",
    path: "/assets/logos/javascript.svg",
  },
  HTML5: {
    id: "html5",
    name: "HTML5",
    path: "/assets/logos/html5.svg",
  },
  CSS3: {
    id: "css3",
    name: "CSS3",
    path: "/assets/logos/css3.svg",
  },
  TAILWINDCSS: {
    id: "tailwindcss",
    name: "TailwindCSS",
    path: "/assets/logos/tailwindcss.svg",
  },
  THREEJS: {
    id: "threejs",
    name: "Three.js",
    path: "/assets/logos/threejs.svg",
  },
  VITEJS: {
    id: "vitejs",
    name: "Vite",
    path: "/assets/logos/vitejs.svg",
  },

  // Backend & Runtime
  NODEJS: {
    id: "nodejs",
    name: "Node.js",
    path: "/assets/logos/nodejs.svg",
  },
  EXPRESS: {
    id: "express",
    name: "Express",
    path: "/assets/logos/express.svg",
  },
  DOTNET: {
    id: "dotnet",
    name: ".NET",
    path: "/assets/logos/dotnet-pink.png",
  },
  DOTNETCORE: {
    id: "dotnetcore",
    name: ".NET Core",
    path: "/assets/logos/dotnetcore.svg",
  },
  CSHARP: {
    id: "csharp",
    name: "C#",
    path: "/assets/logos/csharp-pink.png",
  },
  CPLUSPLUS: {
    id: "cplusplus",
    name: "C++",
    path: "/assets/logos/cplusplus.svg",
  },

  // Databases & Backend Services
  POSTGRESQL: {
    id: "postgresql",
    name: "PostgreSQL",
    path: "/assets/logos/postgresql.svg",
  },
  MONGODB: {
    id: "mongodb",
    name: "MongoDB",
    path: "/assets/logos/mongodb.svg",
  },
  SUPABASE: {
    id: "supabase",
    name: "Supabase",
    path: "/assets/logos/supabase.png",
  },
  SQLITE: {
    id: "sqlite",
    name: "SQLite",
    path: "/assets/logos/sqlite.svg",
  },
  MSSQL: {
    id: "mssql",
    name: "SQL Server",
    path: "/assets/logos/microsoftsqlserver.svg",
  },

  // AI & Services
  OPENAI: {
    id: "openai",
    name: "OpenAI / AI SDK",
    path: "/assets/logos/openai.svg",
  },
  GEMINI: {
    id: "gemini",
    name: "Gemini AI",
    path: "/assets/logos/gemini.svg",
  },
  VAPI: {
    id: "vapi",
    name: "Vapi",
    path: "/assets/logos/vapi.svg",
  },
  SANITY: {
    id: "sanity",
    name: "Sanity CMS",
    path: "/assets/logos/sanity.svg",
  },
  CLERK: {
    id: "clerk",
    name: "Clerk",
    path: "/assets/logos/clerk.svg",
  },
  AUTH0: {
    id: "auth0",
    name: "Auth0",
    path: "/assets/logos/auth0.svg",
  },
  POSTHOG: {
    id: "posthog",
    name: "PostHog",
    path: "/assets/logos/posthog.svg",
  },
  CLOUDINARY: {
    id: "cloudinary",
    name: "Cloudinary",
    path: "/assets/logos/cloudinary.svg",
  },
  STRIPE: {
    id: "stripe",
    name: "Stripe",
    path: "/assets/logos/stripe.svg",
  },
};

// Lookup map by name (case-insensitive) for flexible tag definitions
const TAG_BY_NAME = Object.values(TAGS).reduce((acc, tag) => {
  acc[tag.name.toLowerCase()] = tag;
  acc[tag.id.toLowerCase()] = tag;
  return acc;
}, {});

/**
 * Normalizes tags array to support either:
 * - Direct object: TAGS.NEXTJS
 * - String lookup: "Next.js" or "nextjs"
 * - Legacy object: { id: 1, name: "Next.js", path: "..." }
 */
export const resolveTag = (tag, index = 0) => {
  if (!tag) return null;
  if (typeof tag === "string") {
    const found = TAG_BY_NAME[tag.toLowerCase()];
    if (found) return found;
    return { id: `custom-${index}`, name: tag, path: "" };
  }
  return {
    id: tag.id || `tag-${index}`,
    name: tag.name || "",
    path: tag.path || "",
  };
};

export const resolveTags = (tags = []) => {
  return tags.map(resolveTag).filter(Boolean);
};
