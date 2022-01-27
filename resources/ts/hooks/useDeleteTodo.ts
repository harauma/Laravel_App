import { useCallback, useState } from "react";
import axios from "axios";

import { Todo } from "../types/api/todo";
import { useMessage } from "./useMessage";

export const useDeleteTodo = () => {
  const { showMessage } = useMessage();

  const [loading, setLoading] = useState(false);

  const deleteTodo = useCallback((todo: Todo) => {
    setLoading(true);
    async function deleteTodo() {
      await axios
        .delete<Todo>(`api/todos/${todo.id}`, { data: todo })
        .then((_res) => {
          showMessage({ title: "todoの削除に成功しました", status: "success" })
        })
        .catch(() =>
          showMessage({ title: "todoの削除に失敗しました", status: "error" })
        )
        .finally(() => {
          setLoading(false);
        });
    }
    return deleteTodo();
  }, []);
  return { deleteTodo, loading };
};
