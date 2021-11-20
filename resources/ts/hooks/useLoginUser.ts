import { useContext } from "react";

import {
  LoginUserContext,
  LoginUserContextType
} from "../providers/LoginUserProvider";

export const useLoginUser = (): LoginUserContextType => {
  const c = useContext(LoginUserContext);
  if (!c) throw new Error("useCtx must be inside a Provider with a value");
  return c;
};
