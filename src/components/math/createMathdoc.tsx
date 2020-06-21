import React, { FC } from "react";
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

export const createMathdoc = <T extends MathdocEnvironment>(arg: T) => {
  const map = new Map<keyof T, ReturnType<Creater>>();

  Object.entries(arg).forEach(([key, value]) => {
    if (!value) {
      throw new Error("next-mathdoc: Don't specify undefind explicitly.");
    }

    map.set(key, Array.isArray(value) ? createComponent(value) : value);
  });

  const components = [...map.entries()].reduce(
    (prev, [key, value]) => ({ ...prev, [key]: value.Component }),
    {}
  ) as { [x in keyof T]: FC };

  const Provider: FC = ({ children }) =>
    [...map.values()]
      .filter((x): x is Required<ReturnType<Creater>> => $provider in x)
      .reduce((tree, x) => {
        const Provider = x[$provider];
        return <Provider>{tree}</Provider>;
      }, <>{children}</>);

  return [components, Provider] as const;
};
