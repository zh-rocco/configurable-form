export default `{
  formOptions: {
    size: 'small',
    labelWidth: '80px',
  },

  formItems: [
    {
      options: {
        prop: 'name',
        label: '活动名称',
        rules: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
        ],
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
        rules: [
          { required: true, message: '请选择活动区域', trigger: 'change' },
        ],
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
                rules: [
                  {
                    type: 'date',
                    required: true,
                    message: '请选择日期',
                    trigger: 'change',
                  },
                ],
              },
              children: [
                {
                  component: 'el-date-picker',
                  options: {
                    __is_vnode_data__: true,
                    props: {
                      type: 'date',
                      placeholder: '选择日期',
                    },
                    style: {
                      width: '100%',
                    },
                  },
                },
              ],
            },
          ],
        },
        {
          component: 'el-col',
          options: {
            __is_vnode_data__: true,
            props: {
              span: 2,
            },
            style: {
              textAlign: 'center',
            },
          },
          children: [
            {
              component: {
                render(h) {
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
                rules: [
                  {
                    type: 'date',
                    required: true,
                    message: '请选择时间',
                    trigger: 'change',
                  },
                ],
              },
              children: [
                {
                  component: 'el-time-picker',
                  options: {
                    __is_vnode_data__: true,
                    props: {
                      type: 'fixed-time',
                      placeholder: '选择时间',
                    },
                    style: {
                      width: '100%',
                    },
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
        rules: [
          {
            type: 'array',
            required: true,
            message: '请至少选择一个活动性质',
            trigger: 'change',
          },
        ],
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
        rules: [
          { required: true, message: '请选择活动资源', trigger: 'change' },
        ],
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
        rules: [{ required: true, message: '请填写活动形式', trigger: 'blur' }],
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
        click(event, formModel, vm) {
          vm.formInstance.validate((valid) => {
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
        click: (event, formModel, vm) => {
          vm.formInstance.resetFields();
        },
      },
    },
  ],
}`;
