import { type FC, useState, useEffect, type ReactNode } from "react";
import { Box, Center } from "@chakra-ui/react";
import { ClimbingBoxLoader } from "react-spinners";
import { CustomMenuCtx } from "@/customMenu/client/App";
import { getDomainAPI } from "../API/MenuData";
import { type MenuCtxType } from "./context";

type Props = {
  children?: ReactNode;
};
const CtxProvider: FC<Props> = ({ children }) => {
  const [data, setData] = useState<MenuCtxType | null>(null);
  const [isLoading, setIsloading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = false;
    const f = async () => {
      setIsloading(true);
      const ret = await getDomainAPI();
      if (!isMounted) {
        setData({ domain: ret });
        console.log(`YOYOYOY!! chant getto dekita?`);
        console.table(ret);
        console.log("↑↑↑↑↑");
        isMounted = true;
        setIsloading(false);
      }
    };
    setIsloading(true);
    void f();
  }, []);

  return (
    <CustomMenuCtx.Provider value={data}>
      {isLoading ? (
        // 全画面縦横中央ローディング(Fullで救えない)
        <Box
          left="0"
          top="0"
          w="100vw"
          h="100vh"
          bg="rgba(0, 0, 0, 0.05)"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Center h="full">
            <ClimbingBoxLoader color="#36d7b7" size="40" />
          </Center>
        </Box>
      ) : (
        children
      )}
    </CustomMenuCtx.Provider>
  );
};

export { CtxProvider };
