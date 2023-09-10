const ssApp: GoogleAppsScript.Spreadsheet.SpreadsheetApp = SpreadsheetApp;
const ss = ssApp.getActive();
const propService: GoogleAppsScript.Properties.PropertiesService =
  PropertiesService;
const properties = propService.getScriptProperties();
// Memberシート ヘッダー用
const MemberSheetHeaders = [
  "学年",
  "クラス名",
  "出席番号（任意）",
  "名前",
  "なまえ（任意）",
  "Role",
];

// Answerシート ヘッダー用
const AnswerSheetHeaders = [
  "TIMESTAMP",
  "投稿者",
  "日付",
  "学年",
  "クラス名",
  "出席番号",
  "名前",
  "なまえ",
  "出欠",
  "内容",
  "備考",
];

// Sheet カスタムメニュー用html
const MENU_HTML = "menu.html";

// admin account
const ADMIN_ACCOUNT: string[] = ["あとでやる"];

/** Script Properties **/
// 教師用画面のためのアカウントのドメイン
const SPK_TEACHER_DOMAIN = "teacher_domain";

// 教師以外用画面のためのパスワード
const SPK_GENERAL_PASSWORD = "general_password";

export {
  ADMIN_ACCOUNT,
  AnswerSheetHeaders,
  MemberSheetHeaders,
  MENU_HTML,
  properties,
  SPK_GENERAL_PASSWORD,
  SPK_TEACHER_DOMAIN,
  ss,
  ssApp,
};
