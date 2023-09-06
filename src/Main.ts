import { genFormViewData } from "@/app/server/API/FormView";
import { postFormValues } from "@/app/server/API/Post";
import { onOpen } from "@/customMenu/MenuRoot";
import {
  getSpreadSheetName,
  getSpreadSheetUrl,
} from "./app/server/API/SheetInfo";

export const doGet = (): GoogleAppsScript.HTML.HtmlOutput => {
  return HtmlService.createHtmlOutputFromFile("index.html")
    .addMetaTag("viewport", "width=device-width, initial-scale=1.0")
    .setTitle(getSpreadSheetName() ?? "GIGA-KenkoKansatsu");
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
global.postFormValues = postFormValues;

global.genFormViewData = genFormViewData;

// Export to frontend (gas-client)
export {
  getSpreadSheetName,
  getSpreadSheetUrl,
  postFormValues,
  genFormViewData,
};
