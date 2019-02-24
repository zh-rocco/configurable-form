export function stringify(input: object): string {
  return JSON.stringify(input);
}

export function parse(input: string): object {
  return JSON.parse(input);
}

export function clone(obj: object): object {
  return parse(stringify(obj));
}
