"use client";
import { Box, Button, ButtonProps, Heading, useBreakpointValue, useTheme } from "@chakra-ui/react";
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
      justifyContent={useBreakpointValue({ base: "left", md: "left" })}
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

interface NavLinkProps extends ButtonProps {
  children: React.ReactNode;
  variant?: "regular" | "emphasis";
  href?: string;
}
export const NavLink: React.FC<NavLinkProps> = ({ children, variant, href = "#", ...rest }) => {
  const router = useRouter();
  const colors = useTheme().colors;
  const isExternalLink = href.startsWith("http");

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!isExternalLink && href !== "#") {
      router.push(href);
    }
  };

  return (
    <>
      {variant === "emphasis" ? (
        <Button
          as={"a"}
          href={href}
          target={isExternalLink ? "_blank" : undefined}
          onClick={!isExternalLink ? handleClick : undefined}
          variant={"ghost"}
          color={colors.text.emphasis}
          _hover={{ bg: "none", color: colors.blue[200] }}
          _active={{ bg: "none" }}
          cursor={"pointer"}
          padding={0}
          {...rest}
        >
          {children}
        </Button>
      ) : (
        <Button
          as={"a"}
          href={href}
          target={isExternalLink ? "_blank" : undefined}
          onClick={!isExternalLink ? handleClick : undefined}
          variant={"ghost"}
          bg={"none"}
          color={colors.text.regularNav}
          _hover={{
            textDecoration: "none",
            color: colors.text.darkNav,
            bg: "none",
          }}
          cursor={"pointer"}
          padding={0}
          {...rest}
        >
          {children}
        </Button>
      )}
    </>
  );
};
