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
import { Session } from "@supabase/auth-helpers-nextjs";
import { supabase } from "../lib/supabase";
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

  return (
    <Link href={"/"}>
      <Heading
        as={"h1"}
        size={"lg"}
        cursor="pointer"
        onClick={() => router.push("/")}
      >
        MarketMate
      </Heading>
    </Link>
  );
}

export function AccountButton({ isVendorPage }: { isVendorPage: Boolean }) {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then((session) => setSession(session.data.session ?? null))
      .catch((err) => {
        console.log("ERROR GET SESSION: ", err);
      });
  }, []);

  const handleLogin = () => {
    router.push("/login");
  };

  const handleLogout = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    setLoading(false);
    if (!error) {
      setSession(null);

      if (isVendorPage) {
        router.push("/");
      } else {
        router.refresh();
      }
    }
  };

  const handleVendor = () => {
    router.push("/vendor/profile");
  };

  const handleHome = () => {
    router.push("/");
  };

  return (
    <Flex alignItems={"center"}>
      {session ? (
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
            {!isVendorPage ? (
              <>
                <MenuItem onClick={handleVendor}>My Store</MenuItem>
                <MenuDivider />
              </>
            ) : null}
            <MenuItem onClick={handleLogout}>Log Out</MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <Button
          variant={"outline"}
          onClick={handleLogin}
          bg={"#BF9E86"}
          _hover={{ bg: "#D1C7BD" }}
          disabled={loading}
        >
          Log In
        </Button>
      )}
    </Flex>
  );
}

export default function Navbar({ isVendorPage }: { isVendorPage: Boolean }) {
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
          <AccountButton isVendorPage={isVendorPage} />
        </Flex>
      </Box>
    </>
  );
}