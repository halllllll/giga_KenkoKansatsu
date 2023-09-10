import { genFormViewData } from "@/app/server/API/FormView";
import { postFormValues } from "@/app/server/API/Post";
import {
  getTeacherDomain,
  setTeacherDomain,
} from "@/customMenu/server/API/TeachersDomain";
import { onOpen } from "@/customMenu/server/MenuRoot";
import { type SetDomainResult, type AboutDomain } from "./Config/MenuResponse";
import {
  getSpreadSheetName,
  getSpreadSheetUrl,
} from "./app/server/API/SheetInfo";

export const doGet = (): GoogleAppsScript.HTML.HtmlOutput => {
  return HtmlService.createHtmlOutputFromFile("index.html")
    .addMetaTag("viewport", "width=device-width, initial-scale=1.0")
    .setTitle(getSpreadSheetName() ?? "GIGA-KenkoKansatsu");
};

/* Custom Menu APIs */
// get domain for teacher account
const getTeacherDomainData = (): AboutDomain => {
  const domain = getTeacherDomain();

  return domain === null
    ? {
        hasDomain: false,
      }
    : {
        hasDomain: true,
        definedDomain: domain,
      };
};

// set domain
const setTeacherDomainData = (domain: string): SetDomainResult => {
  if (setTeacherDomain(domain)) {
    return {
      isSuccessed: true,
      message: "settled domain.",
      domain,
    };
  } else {
    return {
      isSuccessed: false,
      message: `ドメイン '${domain}' の設定に失敗しました`,
    };
  }
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

global.getTeacherDomainData = getTeacherDomainData;
global.setTeacherDomainData = setTeacherDomainData;

// Export to frontend (gas-client)
export {
  getSpreadSheetName,
  getSpreadSheetUrl,
  postFormValues,
  genFormViewData,
  getTeacherDomainData,
  setTeacherDomainData,
};
