import React, { useState } from "react";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  Stack,
  Link,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";

interface SubLink {
  name: string;
  path: string;
}

interface LinkType {
  name: string;
  path: string;
  subMenu?: SubLink[];
}

const Links: LinkType[] = [
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

interface NavLinkProps {
  name: string;
  path: string;
}

const NavLink: React.FC<NavLinkProps> = ({ name, path }) => (
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

interface MenuProps {
  link: LinkType;
}

const Menu: React.FC<MenuProps> = ({ link }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box flexShrink={0} key={link.name} position="relative">
      {link.subMenu ? (
        <Box
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Link
            width={"max-content"}
            px={2}
            py={2}
            rounded="md"
            _hover={{
              textDecoration: "none",
              bg: "gray.200",
            }}
            as={RouterLink}
            to={link.path}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box>{link.name}</Box>
            <ChevronRightIcon
              className="chevron"
              transform={isHovered ? "rotate(90deg)" : "rotate(0deg)"}
              transition="transform 0.2s ease-in-out"
              position={"relative"}
              width={"20px"}
              height={"20px"}
              top={"2px"}
            />
          </Link>
          <Box
            display={isHovered ? "block" : "none"}
            position="absolute"
            top="100%"
            left="0"
            zIndex={1}
          >
            <Box
              mt={4}
              py={2}
              px={2}
              bg="white"
              border={1}
              borderColor={"#f3f3f3"}
              borderStyle={"solid"}
              boxShadow="md"
              borderRadius="md"
            >
              {link.subMenu.map((sub) => (
                <NavLink key={sub.name} name={sub.name} path={sub.path} />
              ))}
            </Box>
          </Box>
        </Box>
      ) : (
        <NavLink key={link.name} name={link.name} path={link.path} />
      )}
    </Box>
  );
};

const Navbar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
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
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            {Links.map((link) => (
              <Menu link={link} key={link.name} />
            ))}
          </HStack>
        </HStack>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            {Links.map((link) => (
              <Menu link={link} key={link.name} />
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Navbar;
