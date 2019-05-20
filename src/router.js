import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import store from './store'

import StartPage from './views/StartPage/App'
import Signup from './views/Signup/App'
import Home from './views/Home/App'
import User from './views/User/App'
import Feed from './views/Feed/App'
import Messages from './views/Messages/App'
import Conversation from './views/Messages/Conversation'

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
    },
    {
      path: '/feed',
      name: 'feed',
      component: Feed
    },
    {
      path: '/messages',
      name: 'messages',
      component: Messages
    },
    {
      path: '/messages/conversation/:id',
      name: 'conversation',
      component: Conversation
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.path === '/' || to.path === '/signup') return next()
  if(store.getters.HAS_AUTH_TOKEN){
    if(axios.defaults.headers.common['Authorization'] === undefined){
      axios.defaults.headers.common = {'Authorization': `bearer ${store.state.AUTH_TOKEN}`}
    }
    if(to.name === 'user' && to.params.userid === store.state.User.Username) return next('/home')
    next()
  }else{
    next('/')
  }
})

export default router