import { type FormValues } from "@/client/components/Index";
import { type postDataResult } from "@/server/API/Post";
import { serverFunctions, isGASEnvironment } from "./serverFunctions";

type postDataRequest = {
  req: FormValues[];
};

const postFormValueDataAPI = async (
  data: FormValues[]
): Promise<postDataResult> => {
  if (isGASEnvironment()) {
    const req: postDataRequest = {
      req: data,
    };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const ret: postDataResult = await serverFunctions.postFormValues(req);

    return ret;
  } else {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve({ status: "success" });
      }, 3000);
    });
  }
};

export { postFormValueDataAPI, type postDataRequest };
