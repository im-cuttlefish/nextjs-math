import { StyleWithTheme, Theme } from "../types";
import { initial } from "../theme/initial";

const merge = <T extends keyof Theme>(
  type: T,
  style: Theme[T],
  ...themes: Theme[]
) => {
  const appliedStyle = { ...style };

  for (const theme of themes) {
    if (!theme[type]) {
      continue;
    }

    for (const [key, value] of Object.entries(theme[type])) {
      Reflect.set(appliedStyle, key, {
        ...appliedStyle[key],
        ...value,
        ...style[key],
      });
    }
  }

  return appliedStyle;
};

export const applyTheme = <T extends keyof Theme>(
  type: T,
  style: StyleWithTheme<Theme[T]>
) => merge(type, style, initial, style.theme);
