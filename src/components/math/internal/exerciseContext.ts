import { createContext } from "react";
import { ExerciseStore } from "../types";

const initialValue: ExerciseStore = {
  counter: 0,
};

export const ExerciseContext = createContext(initialValue);
