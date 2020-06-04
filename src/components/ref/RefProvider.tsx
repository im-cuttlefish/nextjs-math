import React, { FC, useReducer } from "react";
import { RefContext } from "./RefContext";
import { RefRegister, RefEnvironment, NameSpaceRegister } from "./types";
import { RefReducer } from "./RefReducer";

export const RefProvider: FC = ({ children }) => {
  const [refs, setRef] = useReducer(RefReducer, {});

  const registerNameSpace: NameSpaceRegister = (namespace, prefix) => {
    setRef({
      type: "register-namespace",
      namespace,
      prefix,
    });
  };

  const registerRef: RefRegister = (namespace, label, refMeta) => {
    setRef({
      type: "register-ref",
      namespace,
      label,
      refMeta,
    });
  };

  const store: RefEnvironment = {
    registerNameSpace,
    registerRef,
    refs,
  };

  return <RefContext.Provider value={store}>{children}</RefContext.Provider>;
};
