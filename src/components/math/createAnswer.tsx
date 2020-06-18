import React, { FC, createContext, useContext, useRef, useEffect } from "react";
import { AnswerRenderer } from "./util";
import { Theme, Creater } from "./types";

interface Arguments {
  id: string;
  prefix: string;
  theme?: Theme | Theme[];
}

interface Props {
  print?: boolean;
  later?: boolean;
  name?: string;
  expansion?: boolean;
}

interface LaterContext {
  registerAnswer: (x: symbol, y: Props) => void;
  unregisterAnswer: (x: symbol) => void;
  answers: Map<symbol, Props>;
}

const initialValue: LaterContext = {
  registerAnswer: () => null,
  unregisterAnswer: () => null,
  answers: new Map(),
};

export const createAnswer: Creater<Arguments> = (arg) => {
  const Context = createContext(initialValue);

  const Answer: FC<Props> = (props) => {
    const context = useContext(Context);
    const symbol = useRef(Symbol()).current;
    const { print, later, children } = props;

    useEffect(() => {
      if (later) {
        context.registerAnswer(symbol, { ...props, later: false });
        return context.unregisterAnswer(symbol);
      }
    }, [props]);

    if (later) {
      return null;
    }

    if (print) {
      return <>{[...context.answers.values()]}</>;
    }

    return (
      <AnswerRenderer {...arg} {...props}>
        {children}
      </AnswerRenderer>
    );
  };

  return Answer;
};
