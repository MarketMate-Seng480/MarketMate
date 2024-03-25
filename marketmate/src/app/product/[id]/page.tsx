"use client";
import { use, useEffect, useState } from "react";
import { VStack, Image, Text, useTheme, SimpleGrid, useToast } from "@chakra-ui/react";
import PageContainer from "@components/PageContainer";
import { usePathname } from "next/navigation";
import type { Product, Vendor, User } from "@prisma/client";
import { NavLink } from "@components/navigation/CustomLinks";
import { CustomButton } from "@components/CustomButton";
import LoadingPage from "@components/Loading";
import { supabase } from "@/app/lib/supabase";
import { useRouter } from "next/navigation";

export default function ProductPage() {
  const toast = useToast();
  const colors = useTheme().colors;
  const path = usePathname();
  const slug = path.split("/").pop();
  const fetchURL = `/api/products/${slug}`;
  const [product, setProduct] = useState<Product | null>(null);
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(fetchURL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log("data", data);
        setProduct(data.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [fetchURL]);

  useEffect(() => {
    const fetchUser = async () => {
      const session = (await supabase.auth.getSession()).data.session;
      if (!session) return;

      const userData = await fetch(`/api/users/${session.user.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const userDataJson = await userData.json();
      console.log("user data", userDataJson);
      setUser(userDataJson.data);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (user === null) return;
        if (user?.cartId === null) {
          const newCart = await fetch(`/api/users/${user?.id}/cart`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          });
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };
    fetchCart();
  }, [user]);

  useEffect(() => {
    const fetchVendor = async () => {
      const fetchURL = `/api/vendors/${product?.vendorId}`;
      try {
        const response = await fetch(fetchURL);
        const data = await response.json();
        console.log("data", data);
        setVendor(data.data);
      } catch (error) {
        console.error("Error fetching vendor:", error);
      }
    };

    if (product) {
      fetchVendor();
    }
  }, [product]);

  useEffect(() => {
    if (product !== null) {
      setIsLoading(false);
    }
  }, [product]);

  async function addToCart() {
    setIsAddingToCart(true);

    if (!user || !product || !user.cartId) {
      console.error("User, product or cart not found");
      setIsLoading(false);
      return;
    }

    const response = await fetch(`/api/users/${user.id}/cart/${user.cartId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: product?.id,
        quantity: 1,
      }),
    });

    toast.promise(Promise.resolve(response), {
      success: {
        title: "Product added to cart",
        description: "Check your cart to proceed to checkout",
      },
      loading: { title: "Adding to cart", description: "Please wait..." },
      error: { title: "Failed to add item to cart", description: "Please try again later" },
    });

    setIsAddingToCart(false);
  }

  return (
    <PageContainer>
      {!isLoading && product ? (
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          spacing={10}
          p={{ base: 5, md: 10, lg: 20 }}
          pb={{ base: 20, lg: 40 }}
        >
          <Image
            src={product.featureImage}
            alt={product.name}
            rounded={"md"}
          />
          <VStack
            align="start"
            spacing={5}
          >
            <Text
              fontSize="xx-large"
              fontWeight={700}
              color={colors.text.body}
            >
              {product.name}
            </Text>
            <NavLink
              variant="emphasis"
              fontSize="large"
              href={`/shop/${vendor?.id}`}
            >
              {vendor?.name}
            </NavLink>
            <Text
              fontSize="x-large"
              color={colors.text.caption}
            >
              ${product.price}
            </Text>
            <Text
              fontSize="20"
              color={colors.text.body}
            >
              {product.description}
            </Text>

            <CustomButton
              isLoading={isLoading}
              alignSelf={"start"}
              onClick={!user ? () => router.push("/login") : addToCart}
              disabled={isAddingToCart}
            >
              {isAddingToCart ? "Adding to Cart..." : "Add to Cart"}
            </CustomButton>
          </VStack>
        </SimpleGrid>
      ) : (
        <LoadingPage />
      )}
    </PageContainer>
  );
}
