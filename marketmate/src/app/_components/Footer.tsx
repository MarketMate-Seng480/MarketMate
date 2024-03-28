"use client";
import { Box, Container, HStack, Stack, Text, useTheme } from "@chakra-ui/react";
import { FaInstagram } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { LogoLink, NavLink } from "./navigation/CustomLinks";

export default function Footer() {
  const colors = useTheme().colors;

  return (
    <Box
      bg={colors.beige[300]}
      w="full"
      h="fit-content"
      display="flex"
    >
      <Container
        as={Stack}
        maxW="6xl"
        direction={{ base: "column", md: "row" }}
        align={{ base: "center", md: "center" }}
        justify={{ base: "center", md: "space-between" }}
        width="full"
        p={4}
      >
        <LogoLink />
        <Text
          fontWeight={600}
          size={"md"}
          lineHeight={"md"}
          color={colors.gray[200]}
        >
          Made with ❤️ in Victoria, BC
        </Text>
        <HStack spacing={4}>
          <NavLink
            variant={"emphasis"}
            href={"https://www.instagram.com/artisway/"}
          >
            <FaInstagram size="25px" />
          </NavLink>
          <NavLink
            variant={"emphasis"}
            href={"mailto:info@artisway.ca"}
          >
            <FiMail size="25px" />
          </NavLink>
        </HStack>
      </Container>
    </Box>
  );
}
