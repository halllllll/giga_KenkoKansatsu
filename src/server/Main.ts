import { type FormValues } from "@/client/components/Form/Form";
import { PrepareForm } from "./Behavior/Form";
import { onOpen } from "./Behavior/Menu";
import { SaveAnswers } from "./Behavior/Post";
import { ss } from "./Config/Const";

export const doGet = (): GoogleAppsScript.HTML.HtmlOutput => {
  return HtmlService.createHtmlOutputFromFile("index.html")
    .addMetaTag("viewport", "width=device-width, initial-scale=1.0")
    .setTitle(getSpreadSheetName() ?? "Vite + React on GAS");
};

const getSpreadSheetName = (): string => {
  return ss.getName();
};

const getSpreadSheetUrl = (): string => {
  return ss.getUrl();
};

const postFormValues = (data: string): boolean => {
  // parse
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const formData: FormValues[] = JSON.parse(data);

  return SaveAnswers(formData);
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

// Exposed to GAS global function
global.getSpreadSheetName = getSpreadSheetName;
global.getSpreadSheetUrl = getSpreadSheetUrl;
global.onOpen = onOpen;
global.doGet = doGet;
global.PrepareForm = PrepareForm;
global.postFormValues = postFormValues;

// Exposed to frontend (gas-client)
export { getSpreadSheetName, getSpreadSheetUrl, PrepareForm, postFormValues };
