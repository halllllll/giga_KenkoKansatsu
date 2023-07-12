// アクセスしているユーザー（Googleアカウントにログインしているならばそれが決められた組織のものかどうか）
// ここでは教育用アカウント（ed.jp or ac.jp）かそうでないかを想定

export type AppUser = string | null;

export const AccessUser = (): AppUser => {
  const user = Session.getActiveUser().getEmail();
  const pattern = /^.*@.+\.(ed\.jp|ac\.jp)$/i;

  return pattern.test(user) ? user : null;
};
