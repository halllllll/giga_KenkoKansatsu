import { type FormViewResponse } from "@/Config/Response";
import { type InquiryItem, type Student } from "@/Config/SheetData";
import { devFetch } from "./devFetch";
import { serverFunctions, isGASEnvironment } from "./serverFunctions";

const FormViewDataAPI = async (): Promise<FormViewResponse> => {
  if (isGASEnvironment()) {
    const ret = await serverFunctions.genFormViewData();

    return ret;
  } else {
    // in dev (treat as educator)
    const [inquiryStub, memberStub] = await Promise.all([
      devFetch<InquiryItem>("/api/inquiries"),
      devFetch<Student>("/api/students"),
    ]);

    return await new Promise((resolve) => {
      setTimeout(() => {
        const ret = {
          userType: "educator",
          userId: "educator@example.mail",
          InquiryItem: inquiryStub,
          Students: memberStub,
        };
        resolve(ret as FormViewResponse);
      }, 1500);
    });
  }
};

export { FormViewDataAPI };
