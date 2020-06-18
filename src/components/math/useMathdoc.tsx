import React, { useMemo, FC, useCallback } from "react";
import { createRef } from "./createRef";
import { createTheorem } from "./createTheorem";
import { createProof } from "./createProof";
import { createAnswer } from "./createAnswer";
import { MathdocRules, MathdocEnvironment } from "./types";

const createComponent = (arg: MathdocRules) => {
  switch (arg[0]) {
    case "ref":
      return createRef(arg[1]);
    case "theorem":
      return createTheorem(arg[1]);
    case "proof":
      return createProof(arg[1]);
    case "question":
      return createProof(arg[1]);
    case "answer":
      return createAnswer(arg[1]);
  }
};

export const useMathdoc = <T extends MathdocEnvironment>(arg: T) => {
  const map: { [x in string]?: FC | [FC, FC] } = useMemo(() => {
    return Object.entries(arg).reduce(
      (map, [key, value]) =>
        !value ? map : { ...map, [key]: createComponent(value) },
      {}
    );
  }, [arg]);

  const components = useMemo(() => {
    return Object.entries(map).reduce(
      (map, [key, value]) => ({
        ...map,
        [key]: Array.isArray(value) ? value[0] : value,
      }),
      {}
    );
  }, [map]) as { [x in keyof T]: FC };

  const Provider: FC = useCallback(
    ({ children }) =>
      Object.values(map)
        .filter((x): x is [FC, FC] => Array.isArray(x))
        .map((x) => x[1])
        .reduce((x, Provider) => <Provider>{x}</Provider>, <>{children}</>),
    [map]
  );

  return [components, Provider] as const;
};
