import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Flex, Box, Text, Icon, Center } from '@chakra-ui/react';
import { BsFilter } from 'react-icons/bs';
import SearchFilters from '../components/SearchFilters';
import Property from '../components/Property';
import { fetchApi, baseUrl } from '../utils/fetchApi';

const Search = ({ properties }) => {
    const [searchFilters, setSearchFilters] = useState(false);
    const router = useRouter();
    useEffect(() => {
        console.log('UF');
    }, [properties]);
    return (
        <Box>
            <Flex
                cursor="pointer"
                bg="gray.100"
                borderBottom="1px"
                borderColor="gray.200"
                p="2"
                fontWeight="black"
                fontSize="lg"
                justifyContent="center"
                alignItems="center"
                onClick={() => setSearchFilters((prevFilters) => !prevFilters)}
            >
                <Text>Search Property By Filters</Text>
                <Icon paddingLeft="2" w="7" as={BsFilter} />
            </Flex>
            {searchFilters && <SearchFilters />}
            <Center>
                <Text fontSize="3xl" p="4" fontWeight="bold">
                    Properties {router.query.purpose}
                </Text>
            </Center>
            <Center flexWrap="wrap">
                {properties.map((property) => (
                    <Property property={property} key={property.id} />
                ))}
            </Center>
            {properties.length === 0 && (
                <Flex
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                    marginTop="5"
                    marginBottom="5"
                >
                    No Result
                </Flex>
            )}
        </Box>
    );
};

export async function getServerSideProps({ query }) {
    const purpose = query.purpose || 'for-rent';
    const rentFrequency = query.rentFrequency || 'yearly';
    const minPrice = query.minPrice || '0';
    const maxPrice = query.maxPrice || '1000000';
    const roomsMin = query.roomsMin || '0';
    const bathsMin = query.bathsMin || '0';
    const sort = query.sort || 'price-desc';
    const areaMax = query.areaMax || '35000';
    const locationExternalIDs = query.locationExternalIDs || '5002';
    const categoryExternalID = query.categoryExternalID || '4';

    const data = await fetchApi(
        `${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`
    );

    return {
        props: {
            properties: data?.hits,
        },
    };
}

export default Search;
