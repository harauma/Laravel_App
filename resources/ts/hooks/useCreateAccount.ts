import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { useMessage } from "./useMessage";
import { Account } from "../types/api/account";

export const useCreateAccount = () => {
  const history = useHistory();
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);

  const createAccount = useCallback((account: Account) => {
    setLoading(true);
    async function createAccount() {
      await axios
        .post<Account>("http://homestead.test/api/accounts", account)
        .then((_res) => {
          showMessage({ title: "ユーザーの登録に成功しました", status: "success" });
          history.push("login");
        })
        .catch(() => {
          showMessage({ title: "ユーザーの登録に失敗しました", status: "error" });
        })
        .finally(() => {
          setLoading(false);
        });
    }
    return createAccount();
  }, []);
  return { createAccount, loading };
};
