// アクセスしているユーザー（Googleアカウントにログインしているならばそれが決められた組織のものかどうか）
// ここでは教育用アカウント（ed.jp or ac.jp）かそうでないかを想定

interface AccessUser {
  userId: string | null;
  isEducationUser: boolean;
}

const getAccessUser = (): AccessUser => {
  const user = Session.getActiveUser().getEmail();
  const pattern = /^.*@.+\.(ed\.jp|ac\.jp)$/i;

  return {
    userId: user !== "" ? user : null,
    isEducationUser: pattern.test(user),
  };
};

export { getAccessUser, type AccessUser };
