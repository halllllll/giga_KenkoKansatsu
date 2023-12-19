import { devFetch } from "./devFetch";
import { serverFunctions, isGASEnvironment } from "./serverFunctions";

const SheetNameAPI = async (): Promise<string> => {
  if (isGASEnvironment()) {
    const ret = await serverFunctions.getSpreadSheetName();

    return ret;
  } else {
    return await new Promise((resolve) => {
      setTimeout(async () => {
        const res = await devFetch<Record<"title", string>>("/api/title");
        resolve(res.title);
      }, 1500);
    });
  }
};

const SheetUrlAPI = async (): Promise<string> => {
  if (isGASEnvironment()) {
    const ret = await serverFunctions.getSpreadSheetUrl();

    return ret;
  } else {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve("https://github.com/halllllll/giga_KenkoKansatsu");
      }, 1500);
    });
  }
};

export { SheetNameAPI, SheetUrlAPI };
