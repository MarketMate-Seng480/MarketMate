import { MenuItem, MenuItemProps, MenuList, MenuProps, useTheme } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "./CustomLinks";

interface CustomMenuProps extends MenuProps{
    children: React.ReactNode;
}

export const CustomMenuList: React.FC<CustomMenuProps> = ({ children, ...rest }) => {
    const colors = useTheme().colors;
    return (
        <MenuList
            border={'1px'}
            borderColor={colors.gray[500]}
            padding={0}
            {...rest}
        >
            {children}
        </MenuList>
    )
}

interface CustomMenuItemProps extends MenuItemProps {
    children: React.ReactNode;
    onClick?: () => void;
}

export const CustomMenuItem: React.FC<CustomMenuItemProps> = ({ children, onClick, ...rest }) => {
    const colors = useTheme().colors;
    return (
        <MenuItem
            onClick={onClick}
            background={'none'}
            padding={0}
            {...rest}
        >
            <NavLink
                _hover={{ bg: colors.gray[500]}}
                w={'full'}
                padding={4}
                justifyContent={'start'}
            >
                {children}
            </NavLink>
        </MenuItem>
    );
};