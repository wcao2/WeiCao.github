import Vue from 'vue'
//bootstrap vue
import BootstrapVue from 'bootstrap-vue'
//app.vue is the entry point of the app
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')//dom element with the id of app
