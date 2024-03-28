import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  Text,
  HStack,
  VStack,
  Center,
  useToast,
  Box,
} from "@chakra-ui/react";
import { CustomHeading } from "@components/CustomHeading";
import { CustomButton } from "@components/CustomButton";
import { FiTrash } from "react-icons/fi";
import { supabase } from "../lib/supabase";
import { User } from "@supabase/auth-helpers-nextjs";
import type {
  User as PrismaUser,
  Product as PrismaProduct,
  Vendor as PrismaVendor,
  Cart as PrismaCart,
  Cart_Item as PrismaCartItem,
} from "@prisma/client";

export interface OrderInfo {
  productName: string;
  quantity: number;
  vendorName: string;
  vendorID: string;
  vendorEmail: string;
}
export interface EmailProps {
  buyerName: string; // User's first_name + last_name
  buyerEmail: string; // User's email
  productLists: OrderInfo[]; // Array of Products
}

interface CartProps extends PrismaCart {
  user: UserDB;
  products: CartItem[];
}

interface Vendor extends PrismaVendor {
  userId: string;
  user: UserDB;
}

interface CartItem extends PrismaCartItem {
  cart: CartProps;
  product: Product;
  quantity: number;
}

interface Product extends PrismaProduct {
  vendorId: string;
  vendor: Vendor;
  carts: CartProps[];
}

interface UserDB extends PrismaUser {
  cart?: CartProps;
  vendor?: Vendor;
}

interface ProcessedCartItem {
  id: string;
  productID: string;
  name: string;
  pricePerUnit: number;
  quantity: number;
  featureImage: string;
  vendor: Vendor;
}

function processedCartItem(cartItems: CartItem[]): ProcessedCartItem[] {
  const processedProducts: { [key: string]: ProcessedCartItem } = {};
  cartItems.forEach((cartItem) => {
    processedProducts[cartItem.id] = {
      id: cartItem.id,
      productID: cartItem.product.id,
      name: cartItem.product.name,
      pricePerUnit: cartItem.product.price,
      quantity: cartItem.quantity,
      featureImage: cartItem.product.featureImage,
      vendor: cartItem.product.vendor,
    };
  });

  return Object.values(processedProducts);
}

function prepareOrderRequest(user: UserDB, products: ProcessedCartItem[]): EmailProps {
  const orderInfo: OrderInfo[] = products.map((product) => ({
    productName: product.name,
    quantity: product.quantity,
    vendorName: product.vendor.name,
    vendorID: product.vendor.id,
    vendorEmail: product.vendor.email,
  }));

  return {
    buyerName: user.first_name + " " + user.last_name,
    buyerEmail: user.email,
    productLists: orderInfo,
  };
}

export default function CartTable() {
  const [authUser, setAuthUser] = useState<User | null>();
  const [user, setUser] = useState<UserDB | null>();
  const [cart, setCart] = useState<CartProps>();
  const [products, setProducts] = useState<ProcessedCartItem[]>([]);
  const toast = useToast();

  async function onDeleteRow(productId: string) {
    console.log(`Deleting product with id ${productId}`);

    if (!user || !cart) {
      console.error("User or cart not found");
      return;
    }

    const response = await fetch(`/api/users/${user.id}/cart/${cart.id}/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Update the cart state to remove the 1st occurrence of the product
    const index = products.findIndex((product) => product.id === productId);
    if (index > -1) {
      const newProducts = [...products];
      newProducts.splice(index, 1);
      setProducts(newProducts);
    }
  }

  async function handleCheckout() {
    if (!authUser || !user) {
      console.error("User not found");
      return;
    }

    const orderRequest = prepareOrderRequest(user, products);
    try {
      const response = await fetch("/api/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderRequest),
      });

      if (response.ok) {
        const data = await response.json();
      } else {
        console.error("Email sending failed");
      }

      toast.promise(Promise.resolve(response), {
        success: {
          title: "Order sent successfully",
          description: "You will receive an email shortly",
        },
        loading: { title: "Sending order", description: "Please wait..." },
        error: { title: "Order failed", description: "Please try again later" },
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    supabase.auth
      .getSession()
      .then((session) => {
        setAuthUser(session?.data?.session?.user ?? null);
      })
      .catch((err) => {
        console.log("ERROR GET SESSION: ", err);
      });
  }, []); // Empty dependency array ensures this effect runs only once on mount

  useEffect(() => {
    if (authUser) {
      const fetchData = async () => {
        try {
          const userRes = await fetch(`/api/users/${authUser.id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const userData = (await userRes.json()).data;
          setUser(userData);

          const res = await fetch(`/api/users/${authUser.id}/cart`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          const cartData = (await res.json()).data;
          setCart(cartData);
          setProducts(processedCartItem(cartData.cartItem));
        } catch (error) {
          console.error("Error fetching cart data:", error);
        }
      };
      fetchData();
    }
  }, [authUser]); // Only re-run this effect when the user changes

  return (
    <Center>
      <VStack
        spacing={5}
        align={"start"}
        width={{ base: "100%", md: "80%", lg: "60%" }}
        p={{ base: 5, md: 10, lg: 20 }}
        maxWidth={"1200px"}
      >
        <CustomHeading>Cart</CustomHeading>

        <Text color={"gray.300"}>You have {products.length} products in the cart.</Text>

        <Table>
          <Thead>
            <Tr>
              <Th color={"black"}>Item</Th>
              <Th color={"black"}>Quantity</Th>
              <Th color={"black"}>Total</Th>
              <Th color={"black"}>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.map((product) => (
              <Tr key={product.id}>
                <Td>
                  <HStack spacing={5}>
                    <Image
                      src={product.featureImage}
                      alt={product.name}
                      width={{ base: "50px", md: "100px" }}
                      height={{ base: "50px", md: "100px" }}
                      borderRadius={"lg"}
                      objectFit="cover"
                      fallback={
                        <Box>
                          <Center
                            width={{ base: "50px", md: "100px" }}
                            height={{ base: "50px", md: "100px" }}
                            bg={"gray.500"}
                            borderRadius={"lg"}
                          >
                            <Text color={"black"}>Image</Text>
                          </Center>
                        </Box>
                      }
                    />
                    <VStack align="start">
                      <Text fontWeight="bold">{product.name}</Text>
                      <Text>{product.vendor.name}</Text>
                    </VStack>
                  </HStack>
                </Td>
                <Td>{product.quantity}</Td>
                <Td
                  color="blue.400"
                  fontWeight="bold"
                >
                  ${(product.pricePerUnit * product.quantity).toFixed(2)}
                </Td>
                <Td>
                  <CustomButton
                    variant="secondary"
                    onClick={() => onDeleteRow(product.id)}
                  >
                    <FiTrash />
                  </CustomButton>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <HStack
          align={{ base: "start", md: "center", lg: "end" }}
          width={"100%"}
        >
          <CustomButton
            colorScheme="primary"
            size="lg"
            mt={5}
            onClick={handleCheckout}
          >
            Checkout
          </CustomButton>
        </HStack>
      </VStack>
    </Center>
  );
}
