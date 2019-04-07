import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import store from './store'

import StartPage from './views/StartPage/App'
import Signup from './views/Signup/App'
import Home from './views/Home/App'
import User from './views/User/App'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'start',
      component: StartPage
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/user/:userid',
      name: 'user',
      component: User
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.path === '/' || to.path === '/signup') return next()
  if(store.getters.HAS_AUTH_TOKEN){
    if(axios.defaults.headers.common['Authorization'] === undefined){
      axios.defaults.headers.common = {'Authorization': `bearer ${store.state.AUTH_TOKEN}`}
    }
    next()
  }else{
    next('/')
  }
  //next()
})

export default router