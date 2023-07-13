import { type InquiryItem, type Student } from "@/server/Config/SheetData";

type EducatorView = {
  userType: "educator";
  userId: string;
  InquiryItem: InquiryItem;
  Students: Student[];
  Messages?: null; // TODO: message
  PostHistory?: null; // TODO: posted history log
};

// TODO: admin behavior
type AdminView = {
  userType: "admin";
};

type GeneralView = {
  userType: "general";
  InquiryItem: InquiryItem;
  Messages?: null; // TODO:
};

type FormViewResponse = EducatorView | GeneralView | AdminView;

export { type FormViewResponse };
