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
    },
    Comment: {
      BuzzId: '',
      BuzzName: '',
      BuzzUsername: '',
      BuzzContent: ''
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
    },
    SET_COMMENT_DATA(state, COMMENT_DATA){
      state.Comment.BuzzId = COMMENT_DATA.BuzzId || ''
      state.Comment.BuzzName = COMMENT_DATA.BuzzName || ''
      state.Comment.BuzzUsername = COMMENT_DATA.BuzzUsername || ''
      state.Comment.BuzzContent = COMMENT_DATA.BuzzContent || ''
    }
  },
  getters: {
    HAS_AUTH_TOKEN: state => {
      return state.AUTH_TOKEN !== null
    }
  }
})
