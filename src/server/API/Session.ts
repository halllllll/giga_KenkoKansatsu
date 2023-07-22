// アクセスしているユーザー（Googleアカウントにログインしているならばそれが決められた組織のものかどうか）
// ここでは教育用アカウント（ed.jp or ac.jp）かそうでないかを想定

import { ADMIN_ACCOUNT } from "../Config/Const";

type AccessedUserType = "educator" | "admin" | "general";

type AccessedUserResp = {
  userType: AccessedUserType;
  userId?: string;
};

const getAccessUser = (): AccessedUserResp => {
  const user = Session.getActiveUser().getEmail();
  // TODO: for parent user
  console.log("Yo!");
  console.log(`id is ${user}`);
  // TODO: set from sheet custom menu, and save and invoke from cache
  const pattern = /^.*@.+\.(ed\.jp|ac\.jp)$/i;

  // TODO: for admin
  if (ADMIN_ACCOUNT.includes(user)) {
    return { userType: "admin", userId: user };
  }

  // とりあえずAdminは無視
  return pattern.test(user)
    ? {
        userType: "educator",
        userId: user,
      }
    : {
        userType: "general",
      };
};

export { getAccessUser, type AccessedUserType };
