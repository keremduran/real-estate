import Link from 'next/link';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton,
    Box
} from '@chakra-ui/react';
import { FcMenu, FcHome, FcAbout } from 'react-icons/fc';
import { BsSearch } from 'react-icons/bs';
import { FiKey } from 'react-icons/fi';

const MobileNavbar = () => (
    <Box
        display={{ base: 'flex', lg: 'none' }}
        mt={{ base: 4, md: 0 }}
        ml={{ md: 6 }}
    >
        <Menu id="mobile-navbar" isLazy>
            <MenuButton as={IconButton} icon={<FcMenu />} />
            <MenuList>
                <Link href="/" passHref>
                    <MenuItem icon={<FcHome />}>Home</MenuItem>
                </Link>
                <Link href="/search" passHref>
                    <MenuItem icon={<BsSearch />}>Search</MenuItem>
                </Link>
                <Link href="/search?purpose=for-sale" passHref>
                    <MenuItem icon={<FcAbout />}>Buy Property</MenuItem>
                </Link>
                <Link href="/search?purpose=for-rent" passHref>
                    <MenuItem icon={<FiKey />}>Rent Property</MenuItem>
                </Link>
            </MenuList>
        </Menu>
    </Box>
);

export default MobileNavbar;
