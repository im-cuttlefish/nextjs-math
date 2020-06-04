interface InternalRefMeta {
  isExternal: false;
  htmlId: string;
  counter: number;
  name?: string;
}

interface ExternalRefMeta {
  isExternal: true;
  htmlId: string;
  path: string;
  name: string;
}

export type RefMeta = InternalRefMeta | ExternalRefMeta;

export interface RefStore {
  [namespace: string]: {
    prefix: string;
    contents: {
      [label: string]: RefMeta;
    };
  };
}

export type NameSpaceRegister = (namespace: string, prefix?: string) => void;

export type RefRegister = (
  namespace: string,
  label: string,
  refMeta: RefMeta
) => void;

export interface RefEnvironment {
  registerRef: RefRegister;
  registerNameSpace: NameSpaceRegister;
  refs: RefStore;
}
