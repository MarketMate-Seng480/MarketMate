"use client";

import { useState, useEffect } from "react";
import { Button, Box, useDisclosure, useColorModeValue } from "@chakra-ui/react";
import { FiEdit } from "react-icons/fi";
import TopBanner from "@components/vendor/TopBanner";
import InfoSection from "@components/vendor/InfoSection";
import ProfileEditModalContainer from "@components/vendor/ProfileEditForm";
import { Vendor } from "@prisma/client";
import { usePathname } from "next/navigation";


export default function VendorProfilePage() {
  const path = usePathname();
  const path_pieces = path.split("/");
  const slug = path_pieces[path_pieces.length - 2];
  const fetchURL = `/api/vendors/${slug}`;
  const [ vendorInfo, setVendorInfo ] = useState<Vendor>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const response = await fetch(fetchURL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log(data);
        setVendorInfo(data.data);
      } catch (error) {
        console.error("Error fetching vendor info:", error);
      }
    };
    fetchVendor();
  });

  return (
    <>
      <TopBanner
        name={vendorInfo?.name || ""}
        logo={vendorInfo?.logo || ""}
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
        <InfoSection {...vendorInfo as Vendor} />
        <ProfileEditModalContainer
          isOpen={isOpen}
          onClose={onClose}
          initialVendorInfo={vendorInfo as Vendor}
          updateVendorInfo={setVendorInfo}
        />
      </Box>
    </>
  );
}
