import { createContext } from "react";
import { InternalRefMeta } from "../types";

export const RefContext = createContext<InternalRefMeta | null>(null);
