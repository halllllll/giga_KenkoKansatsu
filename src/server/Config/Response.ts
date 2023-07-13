import { type InquiryItem, type Student } from "./SheetData";

type EducatorView = {
  userId: string;
  InquiryItem: InquiryItem;
  Students: Student[];
  Messages?: null; // TODO: message
  PostHistory?: null; // TODO: posted history log
};

type GeneralView = {
  InquiryItem: InquiryItem;
  Messages?: null; // TODO:
};

type FormViewResponse = EducatorView | GeneralView;

export { type FormViewResponse };
