import React from "react";
import { ChangeEvent, memo, useEffect, useState, VFC } from "react";
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
  Wrap,
} from "@chakra-ui/react";

import { useAllTodos } from "../../hooks/useAllTodos";
import { Todo } from "../../types/api/todo";
import { TodoCard } from "../organisms/todo/TodoCard";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { useCreateTodo } from "../../hooks/useCreateTodo";

export const Home: VFC = memo(() => {
  const { getTodos, todos, loading: getLoading } = useAllTodos();
  const { createTodo, loading: createLoading } = useCreateTodo();
  const [newTodo, setNewTodo] = useState("");
  const [todoDetail, setTodoDetail] = useState("");

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
  useEffect(() => getTodos(true), []);

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
                    todos?.map((todo: Todo) => <TodoCard todo={todo} />)
                  ) : (
                    <Text fontSize="md">まだTodoが登録されていません</Text>
                  )}
                </Wrap>
                <Heading as="h2" size="md">
                  完了したTodo一覧
                </Heading>
                <Wrap>
                  {todos ? (
                    todos?.map((todo: Todo) => <TodoCard todo={todo} />)
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
                    todos?.map((todo: Todo) => <TodoCard todo={todo} />),
                    todos?.map((todo: Todo) => <TodoCard todo={todo} />)
                  ) : (
                    <Text fontSize="md">まだTodoが登録されていません</Text>
                  )}
                </Wrap>
                <Heading as="h2" size="md">
                  完了したTodo一覧
                </Heading>
                <Wrap>
                  {todos ? (
                    todos?.map((todo: Todo) => <TodoCard todo={todo} />),
                    todos?.map((todo: Todo) => <TodoCard todo={todo} />)
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
                    todos?.map((todo: Todo) => <TodoCard todo={todo} />),
                    todos?.map((todo: Todo) => <TodoCard todo={todo} />),
                    todos?.map((todo: Todo) => <TodoCard todo={todo} />),
                    todos?.map((todo: Todo) => <TodoCard todo={todo} />),
                    todos?.map((todo: Todo) => <TodoCard todo={todo} />)
                  ) : (
                    <Text fontSize="md">まだTodoが登録されていません</Text>
                  )}
                </Wrap>
                <Heading as="h2" size="md">
                  完了したTodo一覧
                </Heading>
                <Wrap>
                  {todos ? (
                    todos?.map((todo: Todo) => <TodoCard todo={todo} />),
                    todos?.map((todo: Todo) => <TodoCard todo={todo} />),
                    todos?.map((todo: Todo) => <TodoCard todo={todo} />),
                    todos?.map((todo: Todo) => <TodoCard todo={todo} />),
                    todos?.map((todo: Todo) => <TodoCard todo={todo} />)
                  ) : (
                    <Text fontSize="md">まだTodoが登録されていません</Text>
                  )}
                </Wrap>
              </Stack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      )}
    </>
  );
});
