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
  Heading,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  MenuDivider,
  Button
} from "@chakra-ui/react";
import { FiUser, FiMenu, FiShoppingCart } from "react-icons/fi";
import { IconType } from "react-icons";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Session } from "@supabase/auth-helpers-nextjs";
import { supabase } from "@/app/lib/supabase";

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

const LinkItems: Array<LinkItemProps> = [
  // { name: "Overview", icon: FiHome, url: "/vendor" },
  { name: "Profile", icon: FiUser, url: "/vendor/profile" },
  { name: "Products", icon: FiShoppingCart, url: "/vendor/products" },
];

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
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
          url={link.url}
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
