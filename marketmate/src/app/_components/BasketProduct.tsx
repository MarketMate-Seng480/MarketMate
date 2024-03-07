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
  Flex,
  Container,
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
}) => {
  // Placeholder function for quantity change
  const onQuantityChange = (quantity: string) => {
    console.log(`New quantity: ${quantity}`);
  };

  return (
    <Flex align="center" justify="space-between" p={5} boxShadow="md" borderRadius="lg">
      <Image boxSize="75px" src={imageUrl} alt={name} mr={4} />
      <Box flex={2}>
        <Text fontWeight="bold" isTruncated>{name}</Text>
        <Text fontSize="sm" color="gray.500">{vendorName}</Text>
      </Box>
      <NumberInput defaultValue={quantity} min={1} onChange={onQuantityChange} maxW="100px">
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Box flex={1} textAlign="right">
        <Text>${(quantity * price).toFixed(2)}</Text>
      </Box>
    </Flex>
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
