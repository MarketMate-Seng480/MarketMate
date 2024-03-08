"use client";

import {
  Box,
  Container,
  Stack,
  Text,
  useTheme,
} from "@chakra-ui/react";
import { FaInstagram } from "react-icons/fa";
import { ReactNode } from "react";
import { LogoLink, NavLink } from "./navigation/Links";

export default function Footer() {
  const colors = useTheme().colors;

  return (
    <Box bg={colors.beige[300]} w="full" h='fit-content' display="flex">
      <Container
        as={Stack}
        maxW="6xl"
        direction={{ base: "column", md: "row" }}
        align={{ base: "flex-start", md: "center" }}
        justify={{ base: "flex-start", md: "space-between" }}
        width="full"
        p={4}
      >
        <LogoLink />
        <Text
          fontWeight={600}
          size={'md'}
          lineHeight={'md'}
          color={colors.gray[200]}
        >
          Made with ❤️ in Victoria, BC
        </Text>
        <NavLink variant={'emphasis'} href={"https://www.instagram.com/artisway/"}>
          <FaInstagram size="25px"/>
        </NavLink>
      </Container>
    </Box>
  );
}