import React from "react";
import { memo, ReactNode, VFC } from "react";

import { Header } from "../organisms/layout/Header";

type Props = {
  Children: ReactNode;
};

export const HeaderLayout: VFC<Props> = memo((props) => {
  const { Children } = props;
  return (
    <>
      <Header />
      {Children}
    </>
  );
});
