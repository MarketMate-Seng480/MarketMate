"use client"
import { Button, ButtonProps, useTheme } from "@chakra-ui/react";
import React from "react";

interface CustomButtonProps extends ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary';
}
export const CustomButton: React.FC<CustomButtonProps> = ({ children, variant, ...rest }) => {
    const colors = useTheme().colors;

    return (
        <>
            {variant === 'secondary' ? (
                <Button
                    variant={'outline'}
                    color={colors.clay[200]}
                    border={'2px'}
                    borderColor={colors.clay[200]}
                    _hover={{ bg: colors.clay[400] }}
                    _active={{ bg: colors.clay[300], color: colors.beige[400] }}
                    _disabled={{ bg: colors.gray[600], color: colors.gray[500], borderColor: colors.gray[500] }}
                    {...rest}
                >
                    {children}
                </Button>
            ) : (
                <Button
                    color={colors.beige[400]}
                    bg={colors.clay[200]}
                    _hover={{ bg: colors.clay[100] }}
                    _active={{ bg: colors.clay[300] }}
                    _disabled={{ bg: colors.gray[500] }}
                    {...rest}
                >
                    {children}
                </Button>
            )}
        </>
    );
};