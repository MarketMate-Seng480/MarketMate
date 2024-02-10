import React from 'react';
import { Button } from '@chakra-ui/react';
import PageContainer from '../components/PageContainer';

// TODO: Clicking this button should update global state to be user type 'vendor'
function Login() {
  return (
    <PageContainer>
      <Button colorScheme='blue'>
        Proceed as vendor
      </Button>
    </PageContainer>
  );
}

export default Login