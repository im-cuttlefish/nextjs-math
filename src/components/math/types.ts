import { FC } from "react";
import { createRef } from "./createRef";
import { createTheorem } from "./createTheorem";
import { createProof } from "./createProof";
import { createQuestion } from "./createQuestion";
import { createAnswer } from "./createAnswer";

// general
export type Creater<T> = (x: T) => FC | [FC, FC];

export type MathdocRules =
  | ["ref", Parameters<typeof createRef>[0]]
  | ["theorem", Parameters<typeof createTheorem>[0]]
  | ["proof", Parameters<typeof createProof>[0]]
  | ["question", Parameters<typeof createQuestion>[0]]
  | ["answer", Parameters<typeof createAnswer>[0]];

export type MathdocEnvironment = {
  [x in string]?: MathdocRules;
};

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
