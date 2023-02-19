import { ss } from "./Config/Const";
import { PrepareForm } from "./components/Form";
import { onOpen } from "./components/Menu";

export const doGet = (): GoogleAppsScript.HTML.HtmlOutput => {
  return HtmlService.createHtmlOutputFromFile("index.html")
    .addMetaTag("viewport", "width=device-width, initial-scale=1.0")
    .setTitle(getSpreadSheetName() ?? "Vite + React on GAS");
};

const affectCountToA1 = (count: number): void => {
  const sheet = ss.getSheetByName("シート1");
  const range = sheet?.getRange("A1");
  range?.setValue(count);
};

const getSpreadSheetName = (): string => {
  return ss.getName();
};

export interface User {
  username: string;
  password: string;
  isLocal: number;
  schoolCode: string;
  schoolName: string;
  familyName: string;
  givenName: string;
  familyKanaName: string;
  givenKanaName: string;
  renewName: string;
  renewPassword: string;
  renewClass: string;
  termName: string;
  className: string;
  classRole: string;
  TekitouName: string;
}

// const getDataFromGAS = (): GoogleAppsScript.Content.TextOutput | string => {
//   const sheet = ss.getSheetByName("TestData");
//   if (sheet === null) {
//     const ret = JSON.stringify({ result: "nothing" });

//     return ContentService.createTextOutput(ret).setMimeType(
//       ContentService.MimeType.JSON
//     );
//   }

//   const values = sheet.getDataRange().getValues();
//   const ret = values.map((row) => {
//     return row as User[];
//   });

//   const retObj = JSON.stringify({
//     result: ret,
//   });

//   console.log(`return: ${retObj}`);

//   return ContentService.createTextOutput(retObj).setMimeType(
//     ContentService.MimeType.JSON
//   );
//   // return retObj;
// };

// Exposed to GAS global function
// (and for gas-client)
global.affectCountToA1 = affectCountToA1;
global.getSpreadSheetName = getSpreadSheetName;
global.onOpen = onOpen;
global.doGet = doGet;
global.PrepareForm = PrepareForm;

// expose for frontend (gas-client)(in dev env, not for production)
export { affectCountToA1, getSpreadSheetName, PrepareForm };
