import { ChangeEvent, memo, useState, VFC } from "react";
import { Box, Divider, Flex, Heading, Input, Stack } from "@chakra-ui/react";
import React from "react";

export const Login: VFC = memo(() => {
  return (
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">
          ユーザー管理アプリ
        </Heading>
        <Divider my={4} />
        <Stack spacing={6} py={4} px={10}>
          <Input
            placeholder="ユーザID"
            // value={userId}
            // onChange={onChangeUserId}
          />
          {/* <PrimaryButton
            disabled={userId === ""}
            loading={loading}
            onClick={onClickLogin}
          > */}
            {/* ログイン */}
          {/* </PrimaryButton> */}
        </Stack>
      </Box>
    </Flex>
  );
});