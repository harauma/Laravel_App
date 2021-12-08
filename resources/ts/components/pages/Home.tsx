import React from "react";
import {
  ChangeEvent,
  memo,
  useCallback,
  useEffect,
  useState,
  VFC,
} from "react";
import {
  Center,
  Heading,
  Input,
  Spinner,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
  useDisclosure,
  Wrap,
} from "@chakra-ui/react";

import { useAllTodos } from "../../hooks/useAllTodos";
import { Todo } from "../../types/api/todo";
import { TodoCard } from "../organisms/todo/TodoCard";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { useCreateTodo } from "../../hooks/useCreateTodo";
import { TodoDetailModal } from "../organisms/todo/TodoDetailModal";
import { useSelectTodo } from "../../hooks/useSelectTodo";

export const Home: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getTodos, todos, loading: getLoading } = useAllTodos();
  const { createTodo, loading: createLoading } = useCreateTodo();
  const { onSelectTodo, selectedTodo } = useSelectTodo();
  const [newTodo, setNewTodo] = useState("");
  const [todoDetail, setTodoDetail] = useState("");

  useEffect(() => getTodos(true), []);

  const onChangeNewTodo = (e: ChangeEvent<HTMLInputElement>) =>
    setNewTodo(e.target.value);
  const onChangeTodoDetail = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setTodoDetail(e.target.value);
  const onClickGetTodo = () => {
    getTodos(true);
  };

  const onClickSubmit = async () => {
    const todo: Todo = {
      account_id: 1,
      todo: newTodo,
      detail: todoDetail,
      completed: false,
    };
    await createTodo(todo);
    setNewTodo("");
    setTodoDetail("");
    getTodos(false);
  };

  const onClickTodo = useCallback(
    (id: number) => {
      onSelectTodo({ id, todos, onOpen });
    },
    [todos, onSelectTodo, onOpen]
  );

  const onCloseModal = () => {
    getTodos(false);
    onClose();
  };

  return (
    <>
      {getLoading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Tabs size="lg" variant="enclosed" colorScheme="green">
          <TabList>
            <Tab>One</Tab>
            <Tab>Two</Tab>
            <Tab>Three</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Stack spacing={3}>
                <Input
                  placeholder="Todoを入力"
                  value={newTodo}
                  onChange={onChangeNewTodo}
                />
                <Textarea
                  placeholder="Todoの詳細を入力"
                  value={todoDetail}
                  onChange={onChangeTodoDetail}
                />
                <PrimaryButton
                  disabled={newTodo === ""}
                  loading={createLoading}
                  onClick={onClickSubmit}
                >
                  登録
                </PrimaryButton>
                <PrimaryButton onClick={onClickGetTodo}>todo取得</PrimaryButton>
                <Heading as="h2" size="md">
                  Todo一覧
                </Heading>
                <Wrap>
                  {todos ? (
                    todos?.map((todo: Todo) => (
                      <TodoCard
                        id={todo.id!}
                        todo={todo}
                        onClick={onClickTodo}
                      />
                    ))
                  ) : (
                    <Text fontSize="md">まだTodoが登録されていません</Text>
                  )}
                </Wrap>
                <Heading as="h2" size="md">
                  完了したTodo一覧
                </Heading>
                <Wrap>
                  {todos ? (
                    todos?.map((todo: Todo) => (
                      <TodoCard
                        id={todo.id!}
                        todo={todo}
                        onClick={onClickTodo}
                      />
                    ))
                  ) : (
                    <Text fontSize="md">まだTodoが登録されていません</Text>
                  )}
                </Wrap>
              </Stack>
            </TabPanel>
            <TabPanel>
              <Stack spacing={3}>
                <Input placeholder="Todoを入力" />
                <Textarea placeholder="Todoの詳細を入力" />
                <Heading as="h2" size="md">
                  Todo一覧
                </Heading>
                <Wrap>
                  {todos ? (
                    (todos?.map((todo: Todo) => (
                      <TodoCard
                        id={todo.id!}
                        todo={todo}
                        onClick={onClickTodo}
                      />
                    )),
                    todos?.map((todo: Todo) => (
                      <TodoCard
                        id={todo.id!}
                        todo={todo}
                        onClick={onClickTodo}
                      />
                    )))
                  ) : (
                    <Text fontSize="md">まだTodoが登録されていません</Text>
                  )}
                </Wrap>
                <Heading as="h2" size="md">
                  完了したTodo一覧
                </Heading>
                <Wrap>
                  {todos ? (
                    (todos?.map((todo: Todo) => (
                      <TodoCard
                        id={todo.id!}
                        todo={todo}
                        onClick={onClickTodo}
                      />
                    )),
                    todos?.map((todo: Todo) => (
                      <TodoCard
                        id={todo.id!}
                        todo={todo}
                        onClick={onClickTodo}
                      />
                    )))
                  ) : (
                    <Text fontSize="md">まだTodoが登録されていません</Text>
                  )}
                </Wrap>
              </Stack>
            </TabPanel>
            <TabPanel>
              <Stack spacing={3}>
                <Input placeholder="Todoを入力" />
                <Textarea placeholder="Todoの詳細を入力" />
                <Heading as="h2" size="md">
                  Todo一覧
                </Heading>
                <Wrap>
                  {todos ? (
                    (todos?.map((todo: Todo) => (
                      <TodoCard
                        id={todo.id!}
                        todo={todo}
                        onClick={onClickTodo}
                      />
                    )),
                    todos?.map((todo: Todo) => (
                      <TodoCard
                        id={todo.id!}
                        todo={todo}
                        onClick={onClickTodo}
                      />
                    )))
                  ) : (
                    <Text fontSize="md">まだTodoが登録されていません</Text>
                  )}
                </Wrap>
                <Heading as="h2" size="md">
                  完了したTodo一覧
                </Heading>
                <Wrap>
                  {todos ? (
                    (todos?.map((todo: Todo) => (
                      <TodoCard
                        id={todo.id!}
                        todo={todo}
                        onClick={onClickTodo}
                      />
                    )),
                    todos?.map((todo: Todo) => (
                      <TodoCard
                        id={todo.id!}
                        todo={todo}
                        onClick={onClickTodo}
                      />
                    )))
                  ) : (
                    <Text fontSize="md">まだTodoが登録されていません</Text>
                  )}
                </Wrap>
              </Stack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      )}
      <TodoDetailModal
        todoInfo={selectedTodo}
        isOpen={isOpen}
        onClose={onCloseModal}
      />
    </>
  );
});
