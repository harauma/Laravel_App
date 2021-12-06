import { memo, ReactNode, VFC } from "react";
import { Button } from "@chakra-ui/react";
import React from "react";

type Props = {
  children: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  mr?: string;
  onClick: () => void;
};

export const PrimaryButton: VFC<Props> = memo((props) => {
  const { children, disabled = false, loading = false, mr, onClick } = props;
  return (
    <Button
      bg="teal.400"
      color="white"
      mr={mr}
      _hover={{ opacity: 0.8 }}
      disabled={disabled || loading}
      isLoading={loading}
      onClick={onClick}
    >
      {children}
    </Button>
  );
});
