"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Avatar,
  Menu,
  MenuButton,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { FiShoppingCart, FiUser } from "react-icons/fi";
import { Session } from "@supabase/auth-helpers-nextjs";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";
import { LogoLink, NavLink } from "./CustomLinks";
import { CustomMenuItem, CustomMenuList } from "./CustomMenu";

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Vendors",
    href: "/shop",
  },
  {
    label: "Products",
    href: "/product",
  },
];

export default function Navbar() {
  const router = useRouter();
  const { isOpen, onToggle } = useDisclosure();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then((session) => {
        setSession(session?.data?.session ?? null);
        setUserId(session?.data?.session?.user.id ?? null);
      })
      .catch((err) => {
        console.log("ERROR GET SESSION: ", err);
      });
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchData = async () => {
        const res = await fetch(`/api/users/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const user_data = (await res.json()).data;
        setUserData(user_data);
      };
      fetchData();
    }
  }, [userId]);

  const handleStorefront = () => {
    router.push(`/vendor/storefront/${userData?.vendorId}`);
  };

  const handleProducts = () => {
    router.push(`/vendor/products/${userData?.vendorId}`);
  };

  const handleVendorAccount = () => {
    router.push(`/vendor/account/${userData?.vendorId}`);
  };

  const handleBuyerAccount = () => {
    router.push(`/account/${userData?.id}`);
  };

  const handleLogout = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    setLoading(false);
    if (!error) {
      setSession(null);
      router.push(`/`);
    }
  };

  return (
    <Box>
      <Flex
        minH={"60px"}
        py={{ base: 2, md: 4 }}
        px={{ base: 4, md: 8 }}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? (
                <CloseIcon
                  w={3}
                  h={3}
                />
              ) : (
                <HamburgerIcon
                  w={5}
                  h={5}
                />
              )
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
            _hover={{ bgColor: "gray.500" }}
          />
        </Flex>

        <Flex
          flex={{ base: 1 }}
          justify={"start"}
        >
          <LogoLink />
          <Flex
            display={{ base: "none", md: "flex" }}
            ml={10}
          >
            <DesktopNav />
          </Flex>
        </Flex>

        <Flex alignItems={"center"}>
          {session ? (
            <Stack
              flex={{ base: 1, md: 0 }}
              justify={"flex-end"}
              direction={"row"}
              spacing={3}
            >
              <NavLink
                href="/cart"
                variant="emphasis"
              >
                <FiShoppingCart />
              </NavLink>
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
                    src={userData?.profileImage}
                  />
                </MenuButton>
                <CustomMenuList>
                  {userData?.role == "vendor" ? (
                    <>
                      <CustomMenuItem onClick={handleStorefront}>Storefront</CustomMenuItem>
                      <CustomMenuItem onClick={handleProducts}>Products</CustomMenuItem>
                      <CustomMenuItem onClick={handleVendorAccount}>Account</CustomMenuItem>
                    </>
                  ) : (
                    <>
                      <CustomMenuItem onClick={handleBuyerAccount}>Account</CustomMenuItem>
                    </>
                  )}
                  <CustomMenuItem onClick={handleLogout}>Log Out</CustomMenuItem>
                </CustomMenuList>
              </Menu>
            </Stack>
          ) : (
            <Stack
              flex={{ base: 1, md: 0 }}
              justify={"flex-end"}
              direction={"row"}
              spacing={{ base: 0, md: 8 }}
            >
              <NavLink
                href={"/cart"}
                variant="emphasis"
              >
                <FiShoppingCart />
              </NavLink>
              <NavLink
                variant={"emphasis"}
                href={"/login"}
              >
                <FiUser />
                <Text
                  display={{ base: "none", md: "block" }}
                  ml={{ base: 0, md: 2 }}
                >
                  Log In / Register
                </Text>
              </NavLink>
            </Stack>
          )}
        </Flex>
      </Flex>

      <Collapse
        in={isOpen}
        animateOpacity
      >
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  return (
    <Stack
      direction={"row"}
      spacing={8}
    >
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
            <NavLink href={navItem.href}>{navItem.label}</NavLink>
        </Box>
      ))}
    </Stack>
  );
};

const MobileNav = () => {
  return (
    <VStack
      p={4}
      spacing={4}
      alignItems={"start"}
    >
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
            <NavLink href={navItem.href}>{navItem.label}</NavLink>
        </Box>
      ))}
    </VStack>
  );
};
