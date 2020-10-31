import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  //State
  state: {
    user: {
      loggedIn: false,
      data: null
    }
  },

  //Getters
  getters: {
    user(state){
      return state.user
    }
  },

  //Mutation
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    },  
  },

  //Action
  actions: {
    fetchUser({ commit }, user) {
      commit("SET_LOGGED_IN", user !== null);
      if (user) {
        commit("SET_USER", {
          //เก็บ data จาก user ไว้ใน state ชื่อ data
          uid: user.uid,
          displayName: user.displayName,
          email: user.email
        });
      } else {
        commit("SET_USER", null);
      }
    }
  }
})
