import { CSSProperties } from "react";

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

export interface Theme {
  container?: CSSProperties;
  title?: CSSProperties;
  content?: CSSProperties;
}

export type RefMeta = InternalRefMeta | ExternalRefMeta;
