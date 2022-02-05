import { memo, ReactNode, VFC } from "react";
import { Button, ButtonProps } from "@chakra-ui/react";
import React from "react";

export const PrimaryButton: VFC<ButtonProps> = memo((props) => {
  const { children, disabled = false, isLoading = false } = props;
  return (
    <Button
      bg="teal.400"
      color="white"
      _hover={{ opacity: 0.8 }}
      disabled={disabled || isLoading}
      isLoading={isLoading}
      {...props}
    >
      {children}
    </Button>
  );
});
