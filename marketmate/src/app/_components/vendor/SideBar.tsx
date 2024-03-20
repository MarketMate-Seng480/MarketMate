"use client";
import {
  Box,
  Flex,
  Icon,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Link,
  CloseButton,
  useTheme,
  Stack
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import { usePathname, useRouter } from "next/navigation";
import { Session } from "@supabase/auth-helpers-nextjs";
import { supabase } from "../../lib/supabase";
import { useEffect, useState } from "react";
import { User, Vendor } from "@prisma/client";
import { FaStore, FaTag, FaUser } from "react-icons/fa";

interface LinkItemProps {
  name: string;
  icon: IconType;
  url: string;
}

interface NavItemProps extends FlexProps {
  icon: IconType;
  url: string;
  label: string;
}

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Storefront", icon: FaStore, url: "/vendor/storefront" },
  { name: "Products", icon: FaTag, url: "/vendor/products" },
  { name: "Account", icon: FaUser, url: "/vendor/account" },
];

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const [session, setSession] = useState<Session | null>(null);
  const [userId, setUserId] = useState<string>();
  const [userData, setUserData] = useState<User>();
  const colors = useTheme().colors;

  useEffect(() => {
    supabase.auth
      .getSession()
      .then((session) => {
        setSession(session?.data?.session);
        setUserId(session?.data?.session?.user.id);
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

  return (
    <Box
      borderRight="1px"
      borderRightColor={colors.gray[500]}
      w={{ base: "full", md: 60 }}
      h="full"
      {...rest}
    >
      <Flex
        h={8}
        alignItems="center"
        justifyContent="space-between"
      >
        <CloseButton
          display={{ base: "flex", md: "none" }}
          onClick={onClose}
        />
      </Flex>
      <Stack spacing={2}>
        {LinkItems.map((link) => (
          <NavItem
            key={link.name}
            icon={link.icon}
            url={link.url + `/${userData?.vendorId}`}
            label={link.name}
          />
        ))}
      </Stack>
    </Box>
  );
};

const NavItem = ({ icon, url, label, ...rest }: NavItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === url;
  const colors = useTheme().colors;

  return (
    <Link
      href={url}
      style={{ textDecoration: "none" }}
    >
      <Box _focus={{ boxShadow: "none" }}>
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={isActive ? {} : { bg: colors.gray[500] }}
          bg={isActive ? colors.clay[300] : undefined}
          color={isActive ? colors.beige[400] : colors.text.regularNav}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              as={icon}
            />
          )}
          <Text
            fontWeight={700}
            color={isActive ? colors.beige[400] : colors.text.regularNav}
          >
            {label}
          </Text>
        </Flex>
      </Box>
    </Link>
  );
};

const SideBar = () => {
  const { onClose } = useDisclosure();

  return (
    <SidebarContent onClose={onClose} />
  );
};

export default SideBar;
