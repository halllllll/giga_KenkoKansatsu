import { createContext, type FC } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import { ScreenSpinner } from "@/app/client/components/Index";
import { type MenuCtxType } from "./context/context";
import { useMenuData } from "./context/ctxHooks";
import router from "./routes";

// useContextとProviderは同じファイルで書く必要があるっぽい
// Partialを使ったら読み込み時にエラーになったので外してみる
const CustomMenuCtx = createContext<MenuCtxType>({
  domain: {
    hasDomain: false,
  },
  message: "",
});

const Providers: FC = () => {
  const menuData = useMenuData();

  return (
    <>
      <Toaster />
      <ChakraProvider>
        {menuData.isLoading ? (
          <ScreenSpinner />
        ) : (
          <CustomMenuCtx.Provider value={{ domain: menuData.domain }}>
            <RouterProvider router={router} />
          </CustomMenuCtx.Provider>
        )}
      </ChakraProvider>
    </>
  );
};

export { Providers, CustomMenuCtx };
