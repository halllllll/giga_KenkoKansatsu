import { type postDataResult } from "@/server/API/Post";
import { type FormValues } from "../components/Form/form-select-data";
import { serverFunctions, isGASEnvironment } from "./serverFunctions";

type postDataRequest = string;

const postFormValueDataAPI = async (
  data: FormValues[]
): Promise<postDataResult> => {
  if (isGASEnvironment()) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const ret: postDataResult = await serverFunctions.postFormValues(
      JSON.stringify(data)
    );

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
