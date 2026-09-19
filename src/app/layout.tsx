import type { Metadata } from "next";
import localFont from "next/font/local";
import { profile } from "@/data/profile";
import { MotionController } from "@/components/motion-controller";
import "./globals.css";
import "./motion.css";

const display = localFont({
  src: "../../public/fonts/space-grotesk-semibold.ttf",
  variable: "--font-display",
  display: "swap",
  weight: "600",
});
const body = localFont({
  src: "../../public/fonts/dm-sans-regular.ttf",
  variable: "--font-body",
  display: "swap",
  weight: "400",
});
const title = `${profile.name} — Software Engineer & Computer Engineering Student`;
const description =
  "Computer Systems Engineering student at the University of Georgia exploring software engineering and AI/ML. Projects, experience, and Summer 2027 internship interests.";
export const metadata: Metadata = {
  title,
  description,
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title,
    description,
    type: "website",
    locale: "en_US",
    siteName: profile.name,
  },
  twitter: { card: "summary", title, description },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable}`}>
        {children}
        <MotionController />
      </body>
    </html>
  );
}
