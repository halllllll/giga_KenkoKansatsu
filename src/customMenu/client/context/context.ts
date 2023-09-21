import { type AboutDomain } from "@/Config/MenuResponse";

export type MenuDataResult = {
  domain: AboutDomain;
  passcord?: null; // TODO: passcord
};
// TODO: 型エイリアスでそのまま別名にするのではなく、いったんintersection型でMenuDataResultとの差別化をしているが、不要かも
export type MenuCtxType = MenuDataResult & { message?: string };
