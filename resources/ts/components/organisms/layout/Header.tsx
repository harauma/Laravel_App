import React from "react";
import { memo, useCallback, VFC } from "react";
import { Box, Flex, Heading, Link, useDisclosure } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

import { MenuIconButton } from "../../atoms/button/MenuIconButton";
import { MenuDrawer } from "../../molcules/MenuDrawer";

export const Header: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();

  const onClickTodoList = useCallback(() => history.push("/home"), []);
  const onClickUserManagement = useCallback(
    () => history.push("/home/user_management"),
    []
  );
  const onClickSetting = useCallback(() => history.push("/home/setting"), []);
  const onClickLogout = useCallback(() => history.push("/login"), []);

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
            Todoシェアリング
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
            <Link onClick={onClickSetting}>設定</Link>
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
            <Link onClick={onClickLogout}>ログアウト</Link>
          </Box>
        </Flex>
        <MenuIconButton onOpen={onOpen} />
      </Flex>
      <MenuDrawer
        onClose={onClose}
        isOpen={isOpen}
        onClickTodoList={onClickTodoList}
        onClickUserManagement={onClickUserManagement}
        onClickSetting={onClickSetting}
        onClickLogout={onClickLogout}
      />
    </>
  );
});
