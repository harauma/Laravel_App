import { isNil } from "lodash";
import React from "react";
import { createContext, ReactNode, useEffect, useState } from "react";

type LoginAccountInfo = {
  id: number;
  name: string;
};

export type LoginAccountContextType = {
  loginAccount: LoginAccountInfo | undefined;
  setLoginAccount: (loginAccount: LoginAccountInfo | undefined) => void;
};

export const LoginAccountContext = createContext<
  LoginAccountContextType | undefined
>(undefined);

export const LoginUserProvider = (props: { children: ReactNode }) => {
  const { children } = props;
  const [loginAccount, setLoginAccount] = useState<
    LoginAccountInfo | undefined
  >();

  const newContext: LoginAccountContextType = {
    loginAccount,
    setLoginAccount: (loginAccount: LoginAccountInfo | undefined) => {
      if (loginAccount) {
        sessionStorage.setItem("user_id", String(loginAccount.id));
        sessionStorage.setItem("user_name", loginAccount.name);
      } else {
        sessionStorage.removeItem("user_name");
        sessionStorage.removeItem("user_id");
      }
      setLoginAccount(loginAccount);
    },
  };

  useEffect(() => {
    if (
      isNil(loginAccount) &&
      sessionStorage.user_name &&
      sessionStorage.user_id
    ) {
      setLoginAccount({
        id: sessionStorage.user_id,
        name: sessionStorage.user_name,
      });
    }
  }, [loginAccount]);

  return (
    <LoginAccountContext.Provider value={newContext}>
      {children}
    </LoginAccountContext.Provider>
  );
};
