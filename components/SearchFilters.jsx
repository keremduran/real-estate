import { useEffect, useState, useRef } from 'react';
import { Flex, Select, Box, Input, Skeleton, Button } from '@chakra-ui/react';
import { filterData, getFilterValues } from '../utils/filterData';
import { fetchApi, baseUrl } from '../utils/fetchApi';
import router from 'next/router';

const SearchFilters = () => {
    const [filters, setFilters] = useState(filterData);
    const [loading, setLoading] = useState(false);
    const [locationQuery, setLocationQuery] = useState();
    const [locationData, setLocationData] = useState([]);
    const locationInput = useRef(null);

    const handleLocationClick = () => {
        setLocationQuery(locationInput.current.value);
    };

    useEffect(() => {
        if (locationQuery) {
            const fetchData = async () => {
                setLoading(true);
                const data = await fetchApi(
                    `${baseUrl}/auto-complete?query=${locationQuery}`
                );
                setLoading(false);
                setLocationData(data?.hits);
            };

            fetchData();
        }
    }, [locationQuery]);

    const searchProperties = (filterValues) => {
        const pathname = router.pathname;
        const { query } = router;

        const values = getFilterValues(filterValues);

        values.forEach((item) => {
            if (item.value && filterValues?.[item.name]) {
                query[item.name] = item.value;
            }
        });

        router.push({ pathname, query });
    };
    return (
        <Flex bg="gray.100" p="4" justifyContent="center" flexWrap="wrap">
            {filters.map((filter) => (
                <Box key={filter.queryName}>
                    <Select
                        placeholder={filter.placeholder}
                        w="fit-content"
                        p="2"
                        onChange={(e) =>
                            searchProperties({
                                [filter.queryName]: e.target.value,
                            })
                        }
                    >
                        {filter?.items?.map((item) => (
                            <option key={item.value} value={item.value}>
                                {item.name}
                            </option>
                        ))}
                    </Select>
                </Box>
            ))}
            <Flex
                w="100%"
                justifyContent="center"
                alignItems="center"
                flexWrap="wrap"
            >
                <Button size="sm" bg="gray.300" onClick={handleLocationClick}>
                    Search Locations
                </Button>
                <Input
                    bg="white"
                    pr="4.5rem"
                    m="0.5rem"
                    width="fit-content"
                    placeholder="Enter location"
                    ref={locationInput}
                />
                <Skeleton isLoaded={!loading}>
                    <Select
                        placeholder={`Select Location (${locationData?.length})`}
                        w="15rem"
                        p="2"
                        onChange={(e) =>
                            searchProperties({
                                locationExternalIDs: e.target.value,
                            })
                        }
                    >
                        {locationData?.map((location) => (
                            <option
                                key={location.name}
                                value={location.externalID}
                            >
                                {location.name}
                            </option>
                        ))}
                    </Select>
                </Skeleton>
            </Flex>
        </Flex>
    );
};

export default SearchFilters;
