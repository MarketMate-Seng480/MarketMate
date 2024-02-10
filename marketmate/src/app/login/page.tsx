import React from 'react';
import { Button } from '@chakra-ui/react';

// TODO: Clicking this button should update global state to be user type 'vendor'
function Login() {
  return (
      <Button colorScheme='blue'>
        Proceed as vendor
      </Button>
  );
}

export default Login