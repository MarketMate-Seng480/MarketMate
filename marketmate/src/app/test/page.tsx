import { Box } from "@chakra-ui/react";
import { CustomHeading } from "../_components/CustomHeading";
import { CustomButton } from "../_components/CustomButton";
import { CustomCard } from "../_components/CustomCard";

export default function TestComponents () {
    return (
        <Box padding={'5'} gap={'5'} display={'flex'} flexDirection={'column'} w={'fit-content'}>
            <CustomHeading>Header Text</CustomHeading>
            <CustomButton>Primary Button</CustomButton>
            <CustomButton variant="secondary">Secondary Button</CustomButton>
            <CustomCard>Custom Card</CustomCard>
        </Box>
    )
}