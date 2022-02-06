import React from "react";
import {
  ChangeEvent,
  KeyboardEvent,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  VFC,
} from "react";
import { useHistory } from "react-router-dom";
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
import { useAuth } from "../../hooks/useAuth";
import { useMessage } from "../../hooks/useMessage";
import { isNil } from "lodash";

export const Login: VFC = memo(() => {
  const history = useHistory();
  const { login, loading } = useAuth();
  const { showMessage } = useMessage();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const passwordElement = useRef<HTMLInputElement>(null);

  const handleClick = () => setShow(!show);
  const onClickLogin = () => login(userId, password);
  const onClickGotoSignup = useCallback(() => history.push("signup"), []);

  const onChangeUserId = (e: ChangeEvent<HTMLInputElement>) =>
    setUserId(e.target.value);

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const onKeyPressInput = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      passwordElement.current?.focus();
      const element = e.target as HTMLElement;
      switch (element.id) {
        case "userId":
          passwordElement.current?.focus();
          break;
        case "password":
          if (canLogin()) {
            login(userId, password);
          }
          break;
        default:
          break;
      }
    }
  };

  const canLogin = (): boolean => {
    return userId !== "" && password !== "";
  };

  useEffect(() => {
    if (!isNil(sessionStorage.user_id)) {
      showMessage({ title: "ログイン済みです", status: "success" });
      history.push("home");
    }
  }, []);
  return (
    <Flex align="center" justify="center" height="80vh">
      <Box bg="white" w="lg" p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">
          ログイン
        </Heading>
        <Divider my={4} />
        <Stack spacing={6} py={4} px={10}>
          <FormControl id="userId">
            <FormLabel>ユーザID</FormLabel>
            <Input
              isRequired={true}
              placeholder="ユーザID"
              value={userId}
              onChange={onChangeUserId}
              onKeyPress={onKeyPressInput}
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>パスワード</FormLabel>
            <InputGroup size="md">
              <Input
                ref={passwordElement}
                pr="4.5rem"
                type={show ? "text" : "password"}
                isRequired={true}
                placeholder="パスワード"
                value={password}
                onChange={onChangePassword}
                onKeyPress={onKeyPressInput}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "非表示" : "表示"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <PrimaryButton
            disabled={!canLogin()}
            isLoading={loading}
            onClick={onClickLogin}
          >
            ログイン
          </PrimaryButton>
          <Text align="center">
            <Link color="teal.500" onClick={onClickGotoSignup}>
              アカウント新規登録
            </Link>
          </Text>
        </Stack>
      </Box>
    </Flex>
  );
});
