import { useRef, useState } from "react";

export const createCounter = () => {
  const symbolSet = new Set<symbol>();

  const useCounter = () => {
    const [counter, setCounter] = useState(0);
    const symbol = useRef(Symbol()).current;

    // useEffectの呼び出しに順序保証があればそれで置き換えてよい。
    if (!symbolSet.has(symbol)) {
      symbolSet.add(symbol);
      setCounter(symbolSet.size);
    }

    return counter;
  };

  return useCounter;
};
