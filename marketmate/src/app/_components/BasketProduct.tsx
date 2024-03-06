import React from 'react';
import {
  Box,
  Image,
  Text,
  Flex,
  NumberInput,
  NumberInputField,
  Button,
} from '@chakra-ui/react';

type ProductProps = {
  imageUrl: string;
  name: string;
  quantity: number;
  price: number;
  onQuantityChange: (quantity: number) => void;
};

const CartItem: React.FC<ProductProps> = ({ imageUrl, name, quantity, price, onQuantityChange }) => {
  return (
    <Flex align="center" p={5} boxShadow="md" borderRadius="lg">
      <Image boxSize="100px" objectFit="cover" src={imageUrl} alt={name} mr={4} />
      <Box flex="1">
        <Text fontWeight="bold">{name}</Text>
        <Text>Price: ${price.toFixed(2)}</Text>
      </Box>
      <NumberInput min={1} value={quantity} onChange={(valueString) => onQuantityChange(Number(valueString))} maxWidth="100px">
        <NumberInputField />
      </NumberInput>
      <Text ml={4}>Total: ${(quantity * price).toFixed(2)}</Text>
    </Flex>
  );
};

export default CartItem;