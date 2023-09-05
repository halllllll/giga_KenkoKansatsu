import { onOpen } from "../CustomMenu/MenuRoot";
import { genFormViewData } from "./API/FormView";
import { postFormValues } from "./API/Post";
import { getSpreadSheetName, getSpreadSheetUrl } from "./API/SheetInfo";

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

global.genFormViewData = genFormViewData; // test

// Export to frontend (gas-client)
export {
  getSpreadSheetName,
  getSpreadSheetUrl,
  postFormValues,
  genFormViewData, // test
};
