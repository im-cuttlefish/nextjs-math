import React, { FC, useMemo } from "react";
import Link from "next/link";
import { RefMeta, InternalRefMeta, Theme } from "../types";
import { mergeThemes } from "./mergeThemes";
import { mergeClassName } from "./mergeClassName";

interface Props {
  id: string;
  prefix: string;
  refMeta: RefMeta;
  name?: boolean;
  theme?: Theme | Theme[];
  className?: string;
}

export const RefRenderer: FC<Props> = ({
  id,
  prefix,
  refMeta,
  name,
  theme = {},
  className,
}) => {
  const { refLink, refInternalLink, refExternalLink } = useMemo(
    () => mergeThemes(theme),
    [theme]
  );

  if (refMeta.isExternal) {
    const external = mergeClassName(refLink, refExternalLink, className);
    const { path, name } = refMeta;
    const isFullPath = /^(https?:)?\/\//.test(path);

    if (isFullPath) {
      return (
        <a href={path} className={external} data-mathdoc-id={id}>
          {name}
        </a>
      );
    }

    return (
      <Link href={path}>
        <a className={external} data-mathdoc-id={id}>
          {name}
        </a>
      </Link>
    );
  }

  const internal = mergeClassName(refLink, refInternalLink, className);
  const { counter, htmlId } = refMeta as InternalRefMeta;

  if (name) {
    return (
      <Link href={`#${htmlId}`}>
        <a className={internal} data-mathdoc-id={id}>{`${refMeta.name}`}</a>
      </Link>
    );
  }

  return (
    <Link href={`#${htmlId}`}>
      <a className={internal} data-mathdoc-id={id}>{`${prefix}${counter}`}</a>
    </Link>
  );
};
