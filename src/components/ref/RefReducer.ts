import { RefStore, RefMeta } from "./types";

type Action =
  | {
      type: "register-ref";
      namespace: string;
      label: string;
      refMeta: RefMeta;
    }
  | {
      type: "register-namespace";
      namespace: string;
      prefix: string;
    };

export const RefReducer = (state: RefStore, action: Action): RefStore => {
  switch (action.type) {
    case "register-namespace": {
      const { namespace, prefix } = action;

      return {
        ...state,
        [namespace]: {
          prefix,
          contents: {},
        },
      };
    }

    case "register-ref": {
      const { namespace, label, refMeta } = action;

      if (!(namespace in state)) {
        return;
      }

      const { prefix, contents } = state[namespace];

      return {
        ...state,
        [namespace]: {
          prefix,
          contents: {
            ...contents,
            [label]: refMeta,
          },
        },
      };
    }
  }
};
