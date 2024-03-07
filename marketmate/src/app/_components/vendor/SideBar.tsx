"use client";
import {
  IconButton,
  Box,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Link,
  Spacer,
  CloseButton,
} from "@chakra-ui/react";
import { FiUser, FiMenu, FiShoppingCart } from "react-icons/fi";
import { IconType } from "react-icons";
import { usePathname } from "next/navigation";
import { AccountButton, HomeLink } from "@components/Navbar";
import { Session } from "@supabase/auth-helpers-nextjs";
import { supabase } from "../../lib/supabase";
import { useEffect, useState } from "react";
import { User, Vendor } from "@prisma/client";

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
  { name: "Profile", icon: FiUser, url: "/vendor/profile" },
  { name: "Products", icon: FiShoppingCart, url: "/vendor/products" },
];

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const [session, setSession] = useState<Session | null>(null);
  const [userId, setUserId] = useState<string>();
  const [userData, setUserData] = useState<User>();

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
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex
        h="20"
        alignItems="center"
        mx="8"
        justifyContent="space-between"
      >
        <HomeLink />
        <CloseButton
          display={{ base: "flex", md: "none" }}
          onClick={onClose}
        />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          url={link.url + `/${userData?.vendorId}`}
          label={link.name}
        />
      ))}
    </Box>
  );
};

const NavItem = ({ icon, url, label, ...rest }: NavItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === url;

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
          _hover={isActive ? {} : { bg: "gray.100", color: "black" }}
          bg={isActive ? "gray.500" : undefined}
          color={isActive ? "white" : undefined}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              as={icon}
            />
          )}
          <Text fontWeight="medium">{label}</Text>
        </Flex>
      </Box>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const pathname = usePathname();
  const headingTitle = LinkItems.find((link) => link.url === pathname)?.name;

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "flex" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
        as={"h1"}
        mx={{ base: "2", md: "0" }}
      >
        {headingTitle}
      </Text>

      <Spacer />

      <AccountButton isVendorPage={true} />
    </Flex>
  );
};

const SideBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>

      <MobileNav onOpen={onOpen} />
    </>
  );
};

export default SideBar;
