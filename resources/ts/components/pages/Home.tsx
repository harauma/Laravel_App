import React from "react";
import { memo, useEffect, VFC } from "react";
import {
  Center,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Textarea,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

import { useAllTodos } from "../../hooks/useAllTodos";
import { Todo } from "../../types/api/todo";
import { UserCard } from "../organisms/user/UserCard";
import { TodoCard } from "../organisms/todo/TodoCard";

export const Home: VFC = memo(() => {
  const { getTodos, todos, loading } = useAllTodos();
  useEffect(() => getTodos(), []);

  return (
    <>
      {loading ? (
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
              <Textarea placeholder="Here is a sample placeholder" />
              <Wrap p={{ base: 3, md: 10 }}>
                {todos?.map((todo: Todo) => (
                  <TodoCard id={todo.id} todo={todo.todo} />
                ))}
              </Wrap>
            </TabPanel>
            <TabPanel>
              <Textarea placeholder="Here is a sample placeholder" />
              <Wrap p={{ base: 4, md: 10 }}>
                {todos?.map((todo: Todo) => (
                  <TodoCard id={todo.id} todo={todo.todo + 2} />
                ))}
                {todos?.map((todo: Todo) => (
                  <TodoCard id={todo.id} todo={todo.todo + 2} />
                ))}
              </Wrap>
            </TabPanel>
            <TabPanel>
              <Textarea placeholder="Here is a sample placeholder" />
              <Wrap p={{ base: 4, md: 10 }}>
                {todos?.map((todo: Todo) => (
                  <TodoCard id={todo.id} todo={todo.todo + 3} />
                ))}
                {todos?.map((todo: Todo) => (
                  <TodoCard id={todo.id} todo={todo.todo + 2} />
                ))}
                {todos?.map((todo: Todo) => (
                  <TodoCard id={todo.id} todo={todo.todo + 2} />
                ))}
                {todos?.map((todo: Todo) => (
                  <TodoCard id={todo.id} todo={todo.todo + 2} />
                ))}
                {todos?.map((todo: Todo) => (
                  <TodoCard id={todo.id} todo={todo.todo + 2} />
                ))}
                {todos?.map((todo: Todo) => (
                  <TodoCard id={todo.id} todo={todo.todo + 2} />
                ))}
              </Wrap>
            </TabPanel>
          </TabPanels>
        </Tabs>
      )}
      <p>ホームページです</p>
    </>
  );
});
