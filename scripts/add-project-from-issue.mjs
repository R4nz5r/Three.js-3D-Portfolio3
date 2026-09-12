import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

// Tag dictionary mapping to match TAGS keys
const TAG_KEY_MAP = {
  "next.js": "TAGS.NEXTJS",
  nextjs: "TAGS.NEXTJS",
  react: "TAGS.REACT",
  typescript: "TAGS.TYPESCRIPT",
  javascript: "TAGS.JAVASCRIPT",
  html5: "TAGS.HTML5",
  css3: "TAGS.CSS3",
  tailwindcss: "TAGS.TAILWINDCSS",
  tailwind: "TAGS.TAILWINDCSS",
  "three.js": "TAGS.THREEJS",
  threejs: "TAGS.THREEJS",
  vite: "TAGS.VITEJS",
  vitejs: "TAGS.VITEJS",
  "node.js": "TAGS.NODEJS",
  nodejs: "TAGS.NODEJS",
  express: "TAGS.EXPRESS",
  ".net": "TAGS.DOTNET",
  dotnet: "TAGS.DOTNET",
  ".net core": "TAGS.DOTNETCORE",
  "c#": "TAGS.CSHARP",
  "c++": "TAGS.CPLUSPLUS",
  postgresql: "TAGS.POSTGRESQL",
  mongodb: "TAGS.MONGODB",
  supabase: "TAGS.SUPABASE",
  sqlite: "TAGS.SQLITE",
  "sql server": "TAGS.MSSQL",
  mssql: "TAGS.MSSQL",
  "openai / ai sdk": "TAGS.OPENAI",
  openai: "TAGS.OPENAI",
  "gemini ai": "TAGS.GEMINI",
  gemini: "TAGS.GEMINI",
  vapi: "TAGS.VAPI",
  "sanity cms": "TAGS.SANITY",
  sanity: "TAGS.SANITY",
  clerk: "TAGS.CLERK",
  auth0: "TAGS.AUTH0",
  posthog: "TAGS.POSTHOG",
  cloudinary: "TAGS.CLOUDINARY",
  stripe: "TAGS.STRIPE",
};

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseSection(body, headingPattern) {
  const regex = new RegExp(`###\\s*${headingPattern}\\s*\\n([\\s\\S]*?)(?=(?:###|\\Z))`, "i");
  const match = body.match(regex);
  if (!match) return "";
  const content = match[1].trim();
  if (content.toLowerCase() === "_no response_") return "";
  return content;
}

