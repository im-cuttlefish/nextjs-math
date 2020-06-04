import React, { FC, useContext } from "react";
import Link from "next/link";
import { RefContext } from "./RefContext";

interface Props {
  ref: string;
}

export const Nameref: FC<Props> = ({ ref, children }) => {
  const { refs } = useContext(RefContext);
  const [namespace, label] = ref.split(":");

  const refMap = refs?.[namespace];

  if (!refMap) {
    return;
  }

  const { prefix, contents } = refMap;
  const refMeta = contents?.[label];

  if (!refMeta) {
    return;
  }

  if (refMeta.isExternal) {
    const { name, path } = refMeta;
    return <Link href={path}>{name}</Link>;
  }
};
