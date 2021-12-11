import { useContext } from "react";

import {
  LoginAccountContext,
  LoginAccountContextType
} from "../providers/LoginUserProvider";

export const useLoginAccount = (): LoginAccountContextType => {
  const c = useContext(LoginAccountContext);
  if (!c) throw new Error("useCtx must be inside a Provider with a value");
  return c;
};
