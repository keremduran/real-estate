import { useEffect, useState } from 'react';
import {
    Flex,
    Select,
    Box,
    Text,
    Input,
    Spinner,
    Icon,
    Button,
} from '@chakra-ui/react';
import { filterData, getFilterValues } from '../utils/filterData';
import router from 'next/router';

const SearchFilters = () => {
    const [filters, setFilters] = useState(filterData);
    const searchProperties = (filterValues) => {
        const pathname = router.pathname;
        const { query } = router;

        const values = getFilterValues(filterValues);

        values.forEach((item) => {
            query[item.name] = item.value;
        });

        router.push({pathname, query})
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
                    <Input placeholder='Location' />
                </Box>
            ))}
        </Flex>
    );
};

export default SearchFilters;
