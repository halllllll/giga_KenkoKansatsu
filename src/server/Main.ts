import { type FormValues } from "@/client/components/Form/Form";
import { getInquiryData, getMemberData } from "./API/FormInquiry";
import { onOpen } from "./API/Menu";
import { SaveAnswers, postFormValues2 } from "./API/Post";
import { getSpreadSheetName, getSpreadSheetUrl } from "./API/SheetInfo";

export const doGet = (): GoogleAppsScript.HTML.HtmlOutput => {
  return HtmlService.createHtmlOutputFromFile("index.html")
    .addMetaTag("viewport", "width=device-width, initial-scale=1.0")
    .setTitle(getSpreadSheetName() ?? "GIGA-KenkoKansatsu");
};

// TODO: delete
const postFormValues = (data: string): boolean => {
  // parse
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const formData: FormValues[] = JSON.parse(data);

  return SaveAnswers(formData);
};

/*
  Exposed to GAS global function
*/
// standard
global.onOpen = onOpen;
global.doGet = doGet;

// These functions are invoked when the front-end is first accessed
global.getSpreadSheetName = getSpreadSheetName;
global.getSpreadSheetUrl = getSpreadSheetUrl;
global.getInquiryData = getInquiryData;
global.getMemberData = getMemberData;
global.postFormValues2 = postFormValues2;

global.postFormValues = postFormValues; // TODO: abandaned

// Export to frontend (gas-client)
export {
  getSpreadSheetName,
  getSpreadSheetUrl,
  getMemberData,
  postFormValues,
  postFormValues2,
  getInquiryData,
};
