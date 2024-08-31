import React from "react";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  Stack,
  Link,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";

const Links = [
  { name: "Home", path: "/" },
  {
    name: "Services",
    path: "/services",
    subMenu: [
      { name: "Design", path: "/services/design" },
      { name: "Development", path: "/services/development" },
    ],
  },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const NavLink = ({ name, path }: { name: string; path: string }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: "gray.200",
    }}
    as={RouterLink}
    to={path}
  >
    {name}
  </Link>
);

const Navbar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        bg="white"
        px={4}
        boxShadow="sm"
        position="sticky"
        top="0"
        zIndex="1000"
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box fontWeight="bold" color="primary-color">
              StudentApp
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <Box key={link.name}>
                  {link.subMenu ? (
                    <Box>
                      <Link
                        px={2}
                        py={1}
                        rounded={"md"}
                        _hover={{
                          textDecoration: "none",
                          bg: "gray.200",
                        }}
                        as={RouterLink}
                        to={link.path}
                      >
                        {link.name}
                      </Link>
                      <Box pl={4}>
                        {link.subMenu.map((sub) => (
                          <NavLink
                            key={sub.name}
                            name={sub.name}
                            path={sub.path}
                          />
                        ))}
                      </Box>
                    </Box>
                  ) : (
                    <NavLink
                      key={link.name}
                      name={link.name}
                      path={link.path}
                    />
                  )}
                </Box>
              ))}
            </HStack>
          </HStack>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <Box key={link.name}>
                  {link.subMenu ? (
                    <Box>
                      <Link
                        px={2}
                        py={1}
                        rounded={"md"}
                        _hover={{
                          textDecoration: "none",
                          bg: "gray.200",
                        }}
                        as={RouterLink}
                        to={link.path}
                      >
                        {link.name}
                      </Link>
                      <Box pl={4}>
                        {link.subMenu.map((sub) => (
                          <NavLink
                            key={sub.name}
                            name={sub.name}
                            path={sub.path}
                          />
                        ))}
                      </Box>
                    </Box>
                  ) : (
                    <NavLink
                      key={link.name}
                      name={link.name}
                      path={link.path}
                    />
                  )}
                </Box>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default Navbar;
