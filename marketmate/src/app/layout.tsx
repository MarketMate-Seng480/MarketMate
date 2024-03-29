import type { Metadata } from "next";
import { Providers } from "./providers";
import QueryProvider from "@components/query-provider"

export const metadata: Metadata = {
  title: "Artisway - Handcrafted by Locals, Inspired by Community",
  description: "Discover and support local artisans and crafts in Victoria, BC.",
  keywords: [
    "marketplace",
    "local",
    "artisans",
    "crafts",
    "Victoria",
    "BC",
    "Canada",
    "handmade",
    "gifts",
    "art",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
    >
      <body>
        <QueryProvider>
          <Providers>{children}</Providers>
        </QueryProvider>
      </body>
    </html>
  );
}
