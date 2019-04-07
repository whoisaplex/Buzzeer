import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    paths: ['AUTH_TOKEN', 'User']
  })],
  state: {
    AUTH_TOKEN: null,
    User: {
      UserID: '',
      Fullname: '',
      Username: ''
    }
  },
  mutations: {
    SET_TOKEN(state, TOKEN){
      state.AUTH_TOKEN = TOKEN
    },
    SET_TOKEN_DATA(state, TOKEN_DATA){
      state.User.UserID = TOKEN_DATA.Id
      state.User.Fullname = TOKEN_DATA.Fullname
      state.User.Username = TOKEN_DATA.Username
    }
  },
  getters: {
    HAS_AUTH_TOKEN: state => {
      return state.AUTH_TOKEN !== null
    }
  }
})
