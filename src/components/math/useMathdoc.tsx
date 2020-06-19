import React, { useMemo, FC, useCallback } from "react";
import { createRef } from "./createRef";
import { createTheorem } from "./createTheorem";
import { createProof } from "./createProof";
import { createQuestion } from "./createQuestion";
import { createAnswer } from "./createAnswer";
import { MathdocRules, MathdocEnvironment, Creater } from "./types";
import { $provider } from "./util";

const createComponent = (arg: MathdocRules) => {
  switch (arg[0]) {
    case "ref":
      return createRef(arg[1]);
    case "theorem":
      return createTheorem(arg[1]);
    case "proof":
      return createProof(arg[1]);
    case "question":
      return createQuestion(arg[1]);
    case "answer":
      return createAnswer(arg[1]);
  }
};

export const useMathdoc = <T extends MathdocEnvironment>(arg: T) => {
  const map = useMemo(() => {
    const map = new Map<keyof T, ReturnType<Creater>>();

    Object.entries(arg).forEach(([key, value]) => {
      if (!value) {
        throw new Error("next-mathdoc: Don't specify undefind explicitly.");
      }

      map.set(key, Array.isArray(value) ? createComponent(value) : value);
    });

    return map;
  }, [arg]);

  const components = useMemo(() => {
    return [...map.entries()].reduce(
      (prev, [key, value]) => ({ ...prev, [key]: value.Component }),
      {}
    );
  }, [map]) as { [x in keyof T]: FC };

  const Provider: FC = useCallback(
    ({ children }) =>
      [...map.values()]
        .filter((x): x is Required<ReturnType<Creater>> => $provider in x)
        .reduce((tree, x) => {
          const Provider = x[$provider];
          return <Provider>{tree}</Provider>;
        }, <>{children}</>),
    [map]
  );

  return [components, Provider] as const;
};
