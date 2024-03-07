"use client";
import React from 'react';
import {
  VStack,
  StackDivider,
  Button,
  Box,
  HStack,
  Text,
  Image,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Flex,
  Container,
} from '@chakra-ui/react';

type CartItemType = {
  id: string;
  imageUrl: string;
  name: string;
  quantity: number;
  price: number;
  vendorName: string;
};

const cartItems: CartItemType[] = [
  {
    id: '1',
    imageUrl: "https://picsum.photos/id/237/200/300",
    name: "Handmade Mug",
    quantity: 2,
    price: 13.00,
    vendorName: "Cute Mugs Co.",
  },
  {
    id: '2',
    imageUrl: "https://picsum.photos/id/238/200/300",
    name: "Cozy Blanket",
    quantity: 1,
    price: 19.99,
    vendorName: "Comfy Textiles Co.",
  },
  // Add more items as needed...
];

// Simple cart item component with no backend interaction
const CartItem: React.FC<CartItemType> = ({
  imageUrl,
  name,
  quantity,
  price,
  vendorName,
}) => {
  // Placeholder function for quantity change
  const onQuantityChange = (quantity: string) => {
    console.log(`New quantity: ${quantity}`);
  };

  return (
    <Flex align="center" justify="space-between" p={5} boxShadow="md" borderRadius="lg">
      <Image boxSize="75px" src={imageUrl} alt={name} mr={4} />
      <Box>
        <Text fontWeight="bold">{name}</Text>
        <Text fontSize="sm">{vendorName}</Text>
      </Box>
      <NumberInput defaultValue={quantity} min={1} onChange={onQuantityChange}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Text>${(quantity * price).toFixed(2)}</Text>
    </Flex>
  );
};



export default function Page() {
  return (
    <Container maxW="container.xl">
      <VStack spacing={4} align="stretch" boxShadow="md" borderRadius="lg" overflow="hidden">
        {/* Header Row */}
        <Flex align="center" justify="space-between" p={5} bg="gray.100">
          <Text ml="77px" fontWeight="bold">Item</Text> {/* Adjust marginLeft to align with the cart items */}
          <Box flex="1" textAlign="center"><Text fontWeight="bold">Quantity</Text></Box>
          <Box flex="1" textAlign="right" mr="4"><Text fontWeight="bold">Total</Text></Box>
        </Flex>
        
        {/* Cart Items List */}
        <VStack
          divider={<StackDivider borderColor="gray.200" />}
          spacing={0} // Adjust spacing between items if needed
        >
          {cartItems.map(item => (
            <CartItem
              key={item.id}
              id={item.id}
              imageUrl={item.imageUrl}
              name={item.name}
              quantity={item.quantity}
              price={item.price}
              vendorName={item.vendorName}
            />
          ))}
        </VStack>
      </VStack>
      <Flex justifyContent="flex-end" p={5}>
        <Button colorScheme="pink" width="100px">Place order</Button>
      </Flex>
    </Container>
  );
}