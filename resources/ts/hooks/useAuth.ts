import axios from "axios";
import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";

import {  Account } from "../types/api/account";
import { useMessage } from "./useMessage";
import { useLoginAccount } from "./useLoginAccount";

export const useAuth = () => {
  const history = useHistory();
  const { showMessage } = useMessage();
  const { setLoginAccount } = useLoginAccount();

  const [loading, setLoading] = useState(false);

  const login = useCallback(
    (login_id: string, password: string) => {
      setLoading(true);
      axios
        .post<Account>("http://homestead.test/api/login", {login_id: login_id, password: password})
        .then((res) => {
          if (res.data) {
            setLoginAccount({id: res.data.id!, name: res.data.name!});
            showMessage({ title: "ログインしました", status: "success" });
            history.push("home");
          } else {
            showMessage({
              title: "アカウントが見つかりません",
              status: "error"
            });
            setLoading(false);
          }
        })
        .catch(() => {
          showMessage({
            title: "ログインできません",
            status: "error"
          });
          setLoading(false);
        });
    },
    [history, showMessage, setLoginAccount]
  );
  return { login, loading };
};
