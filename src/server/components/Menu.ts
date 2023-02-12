import { ss, ssApp } from '../Config/Const';

const onOpen = (): void => {
  const menu = ssApp
    .getUi()
    .createMenu(
      `${SpreadsheetApp.getActive().getName() ?? 'カスタム'} メニュー`
    );
  menu.addItem('初期化', 'initEnv_');
  menu.addToUi();
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const initEnv_ = (): void => {
  const ssUi = ssApp.getUi();
  const response = ssUi.prompt(
    'CAUTION',
    'すべてのデータを初期化します。\n（この操作は取り消せません。アーカイブを残しておきたいときは、初期化する前にSpreadSheetごとコピーを作成しておいてください）',
    ssUi.ButtonSet.YES_NO
  );
  switch (response.getSelectedButton()) {
    case ssUi.Button.NO:
      break;
    case ssUi.Button.YES:
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

global.initEnv_ = initEnv_;
global.init_ = init_;

export { onOpen };
