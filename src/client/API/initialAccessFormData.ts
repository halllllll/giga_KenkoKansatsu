/* eslint-disable import/extensions */
import { isGASEnvironment } from "gas-client/src/utils/is-gas-environment";
import { type Student, type InquiryItem } from "@/server/Config/SheetData";
import { serverFunctions } from "./serverFunctions";
// import { type FormRegister } from "@/server/API/FormInquiry";

const FormInquiryAPI = async (): Promise<InquiryItem> => {
  if (isGASEnvironment()) {
    const ret = await serverFunctions.getInquiryData();

    return ret;
  } else {
    // in dev
    const data = await import("./stubs/formInquiries.json");

    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(data.Inquiries as unknown as InquiryItem);
      }, 1500);
    });
  }
};

const FormMemberAPI = async (): Promise<Student[]> => {
  if (isGASEnvironment()) {
    const ret = await serverFunctions.getMemberData();

    return ret;
  } else {
    // in dev
    const data = await import("./stubs/formMember.json");

    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(data.Students as unknown as Student[]);
      }, 1500);
    });
  }
};

export { FormInquiryAPI, FormMemberAPI };
