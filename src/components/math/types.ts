import { ReactNode } from "react";

// Ref
export interface InternalRefMeta {
  isExternal: false;
  htmlId: string;
  counter: number;
  name?: string;
}

export interface ExternalRefMeta {
  isExternal: true;
  path: string;
  name: string;
}

export type RefMeta = InternalRefMeta | ExternalRefMeta;

// Exercise
export interface ExerciseStore {
  counter: number;
}

// Theme
type Ref = "refLink";

type Theorem = "theoremContainer" | "theoremTitle" | "theoremContent";

type Proof = "proofContainer" | "proofStartMark" | "proofEndMark";

type Question = "questionContainer" | "questionTitle";

type Answer = "answerContainer" | "answerTitle";

type ClassName = Ref | Theorem | Proof | Question | Answer;

export type Theme = { [key in ClassName]?: string };
