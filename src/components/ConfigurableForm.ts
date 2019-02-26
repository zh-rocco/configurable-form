import { CreateElement, VNode } from 'vue/types';
import { cloneDeep, isFunction, pickBy } from 'lodash';
import { Component, Prop, Inject, Vue } from 'vue-property-decorator';

// TODO: 优化类型声明
export interface CommonObject {
  [prop: string]: any;
}
export interface FormModel extends CommonObject {}
export interface FormOptions extends CommonObject {}
export interface formEvents extends CommonObject {}
export interface ChildComponent extends CommonObject {
  component?: any;
  options: CommonObject;
  children: ChildComponent[];
  data?: any;
  transform?: Function;
  show?: Function;
}
export interface Action {
  name: string;
  options?: CommonObject;
  events: CommonObject;
  show?: Function;
}
export interface PropsOptions extends CommonObject {}

const HTML_ATTRS: string[] = ['style'];

/**
 * 提取原生 HTML 标签属性
 *
 * @export
 * @param {object} options 组件 props 对象
 * @returns {object}
 */
function pickAttrs(options: PropsOptions) {
  return pickBy(options, (v, k: string) => HTML_ATTRS.includes(k));
}

@Component
export default class ConfigurableForm extends Vue {
  @Inject({
    default() {
      return this;
    },
  })
  private baseFormContainer!: InstanceType<typeof ConfigurableForm> | Vue;

  @Prop({ type: Object, default: () => ({}) })
  public value!: FormModel;
  @Prop({ type: Object, default: () => ({}) })
  private formOptions!: FormOptions;
  @Prop({ type: Object, default: () => ({}) })
  private formEvents!: formEvents;
  @Prop({ type: Array, default: () => ({}) })
  private formItems!: ChildComponent[];
  @Prop({ type: Array, default: () => [] })
  private actions!: Action[];
  @Prop({ type: Boolean, default: false })
  private searchOnChange!: boolean;

  private asyncData: CommonObject = {};

  private get localFormOptions(): object {
    return Object.assign({}, this.formOptions, {
      model: this.value || {},
    });
  }
  private get formInstance(): Vue {
    return this.$refs.form as Vue;
  }

  private fetchAsyncData() {
    // for (const item of this.formItems) {
    //   const {
    //     options: { prop },
    //     children: { data, transform },
    //   } = item;
    //   if (!prop || !isFunction(data)) {
    //     continue;
    //   }
    //   this.$set(this.asyncData, prop, []);
    //   setTimeout(async () => {
    //     let res = await data();
    //     this.asyncData[prop] = isFunction(transform) ? transform(res) : res;
    //   });
    // }
  }

  private created() {
    this.fetchAsyncData();
  }

  private render(h: CreateElement) {
    const { value: model } = this;
    const formItems = renderComponents(h, this.formItems || [], this);

    // 按钮
    if (!this.searchOnChange) {
      formItems.push(
        h(
          'el-form-item',
          {},
          (this.actions || []).map((action) => {
            return h(
              'el-button',
              {
                key: action.name,
                props: action.options,
                on: action.events
                  ? Object.entries(action.events).reduce(
                    (acc: CommonObject, [k, v]) => {
                      acc[k] = (event: any) => {
                        v(event, cloneDeep(model), this.baseFormContainer);
                      };
                      return acc;
                    },
                    {},
                  )
                  : {},
              },
              action.name,
            );
          }),
        ),
      );
    }

    return h(
      'el-form',
      {
        class: 'base-form',
        props: this.localFormOptions,
        on: this.formEvents || {},
        ref: 'form',
      },
      formItems,
    );
  }
}

function renderComponents(
  h: CreateElement,
  formItems: ChildComponent[],
  vm: InstanceType<typeof ConfigurableForm>,
): VNode[] {
  return formItems
    .filter(({ show }) => !isFunction(show) || show(vm))
    .map((component: ChildComponent) => {
      const { value: model } = vm;
      const { options = {}, children = [], __prop__ } = component;
      const { prop } = options;
      let defaultOptions = null;

      if (prop) {
        vm.$set(model, prop, model[prop] === undefined ? null : model[prop]);
        children.forEach((child) => (child.__prop__ = prop));
      }

      if (__prop__) {
        defaultOptions = {
          props: Object.assign({}, component.options, {
            value: model[__prop__],
          }),
          attrs: pickAttrs(component.options),
          on: {
            input: (val: any) => (model[__prop__] = val),
          },
        };
      } else {
        defaultOptions = {
          props: component.options,
          attrs: pickAttrs(component.options),
        };
      }

      return h(
        component.component || 'el-form-item',
        defaultOptions,
        Array.isArray(component.children)
          ? renderComponents(h, children, vm)
          : null,
      );
    });
}
