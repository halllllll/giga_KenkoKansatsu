import { useState, useEffect } from "react";
import { type AboutDomain } from "@/Config/MenuResponse";
import { getDomainAPI } from "../API/MenuData";

type MenuDataResult = {
  domain: AboutDomain;
  passcord?: null; // TODO: passcord
};

// TODO: ドメインとかパスコードを取得するつもりだったが、更新したときの画面の更新がやりづらいので、それらは必要に応じて取得することにする
const useMenuData = (): MenuDataResult & { isLoading: boolean } => {
  let isMounted = false;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // TODO: domainの情報はモーダルが開いた時に取得するようにするつもり（ここでは不要なのであとで消す）
  const [domainData, setDomainData] = useState<AboutDomain>({
    hasDomain: false,
  });

  useEffect(() => {
    const f = async () => {
      const ret = await getDomainAPI();
      if (!isMounted) {
        setDomainData(ret);
        setIsLoading(false);
      }
    };
    void f();

    return () => {
      isMounted = true;
    };
  }, []);

  return { isLoading, domain: domainData };
};

// TODO: domain用
// const useDomainData = (): AboutDomain => {};

export { useMenuData, type MenuDataResult };
