import React from "react";
import { type Student, type InquiryItem } from "@/Config/SheetData";

type CtxType = {
  students?: Student[];
  inquiries?: InquiryItem;
  accessedUserId?: string;
};

export const Ctx = React.createContext<CtxType>({});
