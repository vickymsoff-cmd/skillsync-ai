import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SkillSync AI - Academia-Industry Collaboration Platform",
  description:
    "Connect skills, academia, and industry intelligence with AI-powered personalized learning and career opportunities",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} bg-white dark:bg-slate-950 text-gray-900 dark:text-gray-50`}
      >
        {children}
      </body>
    </html>
  );
}
