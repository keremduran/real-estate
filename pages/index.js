import Link from 'next/link';
import Image from 'next/image';
import { Flex, Box, Text, Button, Center } from '@chakra-ui/react';
import { baseUrl, fetchApi } from '../utils/fetchApi';
import Property from '../components/Property';

export const Banner = ({
    purpose,
    title1,
    title2,
    desc1,
    desc2,
    buttonText,
    linkName,
    imageUrl,
}) => (
    <Center flexWrap="wrap" m="10">
        <Image alt="Banner img" src={imageUrl} placeholder="blur" blurDataURL={imageUrl} width={500} height={300} />
        <Box
            w={400}
            h={300}
            p="5"
            bgGradient={{
                base: 'linear(to-b, white, blue.100)',
                lg: 'linear(to-r, white, blue.100)',
            }}
            borderRadius={{
                base: '0 0 20% 20%',
                lg: '0 20% 20% 0',
            }}
            textAlign={{
                base: 'center',
                lg: 'left',
            }}
        >
            <Text color="gray.500" fontSize="sm" fontWeight="medium">
                {purpose}
            </Text>
            <Text fontSize="3xl" fontWeight="bold">
                {title1}
                <br />
                {title2}
            </Text>
            <Text
                fontSize="lg"
                paddingTop="3"
                paddingBottom="3"
                color="gray.700"
            >
                {desc1}
                <br />
                {desc2}
            </Text>
            <Button colorScheme={'blue.700'} variant="outline" fontSize="xl">
                <Link href={linkName}>
                    <a>{buttonText}</a>
                </Link>
            </Button>
        </Box>
    </Center>
);

export default function Home({ propertiesForRent, propertiesForSale }) {
    return (
        <Box>
            <Banner
                purpose={'RENT A HOME'}
                title1="Rental Homes for"
                title2="Everyone"
                desc1="Explore Apartment, Villas, Homes"
                desc2="and more"
                buttonText="Explore Renting"
                linkName="/search?purpose=for-rent"
                imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
            />
            <Center mb="5" bgGradient='linear(to-b, blue.100, white)'>
                <Text fontSize="3xl" fontWeight="bold" >
                    Featured Properties for Rent
                </Text>
            </Center>
            <Center flexWrap="wrap">
                {propertiesForRent.map((property) => (
                    <Property property={property} key={property.id} />
                ))}
            </Center>
            <Banner
                purpose={'BUY A HOME'}
                title1="Find, Buy, and Own Your"
                title2="Dream Home"
                desc1="Explore Apartment, Villas, Homes"
                desc2="and more"
                buttonText="Explore Buying"
                linkName="/search?purpose=for-sale"
                imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008"
            />
            <Center mb="5" bgGradient='linear(to-t, white, blue.100)'>
                <Text fontSize="3xl" fontWeight="bold">
                    Featured Properties for Sale
                </Text>
            </Center>
            <Center flexWrap="wrap">
                {propertiesForSale.map((property) => (
                    <Property property={property} key={property.id} />
                ))}
            </Center>
        </Box>
    );
}

export async function getStaticProps() {
    const propertyForSale = await fetchApi(
        `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`
    );
    const propertyForRent = await fetchApi(
        `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`
    );

    return {
        props: {
            propertiesForSale: propertyForSale?.hits,
            propertiesForRent: propertyForRent?.hits,
        },
    };
}
