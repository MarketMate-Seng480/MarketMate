"use client";

import {
  Box,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Product } from "@/app/types";
import ProductEditModalContainer from "./ProductEditModalContainer";

const IMAGE =
  "https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80";

export default function ProductCard({
  initialProductInfo,
  setProductInfo,
}: {
  initialProductInfo: Product;
  setProductInfo: (index: number, product: Product) => void;
}) {
  const [tempProductInfo, setTempProductInfo] = useState(initialProductInfo);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    let status = localStorage.getItem("isLoggedIn");
    setLoggedIn(status === "true");
  }, []);

  return (
    <>
      <Box
        as="button"
        role={"group"}
        p={6}
        maxW={"330px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"lg"}
        rounded={"lg"}
        pos={"relative"}
        _hover={{ bg: "#ebedf0" }}
        zIndex={1}
        disabled={!isLoggedIn}
        onClick={onOpen}
      >
        <Box
          rounded={"lg"}
          mt={-12}
          pos={"relative"}
          height={"230px"}
          _after={{
            transition: "all .3s ease",
            content: '""',
            w: "full",
            h: "full",
            pos: "absolute",
            top: 2,
            left: 0,
            backgroundImage: `url(${tempProductInfo.image})`,
            filter: "blur(15px)",
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: "blur(20px)",
            },
          }}
        >
          <Image
            rounded={"lg"}
            height={230}
            width={282}
            objectFit={"cover"}
            src={tempProductInfo.image}
            alt="#"
          />
        </Box>
        <Stack
          pt={10}
          align={"center"}
        >
          <Heading
            fontSize={"lg"}
            fontFamily={"body"}
            fontWeight={500}
          >
            {tempProductInfo.name}
          </Heading>
          <Stack
            direction={"row"}
            align={"center"}
          >
            <Text
              fontWeight={800}
              fontSize={"xl"}
            >
              ${tempProductInfo.price}
            </Text>
          </Stack>
        </Stack>
      </Box>

      <ProductEditModalContainer
        isOpen={isOpen}
        onClose={onClose}
        initialProductInfo={tempProductInfo}
        setProductInfo={setTempProductInfo}
      />
    </>
  );
}
