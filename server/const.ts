// めちゃくちゃ使用頻度高いけど、const.tsとか用意したりglobalに追加したりしてファイル間でうまい感じにimport/exportする方法がわからない
// サーバー側のビルド方法がわからないので、フォルダ分けしたディレクトリの階層構造は諦めるのと、常に`index.ts`にメソッドを明示する方針でやる

const ssApp: GoogleAppsScript.Spreadsheet.SpreadsheetApp = SpreadsheetApp;
const ss = ssApp.getActive();

export { ss, ssApp };
