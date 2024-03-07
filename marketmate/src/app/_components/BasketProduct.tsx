import React from 'react';
import {
  Box,
  Image,
  Text,
  VStack,
  HStack,
  Stack,
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useColorModeValue,
  Divider,
} from '@chakra-ui/react';

type ProductProps = {
  imageUrl: string;
  name: string;
  quantity: number;
  price: number;
  vendorName: string;
  onQuantityChange: (quantity: number) => void;
};

const CartItem: React.FC<ProductProps> = ({
  imageUrl,
  name,
  quantity,
  price,
  vendorName,
  onQuantityChange,
}) => {
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <HStack
      w="full"
      align="center"
      p={5}
      boxShadow="md"
      borderRadius="lg"
      justifyContent="space-between"
      spacing={4} // Adjust the spacing between elements
    >
      <Image boxSize="75px" src={imageUrl} alt={name} />
      <VStack align="start" flex={1}>
        <Text fontWeight="bold" isTruncated>{name}</Text>
        <Text fontSize="sm" color="gray.500">{vendorName}</Text>
      </VStack>
      <HStack flex={1} justify="center">
        <NumberInput
          size="sm"
          defaultValue={quantity}
          min={1}
          onChange={(_, valueAsNumber) => onQuantityChange(valueAsNumber)}
          w="100px" // You can adjust the width as needed
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </HStack>
      <Text flex={1} textAlign="right">${(quantity * price).toFixed(2)}</Text>
    </HStack>
  );
};
// Example usage in a page component
const CartPage: React.FC = () => {
  // Temporary cart items state (replace with your own state management logic)
  const [cartItems, setCartItems] = React.useState<ProductProps[]>([
    // ...your cart items
  ]);

  const handleQuantityChange = (newQuantity: number, index: number) => {
    const updatedCartItems = cartItems.map((item, idx) =>
      index === idx ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCartItems);
  };

  return (
    <VStack
      divider={<Divider borderColor="gray.200" />}
      spacing={4}
      align="stretch"
      w="full"
    >
      <HStack justifyContent="space-between" px={5}>
        <Text>Item</Text>
        <Text>Quantity</Text>
        <Text>Total</Text>
      </HStack>
      {cartItems.map((item, index) => (
        <CartItem
          key={item.name}
          imageUrl={item.imageUrl}
          name={item.name}
          quantity={item.quantity}
          price={item.price}
          vendorName={item.vendorName}
          onQuantityChange={(quantity) =>
            handleQuantityChange(quantity, index)
          }
        />
      ))}
      <Box p={5}>
        <Button colorScheme="pink" width="full">
          Place order
        </Button>
      </Box>
    </VStack>
  );
};

export default CartPage;
