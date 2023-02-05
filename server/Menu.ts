import { getSpreadSheetName } from './App';
import { ss } from './Const';

/**
 * Sheetでの操作部分
 * シートの初期化などをする
 */

export const onOpen = (): void => {
  const menu = SpreadsheetApp.getUi().createMenu(
    `${getSpreadSheetName() ?? 'カスタム'} メニュー`
  );
  menu.addItem('初期化', 'initEnv_');
  menu.addToUi();
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const initEnv_ = (): void => {
  const ui = SpreadsheetApp.getUi();
  const response = ui.prompt(
    'CAUTION',
    'すべてのデータを初期化します。\n（この操作は取り消せません。アーカイブを残しておきたいときは、初期化する前にSpreadSheetごとコピーを作成しておいてください）',
    ui.ButtonSet.YES_NO
  );
  switch (response.getSelectedButton()) {
    case ui.Button.NO:
      break;
    case ui.Button.YES:
      init_();
      break;
    default:
      Logger.log('push init menu button.');
  }
};

// とりあえず中身を全部消すだけ シート自体は先送り
const init_ = (): void => {
  const sheets = ss.getSheets();
  sheets.map((sheet) => {
    return sheet.clear();
  });
};
