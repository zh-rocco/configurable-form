import { debounce } from 'lodash';
import { CreateElement } from 'vue/types';
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import CM from 'codemirror';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/idea.css';

const DEFAULT_OPTIONS = {
  lineNumbers: true,
  mode: 'javascript',
  theme: 'idea',
  tabSize: 2,
  spellcheck: true,
};

@Component
export default class CodeMirror extends Vue {
  @Prop({ type: String, default: '' })
  public value!: string;
  @Prop({ type: Object, default: () => ({}) })
  private options!: object;

  private currentOptions: any = undefined;
  private editor: any = undefined;

  private handleChange() {
    this.$emit('change', this.editor.getValue());
  }

  @Watch('value')
  private handleValueChange(val: string) {
    if (val !== this.editor.getValue()) {
      this.editor.setValue(val);
    }
  }

  private render(h: CreateElement) {
    return h('textarea', { ref: 'textarea' }, this.value);
  }

  private mounted() {
    this.currentOptions = Object.assign({}, DEFAULT_OPTIONS, this.options);
    this.editor = CM.fromTextArea(this.$refs.textarea, this.currentOptions);
    this.editor.on('change', debounce(this.handleChange, 300));
  }
}
