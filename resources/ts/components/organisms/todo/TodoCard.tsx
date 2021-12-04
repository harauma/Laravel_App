import React from "react";
import { memo, VFC } from "react";
import { Box, Checkbox, Stack, Text } from "@chakra-ui/react";

type Props = {
  id: number;
  todo: string;
};

export const TodoCard: VFC<Props> = memo((props) => {
  const { id, todo } = props;
  return (
    <Box
      w="200px"
      h="200px"
      bg="white"
      borderRadius="10px"
      shadow="md"
      p={4}
      _hover={{ cursor: "pointer", opacity: 0.8 }}
    >
      <Stack justify="center">
        <Text fontSize="lg" fontWeight="bold">
          {todo}
        </Text>
        <Text fontSize="sm" color="gray">
          {id}
        </Text>
        <Checkbox size="md" colorScheme="green" defaultIsChecked>
          <Text fontSize="md">完了しました？</Text>
        </Checkbox>
      </Stack>
    </Box>
  );
});
