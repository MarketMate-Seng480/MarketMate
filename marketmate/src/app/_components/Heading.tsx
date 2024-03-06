"use client"
import { Heading, HeadingProps, useTheme } from "@chakra-ui/react";
import React from "react";

interface HeaderTextProps extends HeadingProps {
    children: React.ReactNode;
}
export const HeaderText: React.FC<HeaderTextProps> = ({ children, ...rest }) => {
    const theme = useTheme();
    const headingColor = theme.colors.text.heading;
    return (
        <Heading color={headingColor} {...rest}>{children}</Heading>
    )
}