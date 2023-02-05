// めちゃくちゃ使用頻度高いけど、const.tsとか用意したりglobalに追加したりしてファイル間でうまい感じにimport/exportする方法がわからない
// うまいビルドでシングルファイルにできないので、フォルダ分けしたディレクトリの階層構造は諦めるのと、常に`index.ts`にメソッドを明示する方針でやる

const ss = SpreadsheetApp.getActive();

export { ss };
