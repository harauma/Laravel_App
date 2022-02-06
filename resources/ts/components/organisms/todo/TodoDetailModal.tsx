import React from "react";
import { ChangeEvent, memo, useEffect, useRef, useState, VFC } from "react";
import {
  FormLabel,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Button,
  Textarea,
} from "@chakra-ui/react";

import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { Checkbox } from "@chakra-ui/react";
import { Todo } from "../../../types/api/todo";
import { useDeleteTodo } from "../../../hooks/Todo/useDeleteTodo";
import { useUpdateTodo } from "../../../hooks/Todo/useUpdateTodo";
import { useAllTags } from "../../../hooks/useAllTags";

type Props = {
  todoInfo: Todo | null;
  isOpen: boolean;
  isAdmin?: boolean;
  onClose: () => void;
};

export const TodoDetailModal: VFC<Props> = memo((props) => {
  const { todoInfo, isOpen, onClose } = props;
  const { getTags, tags } = useAllTags();
  const { updateTodo, loading: updateLoading } = useUpdateTodo();
  const { deleteTodo, loading: deleteLoading } = useDeleteTodo();
  const [todo, setTodo] = useState<Todo>({});
  const initialRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTodo(todoInfo ?? {});
  }, [todoInfo]);

  useEffect(() => {
    getTags();
  }, []);

  const onChangeTodo = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo({ ...todo, todo: e.target.value });
  };

  const onChangeTodoDetail = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTodo({ ...todo, detail: e.target.value });
  };

  const onChangeCompleted = (e: any) => {
    setTodo({ ...todo, completed: e.target.checked });
  };
  const onClickUpdate = async () => {
    await updateTodo(todo);
    onClose();
  };

  const onClickDelete = async () => {
    await deleteTodo(todo);
    onClose();
  };

  return (
    <Modal
      initialFocusRef={initialRef}
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent pb={2}>
        <ModalHeader>Todo詳細</ModalHeader>
        <ModalCloseButton />
        <ModalBody mx={4}>
          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Todo</FormLabel>
              <Input
                ref={initialRef}
                value={todo.todo}
                onChange={onChangeTodo}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Todo詳細</FormLabel>
              <Textarea value={todo.detail} onChange={onChangeTodoDetail} />
            </FormControl>
            <FormControl>
              <FormLabel>登録者</FormLabel>
              <Input value={todo.account_name} isDisabled={true} />
            </FormControl>
            <FormControl>
              <Checkbox
                size="md"
                colorScheme="teal"
                value={todo.id}
                isChecked={todo.completed}
                onChange={onChangeCompleted}
              >
                <Text fontSize="md">完了しました？</Text>
              </Checkbox>
            </FormControl>
          </Stack>
        </ModalBody>
        <ModalFooter justifyContent="center">
          <PrimaryButton
            mr="3"
            isLoading={updateLoading}
            onClick={onClickUpdate}
            disabled={todo.todo === ""}
          >
            更新
          </PrimaryButton>
          <Button
            bg="red.400"
            color="white"
            _hover={{ opacity: 0.8 }}
            onClick={onClickDelete}
            isLoading={deleteLoading}
          >
            削除
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});
