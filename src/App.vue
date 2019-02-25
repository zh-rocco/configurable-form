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
          <el-row v-if="show">
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
import { transform } from './utils/parser';
import { stringify, parse } from './utils/helper';
import config from './form.js';

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
  private show: boolean = true;
  private config: object = transform(config)();

  private get code() {
    return config;
  }

  private handleCodeMirrorChange(val: string) {
    try {
      this.show = false;
      this.$nextTick(() => {
        this.config = transform(val)();
        this.show = true;
      });
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
