import { type FormValues } from "@/client/components/Form/Form";
import { getInquiryData, getMemberData } from "./API/FormInquiry";
import { onOpen } from "./API/Menu";
import { SaveAnswers } from "./API/Post";
import { getSpreadSheetName, getSpreadSheetUrl } from "./API/SheetInfo";

export const doGet = (): GoogleAppsScript.HTML.HtmlOutput => {
  return HtmlService.createHtmlOutputFromFile("index.html")
    .addMetaTag("viewport", "width=device-width, initial-scale=1.0")
    .setTitle(getSpreadSheetName() ?? "GIGA-KenkoKansatsu");
};

const postFormValues = (data: string): boolean => {
  // parse
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const formData: FormValues[] = JSON.parse(data);

  return SaveAnswers(formData);
};

// Exposed to GAS global function
global.getSpreadSheetName = getSpreadSheetName;
global.getSpreadSheetUrl = getSpreadSheetUrl;
global.onOpen = onOpen;
global.doGet = doGet;
// global.PrepareForm = PrepareForm;
global.getInquiryData = getInquiryData;
global.getMemberData = getMemberData;
global.postFormValues = postFormValues;

// Exposed to frontend (gas-client)
export {
  getSpreadSheetName,
  getSpreadSheetUrl,
  // PrepareForm,
  getMemberData,
  postFormValues,
  getInquiryData,
};
