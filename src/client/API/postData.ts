import { type FormValues } from "@/client/components/Index";
import { type postDataResult } from "@/server/API/Post";
import { serverFunctions, isGASEnvironment } from "./serverFunctions";

const postFormValueDataAPI = async (
  data: FormValues[]
): Promise<postDataResult> => {
  if (isGASEnvironment()) {
    const ret = await serverFunctions.postFormValues2(JSON.stringify(data));

    return JSON.parse(ret) as postDataResult;
  } else {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, error: null, msg: "" });
      }, 1500);
    });
  }
};

export { postFormValueDataAPI };
