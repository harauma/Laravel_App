import React from "react";
import { ChangeEvent, memo, useCallback, useState, VFC } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { useCreateAccount } from "../../hooks/useCreateAccount";
import { Account } from "../../types/api/account";
import { useHistory } from "react-router-dom";

export const Signup: VFC = memo(() => {
  const history = useHistory();
  const { createAccount, loading } = useCreateAccount();
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);
  const onClickSubmit = () => {
    const account: Account = {
      login_id: userId,
      name: userName,
      password: password,
    };
    createAccount(account);
  };
  const onClickGotoLogin = useCallback(() => history.push("login"), []);
  const onChangeUserId = (e: ChangeEvent<HTMLInputElement>) =>
    setUserId(e.target.value);
  const onChangeUserName = (e: ChangeEvent<HTMLInputElement>) =>
    setUserName(e.target.value);
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);
  return (
    <Flex align="center" justify="center" height="80vh">
      <Box bg="white" w="lg" p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">
          新規登録
        </Heading>
        <Divider my={4} />
        <Stack spacing={6} py={4} px={10}>
          <FormControl id="userId" isRequired>
            <FormLabel>ユーザID</FormLabel>
            <Input
              isRequired={true}
              placeholder="ユーザID"
              value={userId}
              onChange={onChangeUserId}
            />
          </FormControl>
          <FormControl id="userName" isRequired>
            <FormLabel>ユーザ名</FormLabel>
            <Input
              isRequired={true}
              placeholder="ユーザ名"
              value={userName}
              onChange={onChangeUserName}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>パスワード</FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                isRequired={true}
                placeholder="パスワード"
                value={password}
                onChange={onChangePassword}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "非表示" : "表示"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <PrimaryButton
            disabled={userId === "" || userName === "" || password === ""}
            isLoading={loading}
            onClick={onClickSubmit}
          >
            新規登録
          </PrimaryButton>
          <Text align="center">
            <Link color="teal.500" onClick={onClickGotoLogin}>
              ログイン
            </Link>
          </Text>
        </Stack>
      </Box>
    </Flex>
  );
});
