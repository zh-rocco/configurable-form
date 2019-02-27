import { CreateElement } from 'vue/types';
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import CodeMirror from './CodeMirror';
import ConfigurableForm, {
  FormOptions,
  ChildComponent,
  FormAction,
} from './ConfigurableForm';
import { transform } from '../utils/parser';

interface Config {
  formOptions: FormOptions;
  formItems: ChildComponent[];
  formActions: FormAction[];
}

function wrap(input: string): string {
  return `() => (${input})`;
}

function transformCode(input: string): Config {
  return transform(input)() as Config;
}

@Component({
  components: {
    CodeMirror,
    ConfigurableForm,
  },
})
export default class Playground extends Vue {
  @Prop({ type: String, default: '' })
  private code!: string;
  @Prop({ type: Object, default: () => ({}) })
  private value!: object;

  private show: boolean = true;
  private config!: Config;

  @Watch('code', { immediate: true })
  private handleCodeChange(nv: string) {
    this.config = transformCode(wrap(nv));
  }

  private handleCodeMirrorChange(val: string) {
    try {
      this.show = false;
      this.$nextTick(() => {
        this.config = transform(val)();
        this.$forceUpdate();
        this.show = true;
      });
    } catch (error) {
      console.error('[handleCodeMirrorChange]:', error); // eslint-disable-line
    }
  }

  private render(h: CreateElement) {
    const { formOptions, formItems, formActions } = this.config;
    const codeMirror = h(CodeMirror, {
      props: { value: wrap(this.code) },
      on: { change: this.handleCodeMirrorChange },
    });
    const configurableForm = h(ConfigurableForm, {
      props: {
        value: this.value,
        formOptions,
        formItems,
        formActions,
      },
      on: {
        input: (val: any) => (this.value = val),
      },
    });

    return h(
      'div',
      {
        attrs: { class: 'playground' },
      },
      [
        h(
          'div',
          {
            attrs: { class: 'code-mirror' },
          },
          [codeMirror],
        ),
        h(
          'div',
          {
            attrs: { class: 'configurable-form' },
          },
          [configurableForm],
        ),
      ],
    );
  }
}
