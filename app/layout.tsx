import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Invitacion Hojas - Dominique y Sileidys",
  description: "Invitacion digital de boda de Dominique y Sileidys.",
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
