import Vue from 'vue'
import App from './App.vue'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCommentDots, faHeart, faRetweet, faCog, faHome, faComments, faSignOutAlt, faCheckSquare, faEllipsisH, faTrash } from '@fortawesome/free-solid-svg-icons'
import {faHeart as faHeartRegular} from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCommentDots, faHeart, faRetweet, faCog, faHome, faComments, faSignOutAlt, faCheckSquare, faEllipsisH, faTrash, faHeartRegular)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VueAxios, Axios)

Axios.defaults.baseURL = 'http://localhost:3000'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
