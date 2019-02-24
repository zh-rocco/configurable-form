<template>
  <el-container>
    <el-header>
      <h1>Configurable Form</h1>
      <a class="star"
         href="https://github.com/zh-rocco/configurable-form"
         target="_blank"
         title="Github">
        <svg height="32"
             class="icon-github"
             viewBox="0 0 16 16"
             version="1.1"
             width="32"
             aria-hidden="true">
          <path fill-rule="evenodd"
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
        </svg>
      </a>
    </el-header>
    <el-main>
      <el-row :gutter="20">
        <el-col :span="12"
                class="editor">
          <CodeMirror :value="code"
                      @change="handleCodeMirrorChange" />
        </el-col>
        <el-col :span="12"
                class="previewer">
          <el-row>
            <ConfigurableForm class="rule-form"
                              v-model="formModel"
                              ref="baseForm"
                              :form-options="config.formOptions"
                              :form-events="config.formEvents"
                              :form-items="config.formItems"
                              :actions="config.formActions" />
          </el-row>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { CreateElement } from 'vue/types';
import { Component, Prop, Vue } from 'vue-property-decorator';
import CodeMirror from './components/CodeMirror';
import ConfigurableForm from './components/ConfigurableForm';

@Component({
  components: {
    CodeMirror,
    ConfigurableForm,
  },
})
export default class App extends Vue {
  private formModel = {
    date1: '',
    date2: '',
    delivery: false,
    desc: '',
    name: '',
    region: '',
    resource: '',
    type: [],
  };
  private config = {
    formItems: [
      {
        options: {
          prop: 'name',
          label: '活动名称',
        },
        children: [
          {
            component: 'el-input',
          },
        ],
      },
      {
        options: {
          prop: 'region',
          label: '活动区域',
        },
        children: [
          {
            component: 'el-select',
            options: {
              placeholder: '请选择活动区域',
            },
            children: [
              {
                component: 'el-option',
                options: {
                  label: '区域一',
                  value: 'shanghai',
                },
              },
              {
                component: 'el-option',
                options: {
                  label: '区域二',
                  value: 'beijing',
                },
              },
            ],
          },
        ],
      },
      {
        options: {
          label: '活动时间',
        },
        children: [
          {
            component: 'el-col',
            options: {
              span: 11,
            },
            children: [
              {
                component: 'el-form-item',
                options: {
                  prop: 'date1',
                },
                children: [
                  {
                    component: 'el-date-picker',
                    options: {
                      type: 'date',
                      placeholder: '选择日期',
                      style: 'width: 100%;',
                    },
                  },
                ],
              },
            ],
          },
          {
            component: 'el-col',
            options: {
              span: 2,
              style: 'text-align: center;',
            },
            children: [
              {
                component: {
                  render(h: CreateElement) {
                    return h('span', undefined, '-');
                  },
                },
              },
            ],
          },
          {
            component: 'el-col',
            options: {
              span: 11,
            },
            children: [
              {
                component: 'el-form-item',
                options: {
                  prop: 'date2',
                },
                children: [
                  {
                    component: 'el-time-picker',
                    options: {
                      type: 'fixed-time',
                      placeholder: '选择时间',
                      style: 'width: 100%;',
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        options: {
          prop: 'delivery',
          label: '即时配送',
        },
        children: [
          {
            component: 'el-switch',
          },
        ],
      },
      {
        options: {
          prop: 'type',
          label: '活动性质',
        },
        children: [
          {
            component: 'el-checkbox-group',
            options: {},
            children: [
              {
                component: 'el-checkbox',
                options: {
                  label: '美食/餐厅线上活动',
                },
              },
              {
                component: 'el-checkbox',
                options: {
                  label: '地推活动',
                },
              },
              {
                component: 'el-checkbox',
                options: {
                  label: '线下主题活动',
                },
              },
              {
                component: 'el-checkbox',
                options: {
                  label: '单纯品牌曝光',
                },
              },
            ],
          },
        ],
      },
      {
        options: {
          prop: 'resource',
          label: '特殊资源',
        },
        children: [
          {
            component: 'el-radio-group',
            options: {},
            children: [
              {
                component: 'el-radio',
                options: {
                  label: '线上品牌商赞助',
                },
              },
              {
                component: 'el-radio',
                options: {
                  label: '线下场地免费',
                },
              },
            ],
          },
        ],
      },
      {
        options: {
          prop: 'desc',
          label: '活动形式',
        },
        children: [
          {
            component: 'el-input',
            options: {
              type: 'textarea',
            },
          },
        ],
      },
    ],

    formActions: [
      {
        name: '立即创建',
        options: {
          type: 'primary',
        },
        events: {
          click(event: any, formModel: any, vm: any) {
            vm.formInstance.validate((valid: any) => {
              if (valid) {
                alert('submit!');
              } else {
                console.log('error submit!!');
                return false;
              }
            });
          },
        },
      },
      {
        name: '重置',
        events: {
          click: async (event: any, formModel: any, vm: any) => {
            vm.formInstance.resetFields();
          },
        },
      },
    ],

    formOptions: {
      labelWidth: '80px',
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' },
        ],
        date1: [
          {
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change',
          },
        ],
        date2: [
          {
            type: 'date',
            required: true,
            message: '请选择时间',
            trigger: 'change',
          },
        ],
        type: [
          {
            type: 'array',
            required: true,
            message: '请至少选择一个活动性质',
            trigger: 'change',
          },
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' },
        ],
        desc: [{ required: true, message: '请填写活动形式', trigger: 'blur' }],
      },
    },
  };

  private get code() {
    return JSON.stringify(this.config, undefined, 2);
  }

  private handleCodeMirrorChange(val: string) {
    try {
      // this.config = JSON.parse(val);
    } catch (error) {
      console.error('JSON parse error:', error);
    }
  }
}
</script>

<style lang="less">
body,
h1 {
  margin: 0;
}

.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-row {
  display: flex;
  max-height: calc(100vh - 100px);
  justify-content: space-around;
  align-items: stretch;
}

.el-col {
  overflow-y: auto;
}

.CodeMirror {
  height: 100%;
}
</style>
