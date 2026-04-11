import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Lexforge",
    short_name: "Lexforge",
    description: "Forge your vocabulary. Gamified RPG trainer powered by spaced repetition.",
    start_url: "/",
    display: "standalone",
    background_color: "#1a1625",
    theme_color: "#1a1625",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-192.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
