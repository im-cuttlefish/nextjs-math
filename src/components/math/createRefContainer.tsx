import React, { FC } from "react";
import { createCounter, RefContext } from "./internal";
import { InternalRefMeta } from "./types";

interface Props {
  name?: string;
}

export const createRefContainer = (id: string) => {
  const encoded = encodeURIComponent(id);
  const useCounter = createCounter();

  const Container: FC<Props> = ({ name = "", children }) => {
    const counter = useCounter();
    const htmlId = `ref-${encoded}-${counter}`;
    const refMeta: InternalRefMeta = { isExternal: false, htmlId, counter };
    name && (refMeta.name = name);

    return (
      <div id={htmlId} style={{ display: "contents" }}>
        <RefContext.Provider value={refMeta}>{children}</RefContext.Provider>
      </div>
    );
  };

  return Container;
};
