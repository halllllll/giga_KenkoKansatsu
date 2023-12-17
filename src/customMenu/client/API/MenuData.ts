import { type SetDomainResult, type AboutDomain } from "@/Config/MenuResponse";
import { serverFunctions, isGASEnvironment } from "./serverFunctions";

const getWebAppUrlAPI = async (): Promise<string> => {
  if (isGASEnvironment()) {
    const ret = await serverFunctions.getWebAppUrl();

    return ret;
  } else {
    console.log("local test");

    return await new Promise((resolve) => {
      setTimeout(() => {
        console.log("mock - having domain");
        resolve("https://example.com");
      }, 1000);
    });
  }
};

const getDomainAPI = async (): Promise<AboutDomain> => {
  if (isGASEnvironment()) {
    const ret = await serverFunctions.getTeacherDomainData();

    return ret;
  } else {
    console.log("local test");

    return await new Promise((resolve) => {
      setTimeout(() => {
        if (Math.random() < 0.5) {
          console.log("mock - having domain");
          resolve({ hasDomain: true, definedDomain: "dummy" });
        } else {
          console.log("mock - NO domain");
          resolve({ hasDomain: false });
        }
      }, 1000);
    });
  }
};

const setDomainAPI = async (domain: string): Promise<SetDomainResult> => {
  if (isGASEnvironment()) {
    const ret = await serverFunctions.setTeacherDomainData(domain);

    return ret;
  } else {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          isSuccessed: true,
          message: "(this is dummy) OK!",
          domain,
        });
      }, 1000);
    });
  }
};

export { getDomainAPI, setDomainAPI, getWebAppUrlAPI };
