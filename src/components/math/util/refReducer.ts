import { RefMeta } from "../types";

type State = { [x in string]?: RefMeta };

type Action =
  | { type: "register_ref"; id: string; refMeta: RefMeta }
  | { type: "unregister_ref"; id: string };

export const refReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "register_ref":
      return { ...state, [action.id]: action.refMeta };
    case "unregister_ref": {
      const next = { ...state };
      delete next[action.id];
      return next;
    }
  }
};
