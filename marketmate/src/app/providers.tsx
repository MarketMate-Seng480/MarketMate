"use client";
import { ChakraProvider, extendTheme, Box } from "@chakra-ui/react";

export const theme = extendTheme({
  fonts: {
    body: "var(--font-open-sans)",
    heading: "var(--font-open-sans)",
  },
  styles: {
    global: {
      h1: {
        fontFamily: "var(--font-playfair) !important",
      },
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <Box height="100vh">{children}</Box>
    </ChakraProvider>
  );
}
