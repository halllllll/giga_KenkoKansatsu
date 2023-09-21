import { type FC } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import { CtxProvider } from "./context/ctxProvider";
import router from "./routes";

const Providers: FC = () => {
  return (
    <CtxProvider>
      <Toaster />
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </CtxProvider>
  );
};

export { Providers };
