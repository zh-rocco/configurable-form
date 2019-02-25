export function transform(script: string) {
  script = window.Babel.transform(script, {
    presets: [['env', { loose: true }]],
    // plugins: [],
    comments: false,
  }).code;
  return new Function(`return ${script.replace(`"use strict";`, '').trim()}`)(); // eslint-disable-line
}
