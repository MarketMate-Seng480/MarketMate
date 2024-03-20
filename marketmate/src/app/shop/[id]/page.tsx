"use client";
import { useState, useEffect } from "react";
import { Box, VStack } from "@chakra-ui/react";
import PageContainer from "@components/PageContainer";
import { usePathname } from "next/navigation";
import { Vendor_Extended } from "@/app/lib/types";
import LoadingPage from "@components/Loading";
import PublicStoreFrontPage from "@components/publicStoreFront/PublicStorefrontPage";
import Footer from "@components/Footer";

export default function Shop() {
  const path = usePathname();
  const slug = path.split("/").pop();
  const fetchURL = `/api/vendors/${slug}`;
  const [vendor, setVendor] = useState<Vendor_Extended | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const response = await fetch(fetchURL);
        const data = await response.json();

        if (response.status !== 200) {
          throw new Error("Error fetching vendor");
        }
        setError(false);
        setVendor(data.data);
      } catch (error) {
        setError(true);
      }
    };

    fetchVendor();
  }, [fetchURL]);

  return (
    <PageContainer>
      <VStack
        paddingX={{ base: 4, md: 10 }}
        paddingBottom={10}
        spacing={6}
        maxW={"1400px"}
      >
        {error ? <text>Error fetching vendor</text> : null}
        {vendor ? <PublicStoreFrontPage {...vendor} /> : <LoadingPage />}
      </VStack>
      <Footer />
    </PageContainer>
  );
}
