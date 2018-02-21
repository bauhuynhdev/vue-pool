import Vue from 'vue'
import App from './App'
import router from '@/router'
import Helpers from '@/helpers'
import axios from 'axios'
import lodash from 'lodash'

Vue.config.productionTip = false

Vue.mixin(Helpers);
Vue.prototype.$http = axios;
Vue.prototype.$_ = lodash;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
