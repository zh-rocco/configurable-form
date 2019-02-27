import {
  ComponentOptions,
  VueConstructor,
  CreateElement,
  VNode,
  VNodeData,
} from 'vue/types';
import { cloneDeep, isFunction } from 'lodash';
import { Component, Prop, Inject, Vue } from 'vue-property-decorator';

// TODO: 优化类型声明
export interface CommonObject {
  [prop: string]: any;
}
export interface FormModel extends CommonObject {}
export interface FormOptions extends CommonObject {}
export interface formEvents extends CommonObject {}
export interface componentOptions extends VNodeData {
  __is_vnode_data__?: boolean;
}
export interface ChildComponent extends CommonObject {
  component?:
    | string
    | ComponentOptions<never, any, any, any, any, Record<string, any>>
    | VueConstructor<Vue>;
  options: CommonObject | componentOptions;
  children: ChildComponent[];
  data?: any[] | Promise<any>;
  transform?(data: any): object[];
  show?(vm: Vue): boolean;
}
export interface Action {
  name: string;
  options?: CommonObject;
  events: CommonObject;
  show?(vm: Vue): boolean;
}
export interface PropsOptions extends CommonObject {}

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

  private collectAsyncData(components: ChildComponent[]) {
    for (const component of components) {
      if (Array.isArray(component.children)) {
        this.collectAsyncData(component.children);
      } else {
        const { __prop_name__, data, transform } = component;

        if (!__prop_name__ || !isFunction(data)) {
          continue;
        }

        this.$set(this.asyncData, __prop_name__ as string, []);

        setTimeout(async () => {
          const res = await data();
          this.asyncData[__prop_name__ as string] = isFunction(transform)
            ? transform(res)
            : res;
        });
      }
    }
  }

  private created() {
    this.collectAsyncData(this.formItems);
  }

  private render(h: CreateElement) {
    const { value: model } = this;
    const formItems = renderComponents(h, this.formItems || [], this);

    // 按钮
    if (!this.searchOnChange) {
      formItems.push(
        h(
          'el-form-item',
          undefined,
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
      const { options = {}, children = [], __prop_name__ } = component;
      const { prop, __is_vnode_data__ } = options;
      let defaultOptions = null;

      if (prop) {
        vm.$set(model, prop, model[prop] === undefined ? null : model[prop]);
        children.forEach((child) => (child.__prop_name__ = prop));
      }

      if (__is_vnode_data__) {
        defaultOptions = cloneDeep(options);
      } else {
        defaultOptions = { props: cloneDeep(options) };
      }

      if (__prop_name__) {
        defaultOptions.props = Object.assign(defaultOptions.props || {}, {
          value: model[__prop_name__],
        });
        defaultOptions.on = Object.assign(defaultOptions.on || {}, {
          input: (val: any) => (model[__prop_name__] = val),
        });
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
