import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  IconButton,
  Image,
  Text,
  HStack,
  VStack,
  Center,
  Spacer,
  useToast,
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
  products: Product[];
}

interface Vendor extends PrismaVendor {
  userId: string;
  user: UserDB;
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

interface ProcessedProduct {
  id: string;
  name: string;
  pricePerUnit: number;
  quantity: number;
  featureImage: string;
  vendor: Vendor;
}

function processedProducts(products: Product[]): ProcessedProduct[] {
  const processedProducts: { [key: string]: ProcessedProduct } = {};
  products.forEach((product) => {
    if (processedProducts[product.id]) {
      processedProducts[product.id].quantity++;
    } else {
      processedProducts[product.id] = {
        id: product.id,
        name: product.name,
        pricePerUnit: product.price,
        quantity: 1,
        featureImage: product.featureImage,
        vendor: product.vendor,
      };
    }
  });
  return Object.values(processedProducts);
}

function prepareOrderRequest(user: UserDB, products: ProcessedProduct[]): EmailProps {
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
  const [products, setProducts] = useState<ProcessedProduct[]>([]);
  const toast = useToast();

  async function onDeleteRow(productId: string) {
    console.log(`Deleting product with id ${productId}`);

    if (!user || !cart) {
      console.error("User or cart not found");
      return;
    }

    const response = await fetch(`/api/cart/${user.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productID: productId, cartID: cart.id, userID: user.id }),
    });
    console.log(response);

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
        // console.log(data);
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
      console.log("User:", authUser);
      const fetchData = async () => {
        try {
          const res = await fetch(`/api/cart/${authUser.id}`);
          const cartData = await res.json();
          console.log("Cart data:", cartData.data[0]);
          setUser(cartData.data[0].user);
          setCart(cartData.data);
          setProducts(processedProducts(cartData.data[0].products));
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
        maxW={"1200px"}
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
                      boxSize={{ base: "50px", md: "100px" }}
                      borderRadius={"lg"}
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
                  <CustomButton onClick={() => onDeleteRow(product.id)}>
                    <FiTrash />
                  </CustomButton>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <HStack
          align={"end"}
          width={"100%"}
        >
          <Spacer />
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
