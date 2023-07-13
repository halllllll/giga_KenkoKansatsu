const ssApp: GoogleAppsScript.Spreadsheet.SpreadsheetApp = SpreadsheetApp;
const ss = ssApp.getActive();

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

// admin account
const ADMIN_ACCOUNT: string[] = ["あとでやる"];

export { ss, ssApp, AnswerSheetHeaders, MemberSheetHeaders, ADMIN_ACCOUNT };
