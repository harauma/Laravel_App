import React from "react";
import {
  MouseEvent,
  useCallback,
  useEffect,
  useState,
  ChangeEvent,
} from "react";
import { memo, VFC } from "react";
import {
  Box,
  Checkbox,
  HStack,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
} from "@chakra-ui/react";
import { Todo } from "../../../types/api/todo";

type Props = {
  id: number;
  todo: Todo;
  onClick: (id: number) => void;
  updateTodo: (todo: Todo) => void;
};

export const TodoCard: VFC<Props> = memo((props) => {
  const { id, todo, onClick, updateTodo } = props;
  const [completed, setCompleted] = useState(false);

  /**
   * Todo完了チェックボックス押下時処理
   * @param e ChangeEvent<HTMLInputElement>
   */
  const onChangeCompleted = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setCompleted(e.target.checked);
    // todo更新API
    updateTodo({ ...todo, completed: e.target.checked });
  }, []);

  /**
   * Todoカード領域押下時処理
   * @param e MouseEvent<HTMLDivElement>
   */
  const onClickCard = (e: MouseEvent<HTMLDivElement>) => {
    // 判別用にクリックされた要素を取得
    const element = e.target as HTMLElement;
    switch (element.tagName) {
      // カード上で別イベントがある場合はモーダル表示しない
      case "INPUT":
      case "LABEL":
      case "SPAN":
      case "svg":
      case "polyline":
      case "path":
        break;
      case "P":
        // チェックボックスの文字列クリック時はモーダル表示しない
        const classList = element.parentElement?.classList.value || "";
        if (classList.indexOf("chakra-checkbox") !== -1) {
          break;
        }
      default:
        // Todo詳細モーダル表示
        onClick(id);
        break;
    }
  };

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
      onClick={onClickCard}
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
          colorScheme="teal"
          value={todo.id}
          isChecked={completed}
          onChange={onChangeCompleted}
        >
          <Text fontSize="sm">完了しました？</Text>
        </Checkbox>
        <HStack spacing={2}>
          <Tag size="sm" borderRadius="full" variant="solid" colorScheme="teal">
            <TagLabel>仕事</TagLabel>
            <TagCloseButton />
          </Tag>
          <Tag size="sm" borderRadius="full" variant="solid" colorScheme="teal">
            <TagLabel>買い物</TagLabel>
            <TagCloseButton />
          </Tag>
        </HStack>
      </Stack>
    </Box>
  );
});
