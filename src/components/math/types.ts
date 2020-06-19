/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { createRef } from "./createRef";
import { createTheorem } from "./createTheorem";
import { createProof } from "./createProof";
import { createQuestion } from "./createQuestion";
import { createAnswer } from "./createAnswer";
import { $provider } from "./util";

// general
export type Creater<T = any> = (
  x: T
) => { Component: FC<any>; [$provider]?: FC<any> };

export type PickArguments<T extends Creater> = Readonly<Parameters<T>>[0];

export type MathdocRules =
  | ["ref", PickArguments<typeof createRef>]
  | ["theorem", PickArguments<typeof createTheorem>]
  | ["proof", PickArguments<typeof createProof>]
  | ["question", PickArguments<typeof createQuestion>]
  | ["answer", PickArguments<typeof createAnswer>];

export type MathdocEnvironment = Readonly<
  {
    [x in string]?: MathdocRules | ReturnType<Creater>;
  }
>;

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
