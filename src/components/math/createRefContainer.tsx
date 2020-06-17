import React, { FC, useMemo } from "react";
import { createCounter, RefContext } from "./internal";
import { InternalRefMeta } from "./types";

interface Props {
  name?: string;
}

export const createRefContainer = (prefix: string) => {
  const encodedPrefix = encodeURIComponent(prefix);
  const useCounter = createCounter();

  const Container: FC<Props> = ({ name = "", children }) => {
    const counter = useCounter();
    const htmlId = `ref-${encodedPrefix}-${counter}`;

    const refMeta = useMemo(() => {
      const refMeta: InternalRefMeta = { isExternal: false, htmlId, counter };
      name && (refMeta.name = name);
      return refMeta;
    }, []);

    return (
      <div id={htmlId} style={{ display: "contents" }}>
        <RefContext.Provider value={refMeta}>{children}</RefContext.Provider>
      </div>
    );
  };

  return Container;
};
