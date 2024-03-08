"use client";
import {
  Box,
  Flex,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Popover,
  PopoverTrigger,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { FiShoppingCart, FiUser } from "react-icons/fi";
import { Session } from "@supabase/auth-helpers-nextjs";
import { supabase } from "../../lib/supabase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";
import { LogoLink, NavLink } from "./Links";

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
          <LogoLink/>
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
              <Button
                variant={"ghost"}
                color={"#119DA4"}
              >
                <FiShoppingCart />
              </Button>

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
                  {userData?.role == "vendor" ? (
                    <>
                      <MenuItem onClick={handleVendor}>My Store</MenuItem>
                      <MenuDivider />
                    </>
                  ) : (
                    <>
                      <MenuItem onClick={handleNewVendor}>Become A Vendor</MenuItem>
                      <MenuDivider />
                    </>
                  )}
                  <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                </MenuList>
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

              <NavLink variant={'emphasis'} href={"/login"}>
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
              <NavLink>{navItem.label}</NavLink>
            </PopoverTrigger>

            {/* Keeping in case we decide to re-introduce drop-down nav items */}
            {/* {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav
                      key={child.label}
                      {...child}
                    />
                  ))}
                </Stack>
              </PopoverContent>
            )} */}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

/* Keeping in case we decide to re-introduce drop-down nav items */
// const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
//   return (
//     <Box
//       as="a"
//       href={href}
//       role={"group"}
//       display={"block"}
//       p={2}
//       rounded={"md"}
//       _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
//     >
//       <Stack
//         direction={"row"}
//         align={"center"}
//       >
//         <Box>
//           <Text
//             transition={"all .3s ease"}
//             _groupHover={{ color: "pink.400" }}
//             fontWeight={500}
//           >
//             {label}
//           </Text>
//           <Text fontSize={"sm"}>{subLabel}</Text>
//         </Box>
//         <Flex
//           transition={"all .3s ease"}
//           transform={"translateX(-10px)"}
//           opacity={0}
//           _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
//           justify={"flex-end"}
//           align={"center"}
//           flex={1}
//         >
//           <Icon
//             color={"pink.400"}
//             w={5}
//             h={5}
//             as={ChevronRightIcon}
//           />
//         </Flex>
//       </Stack>
//     </Box>
//   );
// };

const MobileNav = () => {
  return (
    <VStack
      p={4}
      spacing={4}
      alignItems={'start'}
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

/* Keeping this in case we want to re-introduce drop-down nav items */
// const MobileNavItem = ({ label, children, href }: NavItem) => {
//   const { isOpen, onToggle } = useDisclosure();

//   return (
//     <Stack
//       spacing={4}
//       onClick={children && onToggle}
//     >
//       <Box
//         py={2}
//         as="a"
//         href={href ?? "#"}
//         justifyContent="space-between"
//         alignItems="center"
//         _hover={{
//           textDecoration: "none",
//         }}
//       >
//         <Text
//           fontWeight={600}
//           color={useColorModeValue("gray.600", "gray.200")}
//         >
//           {label}
//         </Text>
//         {children && (
//           <Icon
//             as={ChevronDownIcon}
//             transition={"all .25s ease-in-out"}
//             transform={isOpen ? "rotate(180deg)" : ""}
//             w={6}
//             h={6}
//           />
//         )}
//       </Box>

//       <Collapse
//         in={isOpen}
//         animateOpacity
//         style={{ marginTop: "0!important" }}
//       >
//         <Stack
//           mt={2}
//           pl={4}
//           borderLeft={1}
//           borderStyle={"solid"}
//           borderColor={useColorModeValue("gray.200", "gray.700")}
//           align={"start"}
//         >
//           {children &&
//             children.map((child) => (
//               <Box
//                 as="a"
//                 key={child.label}
//                 py={2}
//                 href={child.href}
//                 fontWeight={600}
//               >
//                 {child.label}
//               </Box>
//             ))}
//         </Stack>
//       </Collapse>
//     </Stack>
//   );
// };

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
  //   {
  //     label: "Shop",
  //     children: [
  //       {
  //         label: "Shop By Products",
  //         // subLabel: "A complete list of products",
  //         href: "#",
  //       },
  //       {
  //         label: "Shop By Vendors",
  //         // subLabel: "Find a vendor near you",
  //         href: "#",
  //       },
  //     ],
  //   },
  {
    label: "Vendors",
    href: "/vendors",
  },
  {
    label: "Products",
    href: "/products",
  },
];

