"use client";

import { useState } from "react";
import { Button, Box, useDisclosure, useColorModeValue } from "@chakra-ui/react";
import { FiEdit } from "react-icons/fi";
import { Vendor } from "@/app/types";
import TopBanner from "./TopBanner";
import InfoSection from "./InfoSection";
import ProfileEditModalContainer from "./ProfileEditForm";

export default function VendorProfilePage() {
  const initialVendorInfo: Vendor = {
    name: "Nordie Craft",
    email: "hello@nordie.com",
    phone: "12504445555",
    address: "123 Main St, Victoria, BC 10030",
    logo: "https://images-platform.99static.com//PUbacMO1kj_Pce5m6UVdX4w0ZC4=/0x0:1979x1979/fit-in/500x500/99designs-contests-attachments/115/115048/attachment_115048238",
    description:
      "We are a small business that specializes in handmade crafts. Our store is located in the heart of Victoria, BC. We have a wide selection of products that are perfect for gifts or for yourself.",
    shopTags: ["handmade", "crafts", "gifts"],
  };

  const [vendorInfo, setVendorInfo] = useState(initialVendorInfo);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <TopBanner
        name={vendorInfo.name}
        logo={vendorInfo.logo || ""}
      />

      <Box
        mx={10}
        mt={10}
      >
        <Button
          leftIcon={<FiEdit />}
          color={useColorModeValue("grey.800", "gray.200")}
          variant="solid"
          onClick={onOpen}
        >
          Edit Profile
        </Button>

        <InfoSection {...vendorInfo} />

        <ProfileEditModalContainer
          isOpen={isOpen}
          onClose={onClose}
          initialVendorInfo={vendorInfo}
          setVendorInfo={setVendorInfo}
        />
      </Box>
    </>
  );
}
