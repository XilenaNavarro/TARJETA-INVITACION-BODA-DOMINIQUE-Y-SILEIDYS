import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Invitacion Hojas - Carlos y Alejandra",
  description: "Invitacion digital de boda con diseno Hojas.",
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
