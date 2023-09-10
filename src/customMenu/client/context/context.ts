// import { createContext } from "react";
import { type MenuDataResult } from "./ctxHooks";

// TODO: 型エイリアスでそのまま別名にするのではなく、いったんintersection型でMenuDataResultとの差別化をしているが、不要かも
export type MenuCtxType = MenuDataResult & { message?: string };
