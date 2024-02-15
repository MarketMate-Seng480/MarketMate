import { Button, Card, CardBody, Heading, Stack, Image, Text } from "@chakra-ui/react";
import React from "react";

export const UpcomingEventCard: React.FC = () => {
    return (
        <Card maxW='sm'>
            <CardBody>
                <Image
                src='https://images.unsplash.com/photo-1524259493079-d51c2c78adfe?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                alt='Ceramics Market'
                borderRadius='lg'
                />
                <Stack mt='6' spacing='3'>
                    <Stack spacing='1'>
                        <Heading size='md'>Market Title</Heading>
                        <Text as='b' color='gray'>February 28 - March 3, 2024</Text>
                        <Text as='em' color='gray'>Street Address, Victoria</Text>
                    </Stack>
                    <Text>
                        This market is a celebration of the upcoming spring season. A variety of vendors
                        have been invited to sell their work, including jewellers, painters, ceramicists, 
                        amongst many other artisans!
                    </Text>
                    <Button 
                        colorScheme='gray' 
                        borderRadius='full'
                        alignSelf='end'
                    >
                        View details
                    </Button>
                </Stack>
            </CardBody>
        </Card>
    )
}