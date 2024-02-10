'use client'

import { Link, Box, Button } from '@chakra-ui/react'
import React, { useState } from 'react'

const Navbar: React.FC = () => {
    const [isVendor, setIsVendor] = useState(false)
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
                {isVendor ? (
                    <>
                        <Link href='/vendor'>my shop</Link>
                        <Button colorScheme='pink' onClick={() => setIsVendor(true)}>Logout</Button>
                    </>
                ) : (
                    <Button colorScheme='pink' onClick={() => setIsVendor(true)}>Login</Button>
                )}
            </Box>
        </Box>
    )
}

export default Navbar