'use client'
import { Link, Box, Button } from '@chakra-ui/react'
import React from 'react'
import { useAuth } from '../authContext';

const Navbar: React.FC = () => {
    const { isVendor,isLoading, logout } = useAuth();
    return (
        <Box 
            display='flex' 
            alignItems='center' 
            justifyContent='space-between' 
            padding='2rem' 
            bg='lightblue'
        >
            <Link href='/'>logo</Link>
            <Box display='flex' justifyContent='end' gap='4rem'>
                {/* Temporary fix for flashing navbar on reload issue, works for demo but should be updated */}
                {(isVendor || isLoading) ? (
                    <>
                        <Link href='/vendor'>My shop</Link>
                        {/* Switches user state to default (logged out state) */}
                        <Button onClick={logout}>Logout</Button>
                    </>
                ) : (
                    <Link href='/login'>Login</Link>
                )}
            </Box>
        </Box>
    )
}

export default Navbar;