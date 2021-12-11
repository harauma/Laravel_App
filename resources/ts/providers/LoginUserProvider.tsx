import React from "react";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

import { Account } from "../types/api/account";

export type LoginAccountContextType = {
  loginAccount: Account | undefined;
  setLoginAccount: Dispatch<SetStateAction<Account | undefined>>;
};

export const LoginAccountContext = createContext<
  LoginAccountContextType | undefined
>(undefined);

export const LoginUserProvider = (props: { children: ReactNode }) => {
  const { children } = props;
  const [loginAccount, setLoginAccount] = useState<Account | undefined>();

  return (
    <LoginAccountContext.Provider value={{ loginAccount, setLoginAccount }}>
      {children}
    </LoginAccountContext.Provider>
  );
};
