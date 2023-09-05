import { ss, ssApp } from "../Config/Const";
import { EssentialSheets } from "../Config/SheetData";

const onOpen = (): void => {
  const menu = ssApp
    .getUi()
    .createMenu(
      `${SpreadsheetApp.getActive().getName() ?? "カスタム"} メニュー`
    );

  // globalにはアンダースコア付きで定義する
  menu.addItem("初期化", "initEnv_");
  menu.addItem("統合メニュー", "menuRoot_");
  menu.addToUi();
};

const initEnv = (): void => {
  const ssUi = ssApp.getUi();
  const response = ssUi.alert(
    "CAUTION",
    "すべてのデータを初期化します。\n（この操作は取り消せません。アーカイブを残しておきたいときは、初期化する前にSpreadSheetごとコピーを作成しておいてください）\n（もし間違えて初期化した場合は、SpreadSheetの「編集履歴」に残っていれば復元は可能です）",
    ssUi.ButtonSet.YES_NO
  );
  switch (response) {
    case ssUi.Button.NO:
      break;
    case ssUi.Button.YES:
      init();
      break;
    default:
      console.info("undefined init button behavior");
      break;
  }
  Logger.log("push init menu button.");
};

// とりあえず中身を全部消すだけ シート自体は先送り
const init = (): void => {
  const sheets = ss.getSheets();
  sheets.map((sheet) => {
    if (EssentialSheets.includes(sheet.getName())) return sheet.clear();

    return sheet;
  });
};

const menuRoot = (): void => {
  const ssUi = ssApp.getUi();
  const html = HtmlService.createHtmlOutputFromFile("menu.html")
    .setWidth(600)
    .setHeight(600);
  ssUi.showModalDialog(html, "統合メニュー");
};

// globalにはアンダースコア付きで定義する
global.initEnv_ = initEnv;
global.init_ = init;

global.menuRoot_ = menuRoot;

export { onOpen };
