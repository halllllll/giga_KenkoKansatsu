import React from "react";
import { type Student, type InquiryItem } from "@/server/Config/SheetData";

type CtxType = {
  students?: Student[];
  inquiries?: InquiryItem;
  accessedUserId?: string;
};

export const Ctx = React.createContext<CtxType>({});
