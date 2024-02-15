import { Button, Card, CardBody, Heading, Stack, Image, Text, Link } from "@chakra-ui/react";
import React from "react";

export interface EventCardProps {
    marketId: string;
    image: string;
    title: string;
    date: string;
    location: string;
    description: string;
}

// TODO: Change card layout if required
export const EventCard: React.FC<EventCardProps> = ({
    marketId,
    image,
    title,
    date,
    location,
    description
}) => {
    return (
        <Card maxW='sm'>
            <CardBody>
                <Image
                src={image}
                alt='Market Image'
                borderRadius='lg'
                />
                <Stack mt='6' spacing='3'>
                    <Stack spacing='1'>
                        <Heading size='md'>{title}</Heading>
                        <Text as='b' color='gray'>{date}</Text>
                        <Text as='em' color='gray'>{location}</Text>
                    </Stack>
                    <Text>{description}</Text>
                    <Button 
                        colorScheme='gray' 
                        borderRadius='full'
                        alignSelf='end'
                    >
                        <Link href={marketId}>View details</Link>
                    </Button>
                </Stack>
            </CardBody>
        </Card>
    )
}