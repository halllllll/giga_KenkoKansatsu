// アクセスしているユーザー（Googleアカウントにログインしているならばそれが決められた組織のものかどうか）
// - educator ... 教育機関（組織）用を想定
// - general ... 一般（保護者など）を想定

import { ADMIN_ACCOUNT } from "@/Config/Const";

type AccessedUserType = "educator" | "admin" | "general";

type AccessedUserResp = {
  userType: AccessedUserType;
  userId?: string;
};

const getAccessUser = (): AccessedUserResp => {
  const user = Session.getActiveUser().getEmail();
  // TODO: for parent user
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
