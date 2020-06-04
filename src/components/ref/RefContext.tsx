import { createContext } from "react";
import { RefEnvironment } from "./types";

const initialValue: RefEnvironment = {
  registerRef: () => null,
  registerNameSpace: () => null,
  refs: {},
};

export const RefContext = createContext(initialValue);
