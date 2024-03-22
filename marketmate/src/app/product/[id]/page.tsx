"use client";
import { useEffect, useState } from "react";
import { VStack, Image, Text, useTheme, SimpleGrid, useToast } from "@chakra-ui/react";
import PageContainer from "@components/PageContainer";
import { usePathname } from "next/navigation";
import type { Product, Vendor } from "@prisma/client";
import { NavLink } from "@components/navigation/CustomLinks";
import { CustomButton } from "@components/CustomButton";
import LoadingPage from "@components/Loading";
import { User as AuthUser } from "@supabase/auth-helpers-nextjs";
import { supabase } from "@/app/lib/supabase";
import type {
  User,
  Product as PrismaProduct,
  Vendor as PrismaVendor,
  Cart as PrismaCart,
} from "@prisma/client";

export default function ProductPage() {
  const toast = useToast();
  const [authUser, setAuthUser] = useState<AuthUser | null>();
  const [user, setUser] = useState<User | null>();
  const colors = useTheme().colors;
  const path = usePathname();
  const slug = path.split("/").pop();
  const fetchURL = `/api/products/${slug}`;
  const [cartId, setCartId] = useState<String | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
    const fetchUser = async () => {
      try {
        if (authUser) {
          const response = await fetch(`/api/users/${authUser.id}`);
          const data = await response.json();
          setUser(data.data);
        }
      } catch (error) {
        console.log("Error fetching user", error);
      }
    };
    
    fetchUser();
  }, [authUser]);

  // the issue is that this fetchCart runs on mount and when user is changing

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(fetchURL);
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
    const fetchCart = async () => {
      try{
        if (user?.cartId != null) {
            console.log("cartID is not null");
            setCartId(user.cartId);
        } else {
            console.log("No cart found for user, generating new cart");
            const newCart = await fetch(`/api/users/${user?.id}/cart`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            });
            const cartData = await newCart.json();
            setCartId(cartData.id);
            console.log("New cart:", cartData);
        }
      } catch (error) {
        console.error("Error fetching cart data:", error); 
      }
    };
    if (user != null) {
      fetchCart();
    }
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
      if (cartId != null) {
          setIsLoading(false);
      }
  }, [cartId]);


  async function addToCart() {
      setIsLoading(true);
      console.log("Cart id", user?.cartId);
      console.log("user id", user?.id);
      console.log("cart id from usestate: ", cartId);
      // add isloading here to the button, 
      
      const response = await fetch(`/api/users/${authUser?.id}/cart/${cartId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product?.id,
          quantity: 1,
        }),
      });
      
      const data = await response.json();
      console.log("add to cart data", data);
      
      toast.promise(Promise.resolve(response), {
        success: {
          title: "Product added to cart",
          description: "Check your cart to proceed to checkout",
        },
        loading: { title: "Adding to cart", description: "Please wait..." },
        error: { title: "Failed to add item to cart", description: "Please try again later" },
      });
      setIsLoading(false);
    }
  

  return (
    <PageContainer>
      {product ? (
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
              onClick={addToCart}
            >
              Add to Cart
            </CustomButton>
          </VStack>
        </SimpleGrid>
      ) : (
        <LoadingPage />
      )}
    </PageContainer>
  );
}
