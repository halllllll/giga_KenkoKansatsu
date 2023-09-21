import { createContext, type FC } from "react";
import { Providers } from "./Providers";
import { type MenuCtxType } from "./context/context";

export const CustomMenuCtx = createContext<MenuCtxType | null>(null);

const App: FC = () => {
  return <Providers />;
};

export default App;
