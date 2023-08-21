/* eslint-disable @typescript-eslint/unbound-method */
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { api } from "~/utils/api";
import { menuAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys);
const colors = {
  brand: {},
  background: "#0D001C",
  background2: "#010102",
  background3: "#040618",
};
const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const baseStyle = definePartsStyle({
  list: {
    bg: "background2",
  },
  item: {
    color: "gray.200",
    bg: "background2",
    _hover: {
      bg: "#d3d3d33d",
    },
  },
});
const menuTheme = defineMultiStyleConfig({ baseStyle });

const components = {
  list: { bg: "#fff" },
  Menu: menuTheme,
};
export const theme = extendTheme({ colors, config, components });

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <ChakraProvider theme={theme}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ChakraProvider>
  );
};

export default api.withTRPC(MyApp);
