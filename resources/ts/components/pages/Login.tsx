import React from "react";
import { ChangeEvent, memo, useState, VFC } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { useAuth } from "../../hooks/useAuth";

export const Login: VFC = memo(() => {
  const { login, loading } = useAuth();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = React.useState(false);

  const handleClick = () => setShow(!show);
  const onClickLogin = () => login(userId);
  const onChangeUserId = (e: ChangeEvent<HTMLInputElement>) =>
    setUserId(e.target.value);
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);
  return (
    <Flex align="center" justify="center" height="80vh">
      <Box bg="white" w="lg" p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">
          Todoシェアリング
        </Heading>
        <Divider my={4} />
        <Stack spacing={6} py={4} px={10}>
          <Input
            placeholder="ユーザID"
            value={userId}
            onChange={onChangeUserId}
          />
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
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
          <PrimaryButton
            disabled={userId === ""}
            loading={loading}
            onClick={onClickLogin}
          >
            ログイン
          </PrimaryButton>
        </Stack>
      </Box>
    </Flex>
  );
});
