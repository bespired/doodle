/* eslint-disable */
import Vue    from 'vue'
import App    from './App.vue'
import global from './global'
import router from './router'
import store  from './store'

import DoodleDesign from "./doodledesign/doodle-design";

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

