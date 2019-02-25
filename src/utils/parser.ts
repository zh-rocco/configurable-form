export function transform(script: string) {
  script = window.Babel.transform(script, {
    presets: [['env', { loose: true }]],
    // plugins: [],
    comments: false,
  }).code;
  script = `(function(exports){var module={};module.exports=exports;${script};return module.exports.__esModule?module.exports.default:module.exports;})({})`;
  return new Function(`return ${script}`)(); // eslint-disable-line
}
