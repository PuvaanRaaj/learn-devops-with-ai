import type { Metadata } from "next";
import "./globals.css";
import Shell from "@/components/Shell";

export const metadata: Metadata = {
  title: "🐳 DevOps Learning Path",
  description:
    "A structured, project-based DevOps curriculum — learn Docker, CI/CD and cloud-native deploys interactively, with quizzes and certificates.",
  icons: {
    icon:
      "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🐳</text></svg>",
  },
};

// Set the theme before paint to avoid a light/dark flash.
const themeScript = `
(function(){try{var t=localStorage.getItem('devops-theme');document.documentElement.dataset.theme=(t==='light')?'light':'';}catch(e){}})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
