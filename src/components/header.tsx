import React from "react";
import {
  Avatar,
  Box,
  Button,
  CloseButton,
  Container,
  Flex,
  HStack,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
  VStack,
  chakra,
  useDisclosure,
} from "@chakra-ui/react";
import PromptVerseImage from "../images/promptVerseTransparent.png";
import { AiFillHome, AiOutlineInbox, AiOutlineMenu } from "react-icons/ai";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Header() {
  const { data: sessionData } = useSession();
  const mobileNav = useDisclosure();

  const MobileNavContent = (
    <VStack
      pos="absolute"
      top={0}
      left={0}
      right={0}
      display={mobileNav.isOpen ? "flex" : "none"}
      flexDirection="column"
      p={2}
      pb={4}
      m={2}
      spacing={3}
      rounded="sm"
      shadow="sm"
      bg="gray.900"
      zIndex={999}
    >
      <CloseButton
        aria-label="Close menu"
        justifySelf="self-start"
        onClick={mobileNav.onClose}
      />
      <Button w="full" variant="ghost" leftIcon={<AiFillHome />}>
        Dashboard
      </Button>
      <Button
        w="full"
        variant="solid"
        colorScheme="brand"
        leftIcon={<AiOutlineInbox />}
      >
        Inbox
      </Button>
      <Button w="full" variant="ghost" leftIcon={<BsFillCameraVideoFill />}>
        Videos
      </Button>
    </VStack>
  );
  return (
    <chakra.header transition="box-shadow 0.2s" w="full" overflowY="hidden">
      <chakra.div h="4.5rem" mx="auto" maxW="1200px">
        <Flex w="full" h="full" px="6" align="center" justify="space-between">
          <Flex align="center">
            <Link href="/" _hover={{ textDecoration: "none" }}>
              <HStack>
                <Image
                  src={PromptVerseImage}
                  alt="logo"
                  width="50"
                  height="50"
                />
                <Text
                  fontSize="2xl"
                  fontFamily="revert-layer"
                  fontWeight="black"
                  textColor="whiteAlpha.700"
                  fontStyle="italic"
                >
                  PromptVerse
                </Text>
              </HStack>
            </Link>
          </Flex>

          <Flex
            justify="flex-end"
            w="full"
            maxW="824px"
            align="center"
            color="gray.400"
          >
            {!sessionData ? (
              <Button onClick={() => void signIn()}>Login</Button>
            ) : (
              <HStack>
                <Menu>
                  <MenuButton as={Button} variant="unstyled">
                    <Avatar
                      size="sm"
                      src={
                        sessionData.user.image ?? "https://bit.ly/broken-lin"
                      }
                    />
                  </MenuButton>
                  <MenuList>
                    <MenuGroup title={sessionData.user.name ?? "No name"}>
                      <MenuDivider />
                      <MenuItem icon={<CgProfile />}>My Account</MenuItem>
                      <MenuItem
                        icon={<FiLogOut />}
                        onClick={() => void signOut()}
                      >
                        Logout{" "}
                      </MenuItem>
                    </MenuGroup>
                  </MenuList>
                </Menu>
              </HStack>
            )}
            <IconButton
              display={{ base: "flex", md: "none" }}
              aria-label="Open menu"
              fontSize="20px"
              color="gray.800"
              _dark={{ color: "inherit" }}
              variant="ghost"
              icon={<AiOutlineMenu />}
              onClick={mobileNav.onOpen}
            />
          </Flex>
        </Flex>
        {MobileNavContent}
      </chakra.div>
    </chakra.header>
  );
}
