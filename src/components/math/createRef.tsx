import React, { FC } from "react";
import Link from "next/link";
import { RefMeta, InternalRefMeta } from "./types";
import { useForceUpdate } from "./internal";

interface Props {
  id: string;
  name?: boolean;
}

type Ref = FC<Props> & {
  [key: string]: ((refMeta: RefMeta) => void) | undefined;
};

export const createRef = (
  prefix: string,
  external?: { [id: string]: [string, string] }
) => {
  const updaterSet = new Set<() => void>();
  const metaMap = new Map<string | number | symbol, RefMeta>();

  if (external) {
    for (const [id, [name, path]] of Object.entries(external)) {
      metaMap.set(id, { isExternal: true, name, path });
    }
  }

  const Ref: FC<Props> = ({ id, name: nameFlag = false }) => {
    const refMeta = metaMap.get(id);
    const updater = useForceUpdate();

    updaterSet.add(updater);

    if (!refMeta) {
      return (
        <span
          style={{ color: "red" }}
        >{`[Error: "${id}" is not registered.]`}</span>
      );
    }

    if (refMeta.isExternal) {
      const { path, name } = refMeta;
      const isFullPath = /^(https?:)?\/\//.test(path);

      if (isFullPath) {
        return <a href={path}>{name}</a>;
      }

      return (
        <Link href={path}>
          <a>{name}</a>
        </Link>
      );
    }

    const { name, counter, htmlId } = refMeta as InternalRefMeta;

    if (nameFlag) {
      return (
        <Link href={`#${htmlId}`}>
          <a>{`${name}`}</a>
        </Link>
      );
    }

    return (
      <Link href={`#${htmlId}`}>
        <a>{`${prefix}${counter}`}</a>
      </Link>
    );
  };

  const proxy = new Proxy(Ref, {
    get: (target, key) => {
      if (typeof key !== "string" || key.slice(0, 1) !== "$") {
        return Reflect.get(target, key);
      }

      return (refMeta: RefMeta) => {
        metaMap.set(key, refMeta);
        updaterSet.forEach((x) => x());
      };
    },
  });

  return proxy as Ref;
};
