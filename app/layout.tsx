import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontPoppins } from "@/config/fonts";
import { AuthProvider } from "@/components/auth-provider";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = (await cookies()).get("session");
  return (
    <html suppressHydrationWarning lang="en" translate="no">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontPoppins.className
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <AuthProvider authProps={{ session: session?.value }}>
            {children}
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
