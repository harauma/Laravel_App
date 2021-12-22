import React from "react";
import { memo, useCallback, useEffect, VFC } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Heading,
  Link,
  useDisclosure,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

import { MenuIconButton } from "../../atoms/button/MenuIconButton";
import { MenuDrawer } from "../../molcules/MenuDrawer";
import { useLoginAccount } from "../../../hooks/useLoginAccount";
import { useMessage } from "../../../hooks/useMessage";
import { isNil } from "lodash";

export const Header: VFC = memo(() => {
  const { loginAccount, setLoginAccount } = useLoginAccount();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();
  const { showMessage } = useMessage();

  const onClickTodoList = useCallback(() => history.push("/home"), []);
  const onClickUserManagement = useCallback(
    () => history.push("/home/user_management"),
    []
  );
  const onClickTagSetting = useCallback(
    () => window.location.href = "/tag-setting",
    []
  );
  const onClickLogout = useCallback(() => {
    setLoginAccount(undefined);
    history.push("/login");
  }, []);
  const onClickUserSetting = useCallback(() => {
    showMessage({ title: "未実装です😢", status: "error" });
  }, []);

  useEffect(() => {
    if (isNil(sessionStorage.user_id)) {
      showMessage({ title: "ログインしてください", status: "error" });
      history.push("/login");
    }
  }, []);

  return (
    <>
      <Flex
        as="nav"
        bg="teal.500"
        color="gray.50"
        align="center"
        justify="space-between"
        padding={{ base: 3, md: 5 }}
      >
        <Flex
          align="center"
          as="a"
          mr={8}
          _hover={{ cursor: "pointer" }}
          onClick={onClickTodoList}
        >
          <Heading as="h1" fontSize={{ base: "md", md: "lg" }}>
            Todo管理アプリ
          </Heading>
        </Flex>
        <Flex
          align="center"
          fontSize="sm"
          flexGrow={2}
          display={{ base: "none", md: "flex" }}
        >
          <Box pr={4}>
            <Link onClick={onClickTodoList}>Todo一覧</Link>
          </Box>
          <Box pr={4}>
            <Link onClick={onClickUserManagement}>ユーザー一覧</Link>
          </Box>
          <Box pr={4}>
            <Link onClick={onClickTagSetting}>タグ設定</Link>
          </Box>
        </Flex>
        <Flex
          align="right"
          fontSize="sm"
          flexGrow={2}
          justify="right"
          display={{ base: "none", md: "flex" }}
        >
          <Box pr={4}>
            <Accordion allowToggle size="sm">
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      {`ログインユーザー：${
                        loginAccount?.name || "未ログイン"
                      }`}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Link onClick={onClickUserSetting}>ユーザー設定</Link>
                </AccordionPanel>
                <AccordionPanel pb={4}>
            <Link onClick={onClickLogout}>ログアウト</Link>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>
        </Flex>
        <MenuIconButton onOpen={onOpen} />
      </Flex>
      <MenuDrawer
        onClose={onClose}
        isOpen={isOpen}
        onClickTodoList={onClickTodoList}
        onClickUserManagement={onClickUserManagement}
        onClickTagSetting={onClickTagSetting}
        onClickUserSetting={onClickUserSetting}
        onClickLogout={onClickLogout}
      />
    </>
  );
});
