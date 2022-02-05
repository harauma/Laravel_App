import React from "react";
import {
  ChangeEvent,
  MouseEvent,
  memo,
  useCallback,
  useEffect,
  useState,
  VFC,
} from "react";
import {
  Center,
  FormControl,
  FormLabel,
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

import { useAllTodos } from "../../hooks/Todo/useAllTodos";
import { Todo } from "../../types/api/todo";
import { TodoCard } from "../organisms/todo/TodoCard";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { useCreateTodo } from "../../hooks/Todo/useCreateTodo";
import { TodoDetailModal } from "../organisms/todo/TodoDetailModal";
import { useSelectTodo } from "../../hooks/Todo/useSelectTodo";
import { useLoginAccount } from "../../hooks/useLoginAccount";
import { isEmpty, isNil } from "lodash";

export const Home: VFC = memo(() => {
  const { loginAccount } = useLoginAccount();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    getTodos,
    todos,
    completedTodos,
    loading: getLoading,
  } = useAllTodos();
  const { createTodo, loading: createLoading } = useCreateTodo();
  const { onSelectTodo, selectedTodo } = useSelectTodo();
  const [newTodo, setNewTodo] = useState("");
  const [todoDetail, setTodoDetail] = useState("");

  useEffect(() => {
    if (!isNil(loginAccount)) {
      getTodos(true, loginAccount?.id!);
    }
  }, [loginAccount]);

  const onChangeNewTodo = (e: ChangeEvent<HTMLInputElement>) =>
    setNewTodo(e.target.value);
  const onChangeTodoDetail = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setTodoDetail(e.target.value);
  const onClickGetTodo = () => {
    getTodos(true, loginAccount?.id!);
  };

  const onClickSubmit = async () => {
    const todo: Todo = {
      account_id: loginAccount?.id,
      todo: newTodo,
      detail: todoDetail,
      completed: false,
    };
    await createTodo(todo);
    setNewTodo("");
    setTodoDetail("");
    getTodos(false, loginAccount?.id!);
  };

  const onClickAdd = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation;
    console.log(e);
  }, []);

  const onClickTodo = useCallback(
    (id: number) => {
      onSelectTodo({ id, todos, onOpen });
    },
    [todos, onSelectTodo, onOpen]
  );

  const onClickCompletedTodo = useCallback(
    (id: number) => {
      onSelectTodo({ id, todos: completedTodos, onOpen });
    },
    [completedTodos, onSelectTodo, onOpen]
  );

  const onCloseModal = () => {
    getTodos(false, loginAccount?.id!);
    onClose();
  };

  return (
    <>
      {getLoading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Tabs isFitted size="lg" variant="enclosed" colorScheme="green">
          <TabList>
            <Tab>One</Tab>
            <Tab>Two</Tab>
            <Tab>Three</Tab>
            <Tab isDisabled>
              <PrimaryButton size="sm" variant="outline" onClick={onClickAdd}>
                +
              </PrimaryButton>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Stack spacing={3}>
                <FormControl id="todo" isRequired>
                  <FormLabel>Todo</FormLabel>
                  <Input
                    placeholder="Todoを入力"
                    value={newTodo}
                    onChange={onChangeNewTodo}
                  />
                </FormControl>
                <FormControl id="todoDetail">
                  <FormLabel>Todo詳細</FormLabel>
                  <Textarea
                    placeholder="Todo詳細を入力"
                    value={todoDetail}
                    onChange={onChangeTodoDetail}
                  />
                </FormControl>
                <PrimaryButton
                  disabled={newTodo === ""}
                  isLoading={createLoading}
                  onClick={onClickSubmit}
                >
                  登録
                </PrimaryButton>
                <PrimaryButton onClick={onClickGetTodo}>todo取得</PrimaryButton>
                <Heading as="h2" size="md">
                  Todo一覧
                </Heading>
                <Wrap>
                  {!isEmpty(todos) ? (
                    todos?.map((todo: Todo) => (
                      <TodoCard
                        id={todo.id!}
                        key={todo.id}
                        todo={todo}
                        onClick={onClickTodo}
                      />
                    ))
                  ) : (
                    <Text fontSize="md">Todoが登録されていません</Text>
                  )}
                </Wrap>
                <Heading as="h2" size="md">
                  完了したTodo一覧
                </Heading>
                <Wrap>
                  {!isEmpty(completedTodos) ? (
                    completedTodos?.map((todo: Todo) => (
                      <TodoCard
                        id={todo.id!}
                        key={todo.id}
                        todo={todo}
                        onClick={onClickCompletedTodo}
                      />
                    ))
                  ) : (
                    <Text fontSize="md">完了したTodoがありません</Text>
                  )}
                </Wrap>
              </Stack>
            </TabPanel>
            <TabPanel>
              <Stack spacing={3}>
                <FormControl id="todo" isRequired>
                  <FormLabel>Todo</FormLabel>
                  <Input
                    placeholder="Todoを入力"
                    value={newTodo}
                    onChange={onChangeNewTodo}
                  />
                </FormControl>
                <FormControl id="todoDetail">
                  <FormLabel>Todo詳細</FormLabel>
                  <Textarea
                    placeholder="Todo詳細を入力"
                    value={todoDetail}
                    onChange={onChangeTodoDetail}
                  />
                </FormControl>
                <PrimaryButton
                  disabled={newTodo === ""}
                  isLoading={createLoading}
                  onClick={onClickSubmit}
                >
                  登録
                </PrimaryButton>
                <PrimaryButton onClick={onClickGetTodo}>todo取得</PrimaryButton>
                <Heading as="h2" size="md">
                  Todo一覧
                </Heading>
                <Wrap>
                  {!isEmpty(todos) ? (
                    todos?.map((todo: Todo) => (
                      <>
                        <TodoCard
                          id={todo.id!}
                          todo={todo}
                          onClick={onClickTodo}
                        />
                        <TodoCard
                          id={todo.id!}
                          todo={todo}
                          onClick={onClickTodo}
                        />
                      </>
                    ))
                  ) : (
                    <Text fontSize="md">Todoが登録されていません</Text>
                  )}
                </Wrap>
                <Heading as="h2" size="md">
                  完了したTodo一覧
                </Heading>
                <Wrap>
                  {!isEmpty(completedTodos) ? (
                    completedTodos?.map((todo: Todo) => (
                      <>
                        <TodoCard
                          id={todo.id!}
                          todo={todo}
                          onClick={onClickCompletedTodo}
                        />
                        <TodoCard
                          id={todo.id!}
                          todo={todo}
                          onClick={onClickCompletedTodo}
                        />
                      </>
                    ))
                  ) : (
                    <Text fontSize="md">完了したTodoがありません</Text>
                  )}
                </Wrap>
              </Stack>
            </TabPanel>
            <TabPanel>
              <Stack spacing={3}>
                <FormControl id="todo" isRequired>
                  <FormLabel>Todo</FormLabel>
                  <Input
                    placeholder="Todoを入力"
                    value={newTodo}
                    onChange={onChangeNewTodo}
                  />
                </FormControl>
                <FormControl id="todoDetail">
                  <FormLabel>Todo詳細</FormLabel>
                  <Textarea
                    placeholder="Todo詳細を入力"
                    value={todoDetail}
                    onChange={onChangeTodoDetail}
                  />
                </FormControl>
                <PrimaryButton
                  disabled={newTodo === ""}
                  isLoading={createLoading}
                  onClick={onClickSubmit}
                >
                  登録
                </PrimaryButton>
                <PrimaryButton onClick={onClickGetTodo}>todo取得</PrimaryButton>
                <Heading as="h2" size="md">
                  Todo一覧
                </Heading>
                <Wrap>
                  {!isEmpty(todos) ? (
                    todos?.map((todo: Todo) => (
                      <>
                        <TodoCard
                          id={todo.id!}
                          todo={todo}
                          onClick={onClickTodo}
                        />
                        <TodoCard
                          id={todo.id!}
                          todo={todo}
                          onClick={onClickTodo}
                        />
                        <TodoCard
                          id={todo.id!}
                          todo={todo}
                          onClick={onClickTodo}
                        />
                        <TodoCard
                          id={todo.id!}
                          todo={todo}
                          onClick={onClickTodo}
                        />
                      </>
                    ))
                  ) : (
                    <Text fontSize="md">Todoが登録されていません</Text>
                  )}
                </Wrap>
                <Heading as="h2" size="md">
                  完了したTodo一覧
                </Heading>
                <Wrap>
                  {!isEmpty(completedTodos) ? (
                    completedTodos?.map((todo: Todo) => (
                      <>
                        <TodoCard
                          id={todo.id!}
                          todo={todo}
                          onClick={onClickCompletedTodo}
                        />
                        <TodoCard
                          id={todo.id!}
                          todo={todo}
                          onClick={onClickCompletedTodo}
                        />
                        <TodoCard
                          id={todo.id!}
                          todo={todo}
                          onClick={onClickCompletedTodo}
                        />
                        <TodoCard
                          id={todo.id!}
                          todo={todo}
                          onClick={onClickCompletedTodo}
                        />
                      </>
                    ))
                  ) : (
                    <Text fontSize="md">完了したTodoがありません</Text>
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
