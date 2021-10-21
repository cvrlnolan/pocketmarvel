import React from "react"
import {
    Box,
    Flex,
    HStack,
    Text,
    IconButton,
    useDisclosure,
    useColorModeValue,
    chakra,
    Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons"
import Link from "next/link"
import ThemeButton from "@/components/themeButton"

const Links = [
    { key: "Characters", text: "Characters", href: "/characters" },
    { key: "Comics", text: "Comics", href: "/comics" },
    { key: "Series", text: "Series", href: "/series" },
    { key: "Github", text: "Github", href: "https://github.com/cvrlnolan/pocketmarvel" }
];

const NavLink = ({ children, linkHoverColor, linkRef }) => (
    <Link href={linkRef} passHref>
        <chakra.a
            px={2}
            py={1}
            rounded="md"
            _hover={{
                textDecoration: "none",
                color: linkHoverColor,
                cursor: "pointer"
            }}
        >
            {children}
        </chakra.a>
    </Link>
);

export default function Navbar({ children }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const linkColor = useColorModeValue("blue.600", "blue.100");
    const linkHoverColor = useColorModeValue("pink.700", "pink.400");

    return (
        <>
            <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
                <Flex h={16} alignItems="center" justifyContent="space-between">
                    <IconButton
                        size="md"
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label="Open Menu"
                        display={{ md: "none" }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems="center">
                        <Box>PocketMarvel</Box>
                        <HStack
                            as="nav"
                            spacing={4}
                            display={{ base: "none", md: "flex" }}>
                            {Links.map((link) => (
                                <NavLink key={link.key} linkRef={link.href} linkHoverColor={linkHoverColor}>{link.text}</NavLink>
                            ))}
                        </HStack>
                    </HStack>
                    <Flex alignItems="center">
                        <ThemeButton />
                    </Flex>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: "none" }}>
                        <Stack as="nav" spacing={4}>
                            {Links.map((link) => (
                                <NavLink key={link.key} linkRef={link.href} linkHoverColor={linkHoverColor}>{link.text}</NavLink>
                            ))}
                        </Stack>
                    </Box>
                ) : null}
            </Box>

            <Box p={4} justifyContent="space-between">
                {children}
                <Flex w="full" h="20px" p={8}>
                    <Text w="full" textAlign="center" fontWeight="bold">
                        Developed by
                        <Link href="https://carlnolan.lootyclub.com" passHref>
                            <Text
                                display="inline-flex"
                                ml={1} color={linkColor}
                                cursor="pointer"
                                _hover={{
                                    color: useColorModeValue("blue.200", "blue.400"),
                                }}
                                transition="all"
                                transitionDuration="0.5s"
                            >
                                Carl Nolan
                            </Text>
                        </Link>
                    </Text>
                </Flex>
            </Box>
        </>
    );
}