"use client"
import { Heading, HeadingProps, useTheme } from "@chakra-ui/react";
import React from "react";

interface CustomHeadingProps extends HeadingProps {
    children: React.ReactNode;
}
export const CustomHeading: React.FC<CustomHeadingProps> = ({ children, ...rest }) => {
    const theme = useTheme();
    const headingColor = theme.colors.text.heading;
    return (
        <Heading color={headingColor} {...rest}>{children}</Heading>
    )
}