'use client'
import React from 'react';
import { Button, Link, Box } from '@chakra-ui/react';
import { useAuth } from '../authContext';

// Switches user state to isVendor (logged in state)
const Login: React.FC = () => {
  const { login } = useAuth();
  return (
    <Box display='flex' flexDirection='column' gap='1rem'>
      Login page
      <Button onClick={login} width='fit-content'>
        <Link href='/vendor'>Proceed as vendor</Link>
      </Button>
    </Box>
  );
}

export default Login;