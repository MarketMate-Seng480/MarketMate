import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "./authContext";
import { Box } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import { ChakraProvider } from "@chakra-ui/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MarketMate",
  description: "Victoria's local market place for artisans and crafters.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ChakraProvider>
            <Box height="100vh">
              {/* <Navbar /> */}
              {/* <Box padding="2rem">{children}</Box> */}
              {children}
            </Box>
          </ChakraProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
