import Link from 'next/link';
import {
    IconButton,
    Button,
    Stack,
} from '@chakra-ui/react';
import { BsSearch } from 'react-icons/bs';

const DesktopNavbar = () => (
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
);

export default DesktopNavbar;
