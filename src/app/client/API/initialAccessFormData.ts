/* eslint-disable import/extensions */
import { type FormViewResponse } from "@/Config/Response";
import { serverFunctions, isGASEnvironment } from "./serverFunctions";

const FormViewDataAPI = async (): Promise<FormViewResponse> => {
  if (isGASEnvironment()) {
    const ret = await serverFunctions.genFormViewData();

    return ret;
  } else {
    // in dev (treat as educator)
    const [inquiryStub, memberStub] = await Promise.all([
      import("./stubs/formInquiries.json"),
      import("./stubs/formMember.json"),
    ]);

    return await new Promise((resolve) => {
      setTimeout(() => {
        const ret = {
          userType: "educator",
          userId: "educator@example.mail",
          InquiryItem: inquiryStub.Inquiries,
          Students: memberStub.Students,
        };
        resolve(ret as FormViewResponse);
      }, 1500);
    });
  }
};

export { FormViewDataAPI };
