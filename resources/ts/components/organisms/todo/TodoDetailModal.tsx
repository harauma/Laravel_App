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

type Props = {
  todoInfo: Todo | null;
  isOpen: boolean;
  isAdmin?: boolean;
  onClose: () => void;
};

export const TodoDetailModal: VFC<Props> = memo((props) => {
  const { todoInfo, isOpen, onClose } = props;

  const [todo, setTodo] = useState("");
  const [todoDetail, setTodoDetail] = useState("");
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setTodo(todoInfo?.todo ?? "");
    setTodoDetail(todoInfo?.detail ?? "");
    setCompleted(todoInfo?.completed ?? false);
  }, [todoInfo]);

  const onChangeTodo = (e: ChangeEvent<HTMLInputElement>) =>
    setTodo(e.target.value);

  const onChangeTodoDetail = (e: ChangeEvent<HTMLInputElement>) =>
    setTodoDetail(e.target.value);

  const onChangeCompleted = (e: any) => setCompleted(e.target.value);

  const onClickUpdate = () => alert("//Todo 更新API呼び出す！");

  const onClickDelete = () => alert("//Todo 削除API呼び出す！");

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
              <Input value={todo} onChange={onChangeTodo} />
            </FormControl>
            <FormControl>
              <FormLabel>Todo詳細</FormLabel>
              <Input value={todoDetail} onChange={onChangeTodoDetail} />
            </FormControl>
            <FormControl>
              <FormLabel>登録者</FormLabel>
              <Input value={todoInfo?.account_name} isReadOnly={true} />
            </FormControl>
            <FormControl>
              <Checkbox
                size="md"
                colorScheme="green"
                value={todoInfo?.id}
                isChecked={completed}
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
          >
            削除
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});
