import { Button, Card, CardBody, Heading, Stack, Image, Text } from "@chakra-ui/react";
import Link from 'next/link';
import React from "react";
import { Event } from "../types"

export const EventCard: React.FC<Event> = (event: Event) => {
    const {id, image, name, date, location, description} = event;
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
                        <Heading size='md'>{name}</Heading>
                        <Text as='b' color='gray'>{date}</Text>
                        <Text as='em' color='gray'>{location}</Text>
                    </Stack>
                    <Text>{description}</Text>
                    <Button 
                        colorScheme='gray' 
                        borderRadius='full'
                        alignSelf='end'
                    >
                        <Link href={`/market/${id}`} passHref>
                            View details
                        </Link>
                    </Button>
                </Stack>
            </CardBody>
        </Card>
    );
};