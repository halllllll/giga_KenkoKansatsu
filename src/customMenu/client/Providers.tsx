import { createContext, type FC } from "react";
import { ChakraProvider, Spinner, Text } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import { type MenuCtxType } from "./context/context";
import { useMenuData } from "./context/ctxHooks";
import router from "./routes";

// useContextとProviderは同じ箇所にある必要がある？？？
const CustomMenuCtx = createContext<Partial<MenuCtxType>>({});

const Providers: FC = () => {
  const menuData = useMenuData();

  return (
    <ChakraProvider>
      {menuData.isLoading ? (
        <>
          Fetching Data... <Spinner />
        </>
      ) : (
        <>
          {!menuData.domain.hasDomain ? (
            <Text>{"Couldn't fetch menu view data."}</Text>
          ) : (
            <CustomMenuCtx.Provider value={{ domain: menuData.domain }}>
              <RouterProvider router={router} />
            </CustomMenuCtx.Provider>
          )}
        </>
      )}
    </ChakraProvider>
  );
};

export { Providers, CustomMenuCtx };
