import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/packages/theme-chalk/lib/index.css';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(ElementUI);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
