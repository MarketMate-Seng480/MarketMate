'use client'
import { Link, Box, Button } from '@chakra-ui/react'
import React from 'react'
import { useAuth } from '../authContext';

const Navbar: React.FC = () => {
    const { isVendor,isLoading, login, logout } = useAuth()
    return (
        <Box 
            display='flex' 
            alignItems='center' 
            justifyContent='space-between' 
            padding='2rem' 
            border='2px solid pink'
        >
            <Link href='/'>logo</Link>
            <Box display='flex' justifyContent='end' gap='4rem'>
                {/* Temporary fix for flashing navbar on reload issue, works for demo but should be updated */}
                {(isVendor || isLoading) ? (
                    <>
                        <Link href='/vendor'>my shop</Link>
                        <Button onClick={logout}>Logout</Button>
                    </>
                ) : (
                    <Button onClick={login}>Login</Button>
                )}
            </Box>
        </Box>
    )
}

export default Navbar