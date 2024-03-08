"use client"
import { Box, Menu, MenuButton } from "@chakra-ui/react";
import { CustomHeading } from "../_components/CustomHeading";
import { CustomButton } from "../_components/CustomButton";
import { CustomCard } from "../_components/CustomCard";
import { LogoLink, NavLink } from "../_components/navigation/CustomLinks";
import { CustomMenuItem, CustomMenuList } from "../_components/navigation/CustomMenu";

export default function TestComponents () {
    return (
        <Box padding={'5'} gap={'5'} display={'flex'} flexDirection={'column'} w={'fit-content'}>
            <CustomHeading>Header Text</CustomHeading>
            <CustomButton>Primary Button</CustomButton>
            <CustomButton variant="secondary">Secondary Button</CustomButton>
            <CustomCard>Custom Card</CustomCard>
            <LogoLink/>
            <NavLink variant='emphasis'>Emphasis Nav Link</NavLink>
            <NavLink>Regular Nav Link</NavLink>
            <Menu>
                <MenuButton>Custom Dropdown Menu List</MenuButton>
                <CustomMenuList>
                    <CustomMenuItem onClick={() => console.log()}>Custom Menu Item 1</CustomMenuItem>
                    <CustomMenuItem onClick={() => console.log()}>Custom Menu Item 2</CustomMenuItem>
                </CustomMenuList>
            </Menu>
        </Box>
    )
}