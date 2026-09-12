import { OrbitingCircles } from "./OrbitingCircles";

const outerSkills = [
  { name: "Next.js", src: "assets/logos/nextjs.svg" },
  { name: "React", src: "assets/logos/react.svg" },
  { name: "TypeScript", src: "assets/logos/TypeScript.svg" },
  { name: "Three.js", src: "assets/logos/threejs.svg" },
  { name: "Claude AI", src: "assets/logos/claude.svg" },
  { name: "Google Gemini", src: "assets/logos/gemini.svg" },
  { name: "OpenAI", src: "assets/logos/openai.svg" },
  { name: "Vapi Voice AI", src: "assets/logos/vapi.svg" },
  { name: "Tailwind CSS", src: "assets/logos/tailwindcss.svg" },
];

const innerSkills = [
  { name: "Node.js", src: "assets/logos/nodejs.svg" },
  { name: "Express", src: "assets/logos/express.svg" },
  { name: "PostgreSQL", src: "assets/logos/postgresql.svg" },
  { name: "Kimi AI", src: "assets/logos/kimi.svg" },
  { name: "MiniMax AI", src: "assets/logos/minimax.svg" },
  { name: "Supabase", src: "assets/logos/supabase.png" },
  { name: "Clerk", src: "assets/logos/clerk.svg" },
  { name: "PostHog", src: "assets/logos/posthog.svg" },
];

export function FrameWorks() {
  return (
    <div className="relative flex h-[15rem] w-full flex-col items-center justify-center">
      <OrbitingCircles iconSize={36} radius={150}>
        {outerSkills.map((skill, index) => (
          <Icon key={index} src={skill.src} alt={skill.name} />
        ))}
      </OrbitingCircles>
      <OrbitingCircles iconSize={26} radius={95} reverse speed={1.8}>
        {innerSkills.map((skill, index) => (
          <Icon key={index} src={skill.src} alt={skill.name} />
        ))}
      </OrbitingCircles>
    </div>
  );
}

const Icon = ({ src, alt = "" }) => (
  <img
    src={src}
    alt={alt}
    title={alt}
    className="duration-200 rounded-sm hover:scale-125 object-contain size-full"
  />
);

