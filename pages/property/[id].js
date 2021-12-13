import {
    Center,
    Button,
    Box,
    Flex,
    Text,
    Avatar,
} from '@chakra-ui/react';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import millify from 'millify';
import { useState } from 'react';
import { fetchApi, baseUrl } from '../../utils/fetchApi';
import ImageScrollbar from '../../components/ImageScrollbar';

const PropertyDetails = ({
    propertyDetails: {
        price,
        rentFrequency,
        rooms,
        title,
        baths,
        area,
        agency,
        isVerified,
        description,
        type,
        purpose,
        furnishingStatus,
        amenities,
        photos,
    },
}) => {
    const descriptionCollapseLength = 150;
    const collapsedDesc = `${description?.substring(
        0,
        descriptionCollapseLength
    )} ...`;
    const [show, setShow] = useState(false);
    const handleToggle = () => setShow(!show);

    return (
        <Box maxWidth="1000px" margin="auto" p="4">
            {photos && <ImageScrollbar data={photos} />}
            <Box w="full" p="6">
                <Flex
                    paddingTop="2"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Flex alignItems="center">
                        <Box paddingRight="3" color="green.400">
                            {isVerified && <GoVerified />}
                        </Box>
                        <Text fontWeight="bold" fontSize="lg">
                            AED {millify(price)}
                            {rentFrequency && `/${rentFrequency}`}
                        </Text>
                    </Flex>
                    <Box>
                        <Avatar size="sm" src={agency?.logo?.url}></Avatar>
                    </Box>
                </Flex>
                <Flex
                    alignItems="center"
                    p="1"
                    justifyContent="space-around"
                    w="250px"
                    color="blue.400"
                >
                    {rooms}
                    <FaBed /> | {baths} <FaBath /> | {millify(area)} sqft{' '}
                    <BsGridFill />
                </Flex>
                <Text fontSize="lg" mb="2" fontWeight="bold">
                    {title}
                </Text>
                <Text lineHeight="2" color="gray.600">
                    {description.length < descriptionCollapseLength || show
                        ? description
                        : collapsedDesc}
                    <Button size="sm" onClick={handleToggle}>
                        see {show ? 'less' : 'more'}
                    </Button>
                </Text>
                <Center></Center>

                <Flex
                    mt="10"
                    flexWrap="wrap"
                    textTransform="uppercase"
                    justifyContent="space-between"
                >
                    <Text>
                        TYPE: <b>{type}</b>
                    </Text>
                    <Text>
                        PURPOSE: <b>{purpose}</b>
                    </Text>
                    <Text>
                        Furnishing Status: <b>{furnishingStatus}</b>
                    </Text>
                    <Box>
                        {amenities?.length && (
                            <Text fontSize="2xl" fontWeight="black" mt="5">
                                Amenities
                            </Text>
                        )}
                        <Flex flexWrap="wrap">
                            {amenities.map((item) =>
                                item.amenities.map((amenity) => (
                                    <Text
                                        fontWeight="bold"
                                        color="blue.400"
                                        fontSize="11"
                                        p="2"
                                        m="1"
                                        bg="gray.200"
                                        borderRadius="5"
                                        key="amenity.text"
                                    >
                                        {amenity.text}
                                    </Text>
                                ))
                            )}
                        </Flex>
                    </Box>
                </Flex>
            </Box>
        </Box>
    );
};

export async function getServerSideProps({ params: { id } }) {
    const data = await fetchApi(
        `${baseUrl}/properties/detail?externalID=${id}`
    );

    return {
        props: {
            propertyDetails: data,
        },
    };
}

export default PropertyDetails;
