import React, { FC } from "react";
import Link from "next/link";
import { RefMeta, InternalRefMeta, Theme } from "../types";
import { mergeThemes } from "./mergeThemes";

interface Props {
  prefix: string;
  refMeta: RefMeta;
  name?: boolean;
  theme?: Theme | Theme[];
}

export const RefRenderer: FC<Props> = ({
  prefix,
  refMeta,
  name,
  theme = {},
}) => {
  const { refLink } = mergeThemes(theme);

  if (refMeta.isExternal) {
    const { path, name } = refMeta;
    const isFullPath = /^(https?:)?\/\//.test(path);

    if (isFullPath) {
      return (
        <a href={path} className={refLink} data-external>
          {name}
        </a>
      );
    }

    return (
      <Link href={path}>
        <a className={refLink} data-external>
          {name}
        </a>
      </Link>
    );
  }

  const { counter, htmlId } = refMeta as InternalRefMeta;

  if (name) {
    return (
      <Link href={`#${htmlId}`}>
        <a className={refLink} data-internal>{`${refMeta.name}`}</a>
      </Link>
    );
  }

  return (
    <Link href={`#${htmlId}`}>
      <a className={refLink} data-internal>{`${prefix}${counter}`}</a>
    </Link>
  );
};
