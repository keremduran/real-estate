import Link from 'next/link';
import {
    Flex,
    Box,
    Spacer
} from '@chakra-ui/react';
import MobileNavbar from './MobileNavbar';
import DesktopNavbar from './DesktopNavbar';

const Navbar = () => (
    <Flex p="2" borderBottom="1px" borderColor="gray.100">
        <Box fontSize="3xl" color="blue.400" fontWeight="bold">
            <Link href="/" paddingLeft="2">
                Realtor
            </Link>
        </Box>
        <Spacer />
        <MobileNavbar/>
        <DesktopNavbar />
    </Flex>
);

export default Navbar;
