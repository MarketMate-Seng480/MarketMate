"use client";

import { useState } from "react";
import { Button, Box, useDisclosure, useColorModeValue } from "@chakra-ui/react";
import { FiEdit } from "react-icons/fi";
import { Vendor } from "@/app/types";
import TopBanner from "./TopBanner";
import InfoSection from "./InfoSection";
import ProfileEditModalContainer from "./ProfileEditForm";
import { sampleVendors } from "@/app/sampleData/sampleVendors";

export default function VendorProfilePage() {
  const initialVendorInfo = sampleVendors[0];
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
