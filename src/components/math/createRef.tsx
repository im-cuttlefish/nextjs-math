import React, {
  FC,
  useEffect,
  useContext,
  createContext,
  useReducer,
  useMemo,
} from "react";
import { RefContext, RefRenderer, refReducer, $provider } from "./util";
import { Theme, Creater, RefMeta } from "./types";

interface Arguments {
  prefix: string;
  theme?: Theme | Theme[];
}

interface Props {
  label?: string;
  use?: string;
  name?: boolean;
  external?: { [id in string]?: [string, string] };
  className?: string;
}

interface RefMapContext {
  refMap: { [x in string]?: RefMeta };
  registerRefMeta: (x: string, y: RefMeta) => void;
  unregisterRefMeta: (x: string) => void;
}

const initialValue: RefMapContext = {
  refMap: {},
  registerRefMeta: () => null,
  unregisterRefMeta: () => null,
};

export const createRef: Creater<Arguments> = ({ prefix, theme = {} }) => {
  const RefMapContext = createContext(initialValue);

  const Ref: FC<Props> = ({ label, use, external, name, className }) => {
    const fromParent = useContext(RefContext);
    const { refMap, registerRefMeta, unregisterRefMeta } = useContext(
      RefMapContext
    );

    useEffect(() => {
      if (label && fromParent) {
        registerRefMeta(label, fromParent);
        return () => {
          unregisterRefMeta(label);
        };
      }

      if (external) {
        for (const [id, value] of Object.entries(external)) {
          const [name, path] = value as [string, string];
          registerRefMeta(id, { isExternal: true, name, path });
        }

        return () => {
          for (const id of Object.keys(external)) {
            unregisterRefMeta(id);
          }
        };
      }
    }, []);

    if (external || label) {
      return null;
    }

    const refMeta = use && refMap[use];

    if (!refMeta) {
      return (
        <span
          style={{ color: "red" }}
        >{`[Error: "${use}" is not registered.]`}</span>
      );
    }

    return <RefRenderer {...{ prefix, refMeta, name, theme, className }} />;
  };

  const Provider: FC = ({ children }) => {
    const [refMap, dispatch] = useReducer(refReducer, {});
    const value: RefMapContext = useMemo(
      () => ({
        refMap,
        registerRefMeta: (id, refMeta) => {
          dispatch({ type: "register_ref", id, refMeta });
        },
        unregisterRefMeta: (id) => {
          dispatch({ type: "unregister_ref", id });
        },
      }),
      [refMap]
    );

    return (
      <RefMapContext.Provider value={value}>{children}</RefMapContext.Provider>
    );
  };

  return { Component: Ref, [$provider]: Provider };
};
