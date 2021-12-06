import { useCallback, useState } from "react";

import { Todo } from "../types/api/todo";

type Props = {
  id: number;
  todos: Array<Todo>;
  onOpen: () => void;
};

//選択したユーザー情報を特定しモーダルを表示するカスタムフック
export const useSelectTodo = () => {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const onSelectTodo = useCallback((props: Props) => {
    const { id, todos, onOpen } = props;
    const targetTodo = todos.find((todo) => todo.id === id);
    setSelectedTodo(targetTodo || null);
    onOpen();
  }, []);

  return { onSelectTodo, selectedTodo };
};
