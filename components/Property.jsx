import Link from 'next/link';
import Image from 'next/Image';
import { Box, Flex, Text, Avater } from '@chakra-ui/react';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import millify from 'millify';
import DefaultImage from '../assets/images/defaultImage.jpg';
const Property = ({
  property: {
    coverPhoto,
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    externalId,
  },
}) => (
  <Link href={`/property/${externalId}`} passHref>
    <Flex
      flexWrap='wrap'
      w='420px'
      p='5'
      paddingTop='0'
      justifyContent='flex-start'
      cursor='pointer'
    >
      <Box>
        <img
          width={400}
          height={260}
          src={coverPhoto ? coverPhoto.url : DefaultImage}
        />
      </Box>
      <Box w='full'>
        <Flex paddingTop='2' alignItems='center' justifyContent='space-between'>
          <Flex alignItems='center'>
            {' '}
            {isVerified && <GoVerified />}
            <Box paddingRight='3' color='green.400'></Box>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  </Link>
);

export default Property;
