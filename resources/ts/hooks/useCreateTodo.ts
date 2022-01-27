import { useCallback, useState } from "react";
import axios from "axios";

import { Todo } from "../types/api/todo";
import { useMessage } from "./useMessage";

export const useCreateTodo = () => {
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);

  const createTodo = useCallback((todo: Todo) => {
    setLoading(true);
    async function createTodo() {
      await axios
        .post<Todo>("api/todos", { todo })
        .then((_res) => {
          showMessage({ title: "todoの登録に成功しました", status: "success" });
        })
        .catch(() => {
          showMessage({ title: "todoの登録に失敗しました", status: "error" });
        })
        .finally(() => {
          setLoading(false);
        });
    }
    return createTodo();
  }, []);
  return { createTodo, loading };
};
