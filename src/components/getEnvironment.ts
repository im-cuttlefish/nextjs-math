import { createProof, theme } from "./math";
import { createTheorem } from "./math";

export const getEnvironment = () => ({
  Theorem: createTheorem("定理", {
    theme: theme.line,
  }),

  Definition: createTheorem("定義", {
    theme: theme.line,
  }),

  Proof: createProof({
    startMark: "証明",
    endMark: "Q.E.D.",
    theme: theme.line,
  }),
});
