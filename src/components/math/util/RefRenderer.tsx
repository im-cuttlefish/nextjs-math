import React, { FC } from "react";
import Link from "next/link";
import { RefMeta, InternalRefMeta, Theme } from "../types";
import { mergeThemes } from "./mergeThemes";
import { mergeClassName } from "./mergeClassName";

interface Props {
  prefix: string;
  refMeta: RefMeta;
  name?: boolean;
  theme?: Theme | Theme[];
  className?: string;
}

export const RefRenderer: FC<Props> = ({
  prefix,
  refMeta,
  name,
  theme = {},
  className,
}) => {
  const { refLink } = mergeThemes(theme);
  const style = mergeClassName(refLink, className);

  if (refMeta.isExternal) {
    const { path, name } = refMeta;
    const isFullPath = /^(https?:)?\/\//.test(path);

    if (isFullPath) {
      return (
        <a href={path} className={style} data-external>
          {name}
        </a>
      );
    }

    return (
      <Link href={path}>
        <a className={style} data-external>
          {name}
        </a>
      </Link>
    );
  }

  const { counter, htmlId } = refMeta as InternalRefMeta;

  if (name) {
    return (
      <Link href={`#${htmlId}`}>
        <a className={style} data-internal>{`${refMeta.name}`}</a>
      </Link>
    );
  }

  return (
    <Link href={`#${htmlId}`}>
      <a className={style} data-internal>{`${prefix}${counter}`}</a>
    </Link>
  );
};
