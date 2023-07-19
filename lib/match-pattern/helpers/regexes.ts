export const anyPattern = /^_$/;
export const emptyPattern = /^\[\]$/;
export const headPattern = /^\[([_a-zA-Z$][\w$]*)\]$/;
export const headAndTailPattern =
  /^\[([_a-zA-Z$][\w$]+),\s+\.\.\.([_a-zA-Z$][\w$]*)\]$/;
export const lastPattern = /^\[\.\.\._,\s+([_a-zA-Z$][\w$]*)\]$/;
export const lastAndRestPattern =
  /^\[\.\.\.([_a-zA-Z$][\w$]*),\s+([_a-zA-Z$][\w$]*)\]$/;
export const literalPattern =
  /(^['"].*['"]$|^\-?\d+$|^\-?\d+n$|^true$|^false$|^null$|^undefined$)/;
export const binaryOperationPattern =
  /(^[_a-zA-Z$][\w$]*(?:\.[_a-zA-Z$][\w$]*|\[(?:".*"|\d+)\])?)\s+([<>]|<=|>=|==|===|!=)\s+(.*)/;
export const truthyPattern = /^\?$/;
export const falsyPattern = /^!$/;
export const existPattern = /^\?\?$/;
export const regexPattern = /^\/((?:\\\/|[^\/])+)\/([gimsuy]*)$/;
export const objectPropertyPattern =
  /^{\s*([_a-zA-Z$][\w$]*|\[".+"\]|\[.+\])\s*}$/;
export const objectPropertiesPattern =
  /^{\s*([_a-zA-Z$][\w$]*|\[".+"\]|\[.+\]),\s*\.\.\.([_a-zA-Z$][\w$]*)\s*}$/;
