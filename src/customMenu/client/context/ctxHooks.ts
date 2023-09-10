import { useState, useEffect } from "react";
import { type AboutDomain } from "@/Config/MenuResponse";
import { getDomainAPI } from "../API/MenuData";

type MenuDataResult = {
  domain: AboutDomain;
  passcord?: null; // TODO: passcord
};

const useMenuData = (): MenuDataResult & { isLoading: boolean } => {
  let isMounted = false;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [domain, setDomain] = useState<AboutDomain>({ hasDomain: false });

  // TODO: and passcord
  useEffect(() => {
    const f = async () => {
      const ret = await getDomainAPI();
      if (!isMounted) {
        setDomain(ret);
        setIsLoading(false);
      }
    };
    void f();

    return () => {
      isMounted = true;
    };
  }, []);

  return { isLoading, domain };
};

export { useMenuData, type MenuDataResult };
