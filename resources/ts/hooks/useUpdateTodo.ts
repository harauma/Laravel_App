import { useCallback, useState } from "react";
import axios from "axios";

import { Todo } from "../types/api/todo";
import { useMessage } from "./useMessage";

export const useUpdateTodo = () => {
  const { showMessage } = useMessage();

  const [loading, setLoading] = useState(false);

  const updateTodo = useCallback((todo: Todo) => {
    setLoading(true);
    async function updateTodo() {
      await axios
        .put<Todo>(`api/todos/${todo.id}`, { todo })
        .then((_res) => {
          showMessage({ title: "todoの更新に成功しました", status: "success" })
        })
        .catch(() =>
          showMessage({ title: "todoの更新に失敗しました", status: "error" })
        )
        .finally(() => {
          setLoading(false);
        });
    }
    return updateTodo();
  }, []);
  return { updateTodo, loading };
};
