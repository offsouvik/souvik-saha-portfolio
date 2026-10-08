import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { ThemeProvider } from "@/components/theme/theme-provider";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: `${siteConfig.name} | Digital Development & Growth`, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  keywords: ["Souvik Saha", "Website Development", "Web Applications", "Frontend Development", "Backend Development", "Social Media Management", "Digital Marketing", "Business Promotion"],
  openGraph: { type: "website", locale: "en_US", url: "/", title: `${siteConfig.name} | Digital Development & Growth`, description: siteConfig.description, siteName: siteConfig.name },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { themeColor: "#000000", colorScheme: "dark light" };
const themeScript = `try { document.documentElement.dataset.theme = localStorage.getItem('souvik-theme') === 'dark' ? 'dark' : 'light'; } catch { document.documentElement.dataset.theme = 'light'; }`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
