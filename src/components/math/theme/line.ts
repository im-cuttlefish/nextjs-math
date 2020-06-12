import { Theme } from "../types";

export const line: Readonly<Theme> = {
  theorem: {
    container: {
      margin: "1rem 0",
      borderLeft: "solid 1px #000",
    },
    title: {
      padding: "0 0.7rem",
      fontSize: "1.3rem",
      borderBottom: "solid 1px #000",
    },
    content: {
      padding: "0.7rem",
    },
  },
  proof: {
    container: {
      margin: "1rem 0",
    },
  },
};
