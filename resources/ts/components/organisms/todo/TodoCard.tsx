import React from "react";
import { useCallback, useEffect, useState } from "react";
import { memo, VFC } from "react";
import { Box, Checkbox, Stack, Text } from "@chakra-ui/react";
import { Todo } from "../../../types/api/todo";

type Props = {
  id: number;
  todo: Todo;
  onClick: (id: number) => void;
};

export const TodoCard: VFC<Props> = memo((props) => {
  const { id, todo, onClick } = props;
  const [completed, setCompleted] = useState(false);

  const onChangeCompleted = useCallback((e) => {
    console.log(e.target.checked);
    setCompleted(e.target.checked);
    // todo更新API
  }, []);

  useEffect(() => {
    setCompleted(todo?.completed ?? false);
  }, [todo]);

  return (
    <Box
      w="200px"
      h="200px"
      bg="white"
      borderRadius="10px"
      shadow="md"
      p={4}
      onClick={() => onClick(id)}
      _hover={{ cursor: "pointer", opacity: 0.8 }}
    >
      <Stack justify="space-between">
        <Text fontSize="lg" fontWeight="bold">
          {todo.todo}
        </Text>
        <Text fontSize="md" whiteSpace="pre-wrap">
          {todo.detail}
        </Text>
        <Text fontSize="sm" color="gray">
          {todo.account_name}
        </Text>
        <Checkbox
          size="md"
          colorScheme="green"
          value={todo.id}
          isChecked={completed}
          onChange={onChangeCompleted}
        >
          <Text fontSize="md">完了しました？</Text>
        </Checkbox>
      </Stack>
    </Box>
  );
});
