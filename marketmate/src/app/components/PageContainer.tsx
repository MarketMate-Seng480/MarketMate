import { Box, VStack } from "@chakra-ui/react";
import React from "react";
import Navbar from "./Navbar";

interface PageContainerProps {
    children: React.ReactNode;
}

export const PageContainer: React.FC<PageContainerProps> = ({children}) => {
    return (
        <Box>
            <Navbar />
            <VStack padding={10} spacing={6}>
                {children}
            </VStack>
        </Box>

    )
}