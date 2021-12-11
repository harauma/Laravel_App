import { useCallback, useState } from "react";
import axios from "axios";

import { Todo } from "../types/api/todo";
import { useMessage } from "./useMessage";

export const useAllTodos = () => {
  const { showMessage } = useMessage();

  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState<Array<Todo>>([]);

  const getTodos = useCallback((loading: boolean, account_id: number) => {
    setLoading(loading);
    async function getTodos() {
      await axios
        .get<Array<Todo>>(`http://homestead.test/api/todos?account_id=${account_id}`)
        .then((res) => {
          setTodos(res.data ?? []);
        })
        .catch(() =>
          showMessage({ title: "todoの取得に失敗しました", status: "error" })
        )
        .finally(() => {
          setLoading(false);
        });
    }
    getTodos();
  }, []);
  return { getTodos, loading, todos };
};
