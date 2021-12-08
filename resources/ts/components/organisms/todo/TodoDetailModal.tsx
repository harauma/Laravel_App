import React from "react";
import { ChangeEvent, memo, useEffect, useState, VFC } from "react";
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
} from "@chakra-ui/react";

import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { Checkbox } from "@chakra-ui/react";
import { Todo } from "../../../types/api/todo";
import { useDeleteTodo } from "../../../hooks/useDeleteTodo";

type Props = {
  todoInfo: Todo | null;
  isOpen: boolean;
  isAdmin?: boolean;
  onClose: () => void;
};

export const TodoDetailModal: VFC<Props> = memo((props) => {
  const { todoInfo, isOpen, onClose } = props;
  const { deleteTodo, loading: deleteLoading } = useDeleteTodo();
  const [todo, setTodo] = useState<Todo>({});

  useEffect(() => {
    setTodo(todoInfo ?? {});
  }, [todoInfo]);

  const onChangeTodo = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo({ ...todo, todo: e.target.value });
  };

  const onChangeTodoDetail = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo({ ...todo, detail: e.target.value });
  };

  const onChangeCompleted = (e: any) => {
    setTodo({ ...todo, completed: e.target.value });
  };
  const onClickUpdate = () => alert("//Todo 更新API呼び出す！");

  const onClickDelete = async () => {
    await deleteTodo(todo);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      autoFocus={false}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent pb={2}>
        <ModalHeader>Todo詳細</ModalHeader>
        <ModalCloseButton />
        <ModalBody mx={4}>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Todo</FormLabel>
              <Input value={todo.todo} onChange={onChangeTodo} />
            </FormControl>
            <FormControl>
              <FormLabel>Todo詳細</FormLabel>
              <Input value={todo.detail} onChange={onChangeTodoDetail} />
            </FormControl>
            <FormControl>
              <FormLabel>登録者</FormLabel>
              <Input value={todo.account_name} isDisabled={true} />
            </FormControl>
            <FormControl>
              <Checkbox
                size="md"
                colorScheme="green"
                value={todo.id}
                isChecked={todo.completed}
                onChange={onChangeCompleted}
              >
                <Text fontSize="md">完了しました？</Text>
              </Checkbox>
            </FormControl>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <PrimaryButton onClick={onClickUpdate} mr="3">
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
