import { ss } from './Const';
import { PrepareForm } from './Form';

export const doGet = (): GoogleAppsScript.HTML.HtmlOutput => {
  return HtmlService.createHtmlOutputFromFile('index.html')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setTitle(getSpreadSheetName() ?? 'Vite + React on GAS');
};

//

const affectCountToA1 = (count: number): void => {
  const sheet = ss.getSheetByName('シート1');
  const range = sheet?.getRange('A1');
  range?.setValue(count);
};

const getSpreadSheetName = (): string | null => {
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

const getDataFromGAS = (): GoogleAppsScript.Content.TextOutput | string => {
  const sheet = ss.getSheetByName('TestData');
  if (sheet === null) {
    const ret = JSON.stringify({ result: 'nothing' });

    return ContentService.createTextOutput(ret).setMimeType(
      ContentService.MimeType.JSON
    );
  }

  const values = sheet.getDataRange().getValues();
  const ret = values.map((row) => {
    return row as User[];
  });
  // eslint-disable-next-line @typescript-eslint/no-base-to-string, @typescript-eslint/restrict-template-expressions

  const retObj = JSON.stringify({
    result: ret,
  });

  console.log(`return: ${retObj}`);

  // return ContentService.createTextOutput(retObj).setMimeType(
  //   ContentService.MimeType.JSON
  // ) as unknown as string;
  return retObj;
};
// expose for frontend (gas-client)
export { affectCountToA1, getSpreadSheetName, getDataFromGAS, PrepareForm };
