"use client";
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
  Popover,
  PopoverTrigger,
  useDisclosure,
  VStack,
  useTheme,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { FiShoppingCart, FiUser } from "react-icons/fi";
import { Session } from "@supabase/auth-helpers-nextjs";
import { supabase } from "../../lib/supabase";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";
import { LogoLink, NavLink } from "./CustomLinks";
import { CustomMenuItem, CustomMenuList } from "./CustomMenu";

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
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

  const newVendor = async () => {
    if (userData == null) return;

    const newVendor = await fetch(`/api/vendors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userData.id,
        email: userData.email,
        name: userData.first_name + " " + userData.last_name,
        description: "This is a new vendor",
        phone: "888-888-8888",
        logo: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      }),
    });
    if (!newVendor) return;

    const vendorData = (await newVendor.json()).data;

    const res = await fetch(`/api/users/${userData.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role: "vendor", vendorId: vendorData.id }),
    });
    const updatedUserData = (await res.json()).data;
    setUserData(updatedUserData);
  };

  const handleLogout = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    setLoading(false);
    if (!error) {
      setSession(null);
    }
  };

  const handleVendor = () => {
    router.push(`/vendor/profile/${userData?.vendorId}`);
  };

  const handleNewVendor = () => {
    newVendor();
    router.push(`/vendor/profile/${userData?.vendorId}`);
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
          />
        </Flex>
        <Flex
          flex={{ base: 1 }}
          justify={{ base: "center", md: "start" }}
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
              <NavLink variant="emphasis">
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
                    src={ userData?.profileImage }
                  />
                </MenuButton>
                <CustomMenuList>
                  {userData?.role == "vendor" ? (
                      <CustomMenuItem onClick={handleVendor}>
                        My Store
                      </CustomMenuItem>
                  ) : (
                    <CustomMenuItem onClick={handleNewVendor}>
                      Become a Vendor
                    </CustomMenuItem>
                  )}
                  <CustomMenuItem onClick={handleLogout}>
                    Log Out
                  </CustomMenuItem>
                </CustomMenuList>
              </Menu>
            </Stack>
          ) : (
            <Stack
              flex={{ base: 1, md: 0 }}
              justify={"flex-end"}
              direction={"row"}
              spacing={{ base: 0, md: 8}}
            >
              <NavLink variant="emphasis">
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
          <Popover
            trigger={"hover"}
            placement={"bottom-start"}
          >
            <PopoverTrigger>
              <NavLink href={navItem.href}>{navItem.label}</NavLink>
            </PopoverTrigger>
          </Popover>
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
          <Popover
            trigger={"click"}
            placement={"bottom-start"}
          >
            <PopoverTrigger>
              <NavLink>{navItem.label}</NavLink>
            </PopoverTrigger>
          </Popover>
        </Box>
      ))}
    </VStack>
  );
};
