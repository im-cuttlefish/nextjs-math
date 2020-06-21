import React, { FC } from "react";
import { createCounter, RefContext } from "./util";
import { InternalRefMeta, Creater } from "./types";

interface Arguments {
  id: string;
}

interface Props {
  name?: string;
}

export const createRefContainer: Creater<Arguments> = ({ id }) => {
  const encoded = encodeURIComponent(id);
  const useCounter = createCounter();

  const Container: FC<Props> = ({ name = "", children }) => {
    const counter = useCounter();
    const htmlId = `mathdoc-${encoded}-${counter}`;
    const refMeta: InternalRefMeta = { isExternal: false, htmlId, counter };
    name && (refMeta.name = name);

    return (
      <div id={htmlId} style={{ display: "contents" }} data-mathdoc-id={id}>
        <RefContext.Provider value={refMeta}>{children}</RefContext.Provider>
      </div>
    );
  };

  return { Component: Container };
};
