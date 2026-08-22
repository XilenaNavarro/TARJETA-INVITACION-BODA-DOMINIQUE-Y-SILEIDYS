import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Invitación Hojas - Dominique y Sileidys",
  description: "Invitación digital de boda de Dominique y Sileidys.",
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
