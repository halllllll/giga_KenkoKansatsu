import { getInquiryData, getMemberData } from "@/server/API/FormInquiry";
import { getAccessUser } from "@/server/API/Session";
import {
  type GeneralView,
  type EducatorView,
  type FormViewResponse,
} from "@/server/Config/Response";

const genFormViewData = async (): Promise<FormViewResponse> => {
  const [inquiryData, userData] = await Promise.all([
    getInquiryData(),
    getAccessUser(),
  ]);

  const defaultInquiryItem = {
    InquiryItem: inquiryData.data ?? {
      Attendance: [],
      Condition: [],
    },
  };

  switch (userData.userType) {
    case "educator": {
      const ret: EducatorView = {
        userType: "educator",
        userId: userData.userId ?? "",
        Students: getMemberData().data ?? [],
        ...defaultInquiryItem,
      };

      return ret;
    }
    case "general": {
      // 今のところは設問項目とオプションに関してはeducatorと同じものを使う
      const ret: GeneralView = {
        userType: userData.userType,
        ...defaultInquiryItem,
      };

      return ret;
    }
    case "admin": {
      // TODO: admin behavior
      // 今のところgeneralとする
      const ret: GeneralView = {
        userType: "general",
        ...defaultInquiryItem,
      };

      return ret;
    }
    default: {
      // TODO: default behavior
      // 今のところgeneralとする
      const ret: GeneralView = {
        userType: "general",
        ...defaultInquiryItem,
      };

      return ret;
    }
  }
};

export { genFormViewData };
