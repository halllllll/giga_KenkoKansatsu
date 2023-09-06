import type { FC } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import router from "./routes";

const Providers: FC = () => (
  <ChakraProvider>
    <RouterProvider router={router} />
  </ChakraProvider>
);

export default Providers;
