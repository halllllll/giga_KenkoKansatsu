import { type FormValues } from "@/client/components/Index";
import { type postDataResult } from "@/server/API/Post";
import { serverFunctions, isGASEnvironment } from "./serverFunctions";

const postFormValueDataAPI = async (
  data: FormValues[]
): Promise<postDataResult> => {
  if (isGASEnvironment()) {
    // 受け取るときはオブジェクトでいいが、投げるときはstring型にすることにする
    const ret = await serverFunctions.postFormValues(JSON.stringify(data));

    return ret;
  } else {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve({ status: "success" });
      }, 3000);
    });
  }
};

export { postFormValueDataAPI };
