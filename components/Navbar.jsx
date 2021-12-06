import Link from 'next/link';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton,
    Flex,
    Box,
    Spacer,
    Button,
    Stack,
} from '@chakra-ui/react';
import { FcMenu, FcHome, FcAbout } from 'react-icons/fc';
import { BsSearch } from 'react-icons/bs';
import { FiKey } from 'react-icons/fi';

const Navbar = () => (
    <Flex p="2" borderBottom="1px" borderColor="gray.100">
        <Box fontSize="3xl" color="blue.400" fontWeight="bold">
            <Link href="/" paddingLeft="2">
                Realtor
            </Link>
        </Box>
        <Spacer />
        {/* Mobile */}
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
        {/* Desktop */}
        <Stack
            direction="row"
            align="center"
            spacing={2}
            display={{ base: 'none', lg: 'flex' }}
        >
            <Link href="/" passHref>
                <Button>Home</Button>
            </Link>
            <Link href="/search?purpose=for-sale" passHref>
                <Button>Buy Property</Button>
            </Link>
            <Link href="/search?purpose=for-rent" passHref>
                <Button>Rent Property</Button>
            </Link>
            <Link href="/search" passHref>
                <IconButton icon={<BsSearch />}>Search</IconButton>
            </Link>
        </Stack>
    </Flex>
);

export default Navbar;
