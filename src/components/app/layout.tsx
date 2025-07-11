import type React from "react"
import type { Metadata } from "next"
import { Sora } from "next/font/google"
import "./globals.css"

const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sora",
})

export const metadata: Metadata = {
  title: "Gustavo Martins - Transforme seu Tempo",
  description:
    "Especialista em Automação e Inteligência Artificial. Transformo processos manuais em soluções automatizadas inteligentes. Aumente a produtividade da sua empresa com tecnologia de ponta.",
  keywords: [
    "automação",
    "inteligência artificial",
    "chatbots",
    "RPA",
    "machine learning",
    "Gustavo Martins",
    "sites",
    "landing pages",
  ],
  authors: [{ name: "Gustavo Martins" }],
  creator: "Gustavo Martins",
  metadataBase: new URL("https://enygna-enterprises.com.br"),
  openGraph: {
    title: "Gustavo Martins - Transforme seu Tempo com Automação & IA",
    description:
      "Transformo ideias em automações inteligentes. Especialista em IA, chatbots, RPA e desenvolvimento web. Aumente 40% a produtividade da sua empresa com soluções tecnológicas de excelência.",
    url: "https://enygna-enterprises.com.br",
    siteName: "Gustavo Martins - Automações & IA",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Gustavo Martins - Especialista em Automação e Inteligência Artificial",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gustavo Martins - Transforme seu Tempo com Automação & IA",
    description:
      "Transformo ideias em automações inteligentes. Especialista em IA, chatbots, RPA e desenvolvimento web.",
    images: ["/images/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${sora.variable} font-sora`}>{children}</body>
    </html>
  )
}
