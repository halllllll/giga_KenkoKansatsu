import React from "react";
import { type Student, type InquiryItem } from "@/server/Config/SheetData";

type CtxType = {
  students: Student[];
  inquiries: InquiryItem;
  accessedUser: string | null; // TODO:
};

export const Ctx = React.createContext<CtxType | null>(null);
