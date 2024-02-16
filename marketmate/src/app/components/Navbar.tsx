'use client'
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Heading,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { useAuth } from '../authContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Props {
  children: React.ReactNode
}

const NavLink = (props: Props) => {
    const router = useRouter();
    const { children } = props;

    const handleClick = () => {
        if (children === 'Home') {
            router.push('/');
        }
    }

    return (
        <Box
        as="a"
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        onClick={handleClick}>
        {children}
        </Box>
    )
}

export default function Navbar() {
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isLoggedIn, logout } = useAuth();

    const handleLogin = () => {
        router.push('/login');
    }
    const handleLogout = () => {
        logout();
    }
    const handleVendor = () => {
        router.push('/vendor');
    }

    return (
        <>
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
            <IconButton
                size={'md'}
                icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                aria-label={'Open Menu'}
                display={{ md: 'none' }}
                onClick={isOpen ? onClose : onOpen}
            />
            <HStack spacing={8} alignItems={'center'}>
                <Link href={'/'} >
                    <Heading
                        as={"h1"}
                        size={"lg"}
                        >
                        MarketMate
                    </Heading>
                </Link>
            </HStack>
            <Flex alignItems={'center'}>
                {isLoggedIn ? (
                    <Menu>
                        <MenuButton
                        as={Button}
                        rounded={'full'}
                        variant={'link'}
                        cursor={'pointer'}
                        minW={0}>
                        <Avatar
                            size={'sm'}
                            src={
                            'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
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
                    <Button onClick={handleLogin}>Log In</Button>
                )}
            </Flex>
            </Flex>
        </Box>
        </>
    )
}