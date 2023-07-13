import { getInquiryData, getMemberData } from "@/server/API/FormInquiry";
import { getAccessUser } from "@/server/API/Session";
import { type FormViewResponse } from "@/server/Config/Response";

const genFormViewData = async (): Promise<Partial<FormViewResponse>> => {
  const [inquiryData, userData] = await Promise.all([
    getInquiryData(),
    getAccessUser(),
  ]);
  const ret: Partial<FormViewResponse> = { userType: userData.userType };
  switch (ret.userType) {
    case "educator":
      ret.userId = userData.userId;
      ret.InquiryItem = inquiryData.data;
      ret.Students = getMemberData().data; // sync time~

      break;
    case "general":
      // 今のところは設問項目とオプションに関してはeducatorと同じものを使う
      ret.InquiryItem = inquiryData.data;

      break;
    case "admin": // TODO: admin behavior
      break;
    default:
      break;
  }

  return ret;
};

export { genFormViewData };
