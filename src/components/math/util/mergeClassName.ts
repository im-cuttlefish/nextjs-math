export const mergeClassName = (...classNames: (string | undefined)[]) =>
  classNames.filter((x) => !!x).join(" ");
