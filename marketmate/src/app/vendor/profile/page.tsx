"use client";

import { useState } from "react";
import { Button, Box, useDisclosure, useColorModeValue } from "@chakra-ui/react";
import { FiEdit } from "react-icons/fi";
import TopBanner from "./TopBanner";
import InfoSection from "./InfoSection";
import ProfileEditModalContainer from "./ProfileEditForm";
import { sampleVendors } from "@/app/sampleData/sampleVendors";

export default function VendorProfilePage() {
  const [vendorInfo, setVendorInfo] = useState(sampleVendors[0]);
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
          color={useColorModeValue("grey.800", "grey.200")}
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
