import { useCallback, useState } from "react";
import axios from "axios";

import { Todo } from "../../types/api/todo";
import { useMessage } from "../useMessage";
import { filter, isEmpty } from "lodash";

export const useAllTodos = () => {
  const { showMessage } = useMessage();

  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [completedTodos, setCompletedTodos] = useState<Array<Todo>>([]);

  const getTodos = useCallback((loading: boolean, account_id: number) => {
    setLoading(loading);
    async function getTodos() {
      await axios
        .get<Array<Todo>>(`api/todos?account_id=${account_id}`)
        .then((res) => {
          if (isEmpty(res.data)) {
            setTodos([]);
            setCompletedTodos([]);
          } else {
            const notCompletedTodos = filter(res.data, (todo) => {
              return !todo.completed
            });
            const completedTodos = filter(res.data, (todo) => {
              return todo.completed || false
            });
            setTodos(notCompletedTodos);
            setCompletedTodos(completedTodos)
          }
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
  return { getTodos, loading, todos, completedTodos };
};