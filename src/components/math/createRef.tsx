import React, { FC, useEffect, useContext } from "react";
import { useForceUpdate, RefContext, RefRenderer, RefMap } from "./util";
import { Theme, Creater } from "./types";

interface Arguments {
  prefix: string;
  theme?: Theme | Theme[];
}

interface Props {
  label?: string;
  use?: string;
  name?: boolean;
  external?: { [id in string]?: [string, string] };
}

export const createRef: Creater<Arguments> = ({ prefix, theme = {} }) => {
  const updaterSet = new Set<() => void>();
  const refMap = new RefMap();

  const Ref: FC<Props> = ({ label, use, external, name }) => {
    const fromParent = useContext(RefContext);
    const update = useForceUpdate();

    updaterSet.add(update);

    useEffect(() => {
      if (label && fromParent) {
        refMap.set(label, fromParent);
        updaterSet.forEach((x) => x());
        return () => refMap.delete(label);
      }

      if (external) {
        refMap.registerExternal(external);
        updaterSet.forEach((x) => x());
        return () => refMap.unregisterExternal(external);
      }

      return () => updaterSet.delete(update);
    }, []);

    if (external || label) {
      return null;
    }

    const refMeta = use && refMap.get(use);

    if (!refMeta) {
      return (
        <span
          style={{ color: "red" }}
        >{`[Error: "${use}" is not registered.]`}</span>
      );
    }

    return <RefRenderer {...{ prefix, refMeta, name, theme }} />;
  };

  return Ref;
};
