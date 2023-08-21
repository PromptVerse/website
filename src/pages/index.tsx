import {
  Box,
  Button,
  ColorModeScript,
  Container,
  Text,
  VStack,
} from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Header from "~/components/header";
import { api } from "~/utils/api";

export default function Home() {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>PromptVerse</title>
        <meta
          name="Prompt Verse"
          content="Unleash AI's Creative Potential with Inspiring Prompts"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <ColorModeScript initialColorMode="dark" />
        <Container bg="background3" minH="100vh" minW="full">
          <Header />
          <VStack alignItems="start" p="10">
            <Text fontSize="xl" fontWeight="semibold">
              Explore millions of prompts for Chatgpt, Midjuorney and Other Gen
              AIs
            </Text>
          </VStack>
        </Container>
      </main>
    </>
  );
}

// function AuthShowcase() {
//   const { data: sessionData } = useSession();

//   const { data: secretMessage } = api.example.getSecretMessage.useQuery(
//     undefined, // no input
//     { enabled: sessionData?.user !== undefined }
//   );

//   return <Box w="fit-content"></Box>;
// }
