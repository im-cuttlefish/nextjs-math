import { initial } from "./initial";
import { line } from "./line";

const $theme = { initial, line };

export const theme: Readonly<typeof $theme> = $theme;
