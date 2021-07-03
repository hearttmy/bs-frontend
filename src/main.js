import Vue from 'vue'
import VueAMap from 'vue-amap'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
// import '@/permission' // permission control

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: 'aad2b4250ff956c2bab5b0e0a1dff946',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
