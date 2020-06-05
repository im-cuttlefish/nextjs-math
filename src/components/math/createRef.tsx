import React, { FC } from "react";
import Link from "next/link";
import { RefMeta, InternalRefMeta } from "./types";

interface Props {
  id: string;
  name?: boolean;
}

type Ref = FC<Props> & {
  [key: string]: (refMeta: RefMeta) => void;
};

export const createRef = (
  prefix: string,
  external?: { [id: string]: [string, string] }
) => {
  const metaMap = new Map<string | number | symbol, RefMeta>();

  if (external) {
    for (const [id, [name, path]] of Object.entries(external)) {
      metaMap.set(id, { isExternal: true, name, path });
    }
  }

  const Ref: FC<Props> = ({ id, name: nameFlag = false }) => {
    const refMeta = metaMap.get(id);

    if (refMeta.isExternal) {
      const { path, name } = refMeta;
      const isFullPath = /^(https?:)?\/\//.test(path);

      if (isFullPath) {
        return <a href={path}>{name}</a>;
      }

      return <Link href={path}>{name}</Link>;
    }

    const { name, counter, htmlId } = refMeta as InternalRefMeta;

    if (nameFlag) {
      return <Link href={`#${htmlId}`}>{`${name}`}</Link>;
    }

    return <Link href={`#${htmlId}`}>{`${prefix}${counter}`}</Link>;
  };

  const proxy = new Proxy(Ref, {
    get: (target, prop) => {
      if (typeof prop !== "string" || prop.slice(0, 1) !== "$") {
        return Reflect.get(target, prop);
      }

      return (refMeta: RefMeta) => {
        metaMap.set(prop, refMeta);
      };
    },
  });

  return proxy as Ref;
};
