"use client"
import { Box, useTheme } from "@chakra-ui/react"
import React from "react"

interface CustomCardProps {
    children: React.ReactNode;
}
export const CustomCard: React.FC<CustomCardProps> = ({ children, ...rest }) => {
    const borderColor = useTheme().colors.gray[500];
    return (
        <Box
            border={'1px'}
            borderColor={borderColor}
            rounded={"md"}
            boxShadow={"md"}
            overflow={"hidden"}
            {...rest}
        >
            {children}
        </Box>
    )
}