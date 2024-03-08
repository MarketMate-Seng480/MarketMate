"use client";
import { Box, Button, Heading, useBreakpointValue, useTheme } from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/navigation";
import "@fontsource/averia-serif-libre";

export const LogoLink: React.FC = () => {
  const router = useRouter();
  const colors = useTheme().colors;
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent={useBreakpointValue({ base: "center", md: "left" })}
    >
      <Heading
        size={"md"}
        fontFamily={"Averia Serif Libre"}
        justifyContent={"center"}
        textAlign={useBreakpointValue({ base: "center", md: "left" })}
        color={colors.brand.secondary}
        _hover={{ color: colors.clay[100] }}
        onClick={() => router.push("/")}
        cursor={"pointer"}
      >
        Artisway
      </Heading>
    </Box>
  );
};

interface NavLinkProps {
  children: React.ReactNode;
  variant?: "regular" | "emphasis" | "sidebar";
  path?: string;
}
export const NavLink: React.FC<NavLinkProps> = ({ children, variant, path, ...rest }) => {
  const router = useRouter();
  const colors = useTheme().colors;
  return (
    <>
      {variant === "emphasis" ? (
        <Button
          as={"a"}
          onClick={() => router.push(`/${path}`)}
          variant={"ghost"}
          color={colors.text.emphasis}
          _hover={{ bg: "none", color: colors.blue[200] }}
          _active={{ bg: "none" }}
          cursor={"pointer"}
          {...rest}
        >
          {children}
        </Button>
      ) : (
        <Button
          as={"a"}
          onClick={() => router.push(`/${path}`)}
          p={2}
          fontSize={"md"}
          fontWeight={600}
          bg={"none"}
          color={colors.text.regularNav}
          _hover={{
            textDecoration: "none",
            color: colors.text.darkNav,
            bg: "none",
          }}
          cursor={"pointer"}
          {...rest}
        >
          {children}
        </Button>
      )}
    </>
  );
};