async function downloadImage(url, destPath) {
  try {
    const headers = {
      "User-Agent": "GitHub-Action-Portfolio-Sync",
    };
    if (process.env.GITHUB_TOKEN && (url.includes("github.com") || url.includes("githubusercontent.com"))) {
      headers["Authorization"] = `token ${process.env.GITHUB_TOKEN}`;
    }
    const res = await fetch(url, { headers });
    if (!res.ok) {
      console.warn(`Failed to fetch image from ${url}: ${res.statusText}`);
      return false;
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    fs.writeFileSync(destPath, buffer);
    return true;
  } catch (err) {
    console.error(`Error downloading image from ${url}:`, err);
    return false;
  }
}

async function main() {
  const issueBody = process.env.ISSUE_BODY || "";
  const issueTitle = process.env.ISSUE_TITLE || "";

  if (!issueBody && !issueTitle) {
    console.error("No issue body or title found in environment variables.");
    process.exit(1);
  }

  // 1. Extract Project Title
  let title = issueTitle.replace(/^\[Project\]:\s*/i, "").trim();
  if (!title) {
    title = parseSection(issueBody, "Project Title");
  }
  if (!title) {
    console.error("Missing project title. Please provide a title in the issue title (e.g. [Project]: My App).");
    process.exit(1);
  }

  const slug = slugify(title) || `project-${Date.now()}`;

  // 2. Extract Live URL
  const rawUrl = parseSection(issueBody, "Live URL.*");
  const href = rawUrl && !rawUrl.toLowerCase().includes("_no response_") ? rawUrl.trim() : "";

  // 3. Extract Description
  const description = parseSection(issueBody, "Short Description") || "A newly added portfolio project.";

  // 4. Extract Key Highlights
  const rawHighlights = parseSection(issueBody, "Key Highlights.*");
  const subDescription = rawHighlights
    ? rawHighlights
        .split("\n")
        .map((line) => line.replace(/^[\s*\-•\d.]+\s*/, "").trim())
        .filter((line) => line.length > 0 && line.toLowerCase() !== "_no response_")
    : [];

  // 5. Extract Tech Stack Tags
  const rawTagsSection = parseSection(issueBody, "Tech Stack Tags");
  const tags = [];
  const checkedTagRegex = /- \[[xX]\] (.+)/g;
  let tagMatch;
  while ((tagMatch = checkedTagRegex.exec(rawTagsSection)) !== null) {
    tags.push(tagMatch[1].trim());
  }

  // Custom tags
  const customTagsRaw = parseSection(issueBody, "Other Technologies.*");
  if (customTagsRaw && customTagsRaw.toLowerCase() !== "_no response_") {
    const customList = customTagsRaw.split(",").map((t) => t.trim()).filter(Boolean);
    tags.push(...customList);
  }

  // 6. Extract Image
  const imageSection = parseSection(issueBody, "Project Screenshot.*");
  let imageUrl = "";
  const markdownImgMatch = imageSection.match(/!\[.*?\]\((https?:\/\/[^\s\)]+)\)/);
  if (markdownImgMatch) {
    imageUrl = markdownImgMatch[1];
  } else {
    const rawUrlMatch = imageSection.match(/(https?:\/\/[^\s\)]+)/);
    if (rawUrlMatch) {
      imageUrl = rawUrlMatch[1];
    }
  }

  let finalImagePath = "/assets/projects/vertex.jpg"; // Default fallback
  if (imageUrl) {
    const extMatch = imageUrl.match(/\.(png|jpg|jpeg|webp|gif)(\?.*)?$/i);
    const ext = extMatch ? extMatch[1].toLowerCase() : "jpg";
    const fileName = `${slug}.${ext === "jpeg" ? "jpg" : ext}`;
    const targetFilePath = path.join(rootDir, "public", "assets", "projects", fileName);

    console.log(`Downloading screenshot from ${imageUrl} to ${targetFilePath}...`);
    const success = await downloadImage(imageUrl, targetFilePath);
    if (success) {
      finalImagePath = `/assets/projects/${fileName}`;
      console.log(`Screenshot saved to ${finalImagePath}`);
    } else {
      console.warn("Could not download screenshot, keeping default.");
    }
  }

  // 7. Format tags for data/projects.js
  const formattedTags = tags.map((t) => {
    const key = TAG_KEY_MAP[t.toLowerCase()];
    return key ? key : JSON.stringify(t);
  });

  // 8. Construct project code
  const projectCodeLines = [
    `  {`,
    `    id: ${JSON.stringify(slug)},`,
    `    title: ${JSON.stringify(title)},`,
    `    description: ${JSON.stringify(description)},`,
    `    subDescription: [`,
    ...subDescription.map((sub) => `      ${JSON.stringify(sub)},`),
    `    ],`,
    `    href: ${JSON.stringify(href)},`,
    `    logo: "",`,
    `    image: ${JSON.stringify(finalImagePath)},`,
    `    tags: [${formattedTags.length > 0 ? "\n      " + formattedTags.join(",\n      ") + ",\n    " : ""}],`,
    `  },`,
    ``,
  ];
  const newProjectCode = projectCodeLines.join("\n");

  // 9. Read src/data/projects.js and prepend
  const projectsFilePath = path.join(rootDir, "src", "data", "projects.js");
  let projectsFileContent = fs.readFileSync(projectsFilePath, "utf8");

  const rawProjectsAnchor = "const rawProjects = [\n";
  const anchorIndex = projectsFileContent.indexOf(rawProjectsAnchor);

  if (anchorIndex === -1) {
    console.error("Could not find 'const rawProjects = [' in src/data/projects.js");
    process.exit(1);
  }

  const insertPos = anchorIndex + rawProjectsAnchor.length;
  projectsFileContent =
    projectsFileContent.slice(0, insertPos) +
    newProjectCode +
    projectsFileContent.slice(insertPos);

  fs.writeFileSync(projectsFilePath, projectsFileContent, "utf8");
  console.log(`Successfully added project "${title}" to ${projectsFilePath}!`);

  // Write outputs for GitHub Actions summary
  if (process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `project_title=${title}\n`);
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `project_slug=${slug}\n`);
  }
}

main().catch((err) => {
  console.error("Error adding project from issue:", err);
  process.exit(1);
});
