import { useMemo } from "react";
import { MathdocEnvironment } from "./types";
import { createMathdoc } from "./createMathdoc";

export const useMathdoc = <T extends MathdocEnvironment>(arg: T) =>
  useMemo(() => createMathdoc(arg), [arg]);
