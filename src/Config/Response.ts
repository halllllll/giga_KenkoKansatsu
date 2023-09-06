import { type InquiryItem, type Student } from "./SheetData";

type UserType = "educator" | "admin" | "general";

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
  // TODO: for options (used in front)
  // GradeAndClass: { Grade: number | string; ClassName: number | string };
};

type FormViewResponse = EducatorView | GeneralView | AdminView;

export {
  type EducatorView,
  type GeneralView,
  type AdminView,
  type FormViewResponse,
  type UserType,
};
