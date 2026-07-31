import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Invitación Boda Rey",
  description: "Invitación digital de boda para Carlos y Alejandra.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
