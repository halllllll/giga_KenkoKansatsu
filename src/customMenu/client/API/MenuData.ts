import { type SetDomainResult, type AboutDomain } from "@/Config/MenuResponse";
import { serverFunctions, isGASEnvironment } from "./serverFunctions";

const getDomainAPI = async (): Promise<AboutDomain> => {
  if (isGASEnvironment()) {
    const ret = await serverFunctions.getTeacherDomainData();

    return ret;
  } else {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve({ hasDomain: true, definedDomain: "dummy" });
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

export { getDomainAPI, setDomainAPI };
