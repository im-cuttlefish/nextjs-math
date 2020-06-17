import { useRef, useState, useEffect } from "react";

export const createCounter = () => {
  const symbolSet = new Set<symbol>();

  const useCounter = () => {
    const [counter, setCounter] = useState(0);
    const symbol = useRef(Symbol()).current;

    if (!symbolSet.has(symbol)) {
      symbolSet.add(symbol);
      setCounter(symbolSet.size);
    }

    useEffect(() => {
      return () => symbolSet.delete(symbol);
    }, []);

    return counter;
  };

  return useCounter;
};
