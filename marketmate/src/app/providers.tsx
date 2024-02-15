"use client";
import { ChakraProvider, extendTheme, Box, type ThemeConfig } from "@chakra-ui/react";

export const theme = extendTheme({
  fonts: {
    body: "var(--font-open-sans)",
    heading: "var(--font-open-sans)",
  },
  config: {
    initialColorMode: "light",
    useSystemColorMode: true,
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
      <Box height="100vh">
        {/* <Navbar /> */}
        {/* <Box padding="2rem">{children}</Box> */}
        {children}
      </Box>
    </ChakraProvider>
  );
}
