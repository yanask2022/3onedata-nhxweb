import Vue from 'vue'

import createInputLimit from '@/directive/el-select-create-input/index'
import AFTableColumn from 'af-table-column'
//
Vue.use(AFTableColumn)
import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css
import '@/styles/variables.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import i18n from './lang' // internationalization
import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log
import '@/assets/icon/iconfont.css'

import * as filters from './filters' // global filters

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
/* if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
} */

Vue.use(Element, {
  size: 'mini',
  i18n: (key, value) => i18n.t(key, value)
})

Vue.use(createInputLimit)

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false
Vue.prototype.$EventBus = new Vue()
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
