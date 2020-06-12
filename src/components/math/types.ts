import { CSSProperties } from "react";

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

// Proof
export interface ProofMark {
  start: string;
  end: string;
}

// Theme
export type Style<T extends string = string> = { [key in T]?: CSSProperties };

export type StyleWithTheme<T extends Style> = T & { theme?: Theme };

export type TheoremStyle = Style<"container" | "title" | "content">;

export type ProofStyle = Style<"container" | "start" | "end">;

export interface Theme {
  theorem?: TheoremStyle;
  proof?: ProofStyle;
}
