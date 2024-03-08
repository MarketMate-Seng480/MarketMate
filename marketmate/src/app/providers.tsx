"use client";
import { ChakraProvider, extendTheme, Box } from "@chakra-ui/react";
import '@fontsource-variable/dm-sans';

export const theme = extendTheme({
  fonts: {
    body: "'DM Sans Variable', sans-serif",
    heading: "'DM Sans Variable', sans-serif",
  },
  colors: {
    brand: {
      primary: '#577D90',
      secondary: '#CA7A6C'
    },
    state: {
        info: '#3B8EA5',
        success: '#63B365',
        warning: '#FFC857',
        error: '#F55D3E'
    },
    clay: {
        100: '#AF4C32',
        200: '#CA7A6C',
        300: '#DCA69D',
        400: '#F0D9D6'
    },
    beige: {
        100: '#C89B7B',
        200: '#E4BB97',
        300: '#FEF5EF',
        400: '#FDFAF8'
    },
    blue: {
        100: '#223F5F',
        200: '#19647E',
        300: '#3B8EA5',
        400: '#119DA4',
        500: '#9DD9D2',
        600: '#D1E0F5'
    },
    gray: {
        100: '#321F0E',
        200: '#374142',
        300: '#6F8384',
        400: '#9FADAC',
        500: '#DEE3E3',
        600: '#F1F3F3'
    },
    text: {
        heading: '#577D90',
        regularNav: '#6F8384',
        darkNav: '#374142',
        emphasis: '#119DA4',
        body: '#321F0E',
        caption: '#9FADAC'
    }
  }
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <Box height="100vh">{children}</Box>
    </ChakraProvider>
  );
}
