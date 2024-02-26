import type { Metadata } from "next";
import { Providers } from "./providers";
import { fonts } from "./fonts";

export const metadata: Metadata = {
  title: "MarketMate - Victoria's Local Marketplace",
  description: "Discover and support local artisans and crafts in Victoria, BC.",
  keywords: ["marketplace", "local", "artisans", "crafts", "Victoria", "BC"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={[fonts.playfairDisplay.variable, fonts.openSans.variable].join(" ")}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
