import { isFunction } from 'lodash';

const FUNCTION_STR_REG = /^(async)?(\s+)?function\s+\w*\s*\((\s*\w\s*,?\s*)*\)\s*{.*\n?.*\n?.*}$/;

function isFunctionStr(input: string) {
  return FUNCTION_STR_REG.test(input);
}

export function stringify(input: object, space: number = 2): string {
  return JSON.stringify(
    input,
    (k, v) => {
      if (isFunction(v)) {
        return v.toString().trim();
      }
      return v;
    },
    space,
  );
}

export function parse(input: string): object {
  return JSON.parse(input, (k, v) => {
    if (isFunctionStr(v)) {
      return new Function(`return ${v}`)(); // eslint-disable-line
    }
    return v;
  });
}
