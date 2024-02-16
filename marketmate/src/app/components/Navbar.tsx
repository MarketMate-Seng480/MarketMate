"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Heading,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useAuth } from "../authContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Props {
  children: React.ReactNode;
}

const NavLink = (props: Props) => {
  const router = useRouter();
  const { children } = props;

  const handleClick = () => {
    if (children === "Home") {
      router.push("/");
    }
  };

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      onClick={handleClick}
    >
      {children}
    </Box>
  );
};

export function HomeLink() {
  const router = useRouter();
  const handleHome = () => {
    router.push("/");
  };

  return (
    <Link href={"/"}>
      <Heading
        as={"h1"}
        size={"lg"}
        cursor="pointer"
        onClick={handleHome}
      >
        MarketMate
      </Heading>
    </Link>
  );
}

export function AccountButton() {
  const router = useRouter();
  const { logout } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    let status = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(status === "true");
  }, []);

  const handleLogin = () => {
    router.push("/login");
  };
  const handleLogout = () => {
    logout();
  };
  const handleVendor = () => {
    router.push("/vendor/profile");
  };
  const handleHome = () => {
    router.push("/");
  };

  return (
    <Flex alignItems={"center"}>
      {isLoggedIn ? (
        <Menu>
          <MenuButton
            as={Button}
            rounded={"full"}
            variant={"link"}
            cursor={"pointer"}
            minW={0}
          >
            <Avatar
              size={"md"}
              src={
                "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
              }
            />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={handleVendor}>My Store</MenuItem>
            <MenuDivider />
            <MenuItem onClick={handleLogout}>Log Out</MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <Button
          variant={"outline"}
          onClick={handleLogin}
          bg={"#BF9E86"}
          _hover={{ bg: "#D1C7BD" }}
        >
          Log In
        </Button>
      )}
    </Flex>
  );
}

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        px={{ base: 4, md: 4 }}
        alignItems="center"
        bg={useColorModeValue("#F6EFE7", "gray.900")}
        borderBottomWidth="1px"
        borderBottomColor={useColorModeValue("gray.200", "gray.700")}
        justifyContent={{ base: "space-between", md: "flex-end" }}
        verticalAlign={"middle"}
      >
        <Flex
          h={16}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack
            spacing={8}
            alignItems={"center"}
          >
            <HomeLink />
          </HStack>
          <AccountButton />
        </Flex>
      </Box>
    </>
  );
}
