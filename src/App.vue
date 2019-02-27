<template>
  <el-container>
    <el-header>
      <h1 class="title">Configurable Form</h1>
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
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
        </svg>
      </a>
    </el-header>
    <el-main>
      <el-tabs v-model="activeName"
               @tab-click="handleClick">
        <el-tab-pane label="典型表单"
                     name="basic" />
        <el-tab-pane label="表单校验"
                     name="validation" />

        <Playground v-if="code"
                    :code="code"
                    :value="formModel" />
      </el-tabs>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Playground from './components/Playground';
import basicCode from './data/basic';
import validationCode from './data/validation';

@Component({
  components: {
    Playground,
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

  private activeName: string = 'basic';
  private code = basicCode;
  private codes: any = {
    basic: basicCode,
    validation: validationCode,
  };

  private handleClick() {
    this.code = this.codes[this.activeName] || null;
  }
}
</script>

<style lang="less">
body,
h1 {
  margin: 0;
}

body {
}

.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  padding: 4px 2px;
  background: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 1em,
      moccasin 0,
      moccasin 2em,
      transparent 0,
      transparent 3em,
      powderblue 0,
      powderblue 4em,
      transparent 0,
      transparent 5em,
      lavender 0,
      lavender 6em,
      transparent 0,
      transparent 7em,
      beige 0,
      beige 8em
    ),
    repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 1em,
      khaki 0,
      khaki 2em,
      transparent 0,
      transparent 3em,
      beige 0,
      beige 4em,
      transparent 0,
      transparent 5em,
      peachpuff 0,
      peachpuff 6em
    ),
    whitesmoke;
  background-blend-mode: multiply;
  line-height: 1;
}

.playground {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  max-height: calc(100vh - 155px);
}

.code-mirror,
.configurable-form {
  box-sizing: border-box;
  flex: 0 1 auto;
  width: 50%;
  border: 1px solid #ebebeb;
  border-radius: 2px;
  font-size: 12px;
  overflow-y: auto;
}

.code-mirror {
  margin-right: 10px;
}

.configurable-form {
  margin-left: 10px;
  padding: 5px;
}

.CodeMirror {
  height: 100%;
}
</style>
