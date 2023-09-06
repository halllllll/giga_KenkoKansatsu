// sheetの名前とURL
// sheetのデータはConfig/SheetDataで定義している
import { ss } from "@/Config/Const";
const getSpreadSheetName = (): string => {
  return ss.getName();
};

const getSpreadSheetUrl = (): string => {
  return ss.getUrl();
};

export { getSpreadSheetName, getSpreadSheetUrl };
