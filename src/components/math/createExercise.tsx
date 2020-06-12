import React, { createContext, FC, useContext, ReactElement } from "react";

interface ProblemContext {
  registerAnswer: (x: ReactElement) => void;
}

const problemContext = createContext<ProblemContext>({
  registerAnswer: () => null,
});

export const createExercise = (prefix: string) => {
  const Question: FC = () => {};
  const Answer: FC = () => {};
};
