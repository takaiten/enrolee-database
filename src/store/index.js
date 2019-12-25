import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuth: false,
    authUserCode: null,
    database: []
  },
  plugins: [createPersistedState()],
  mutations: {
    appendFormData: (state, { formData }) => {
      state.database.push(formData);
    },
    changeAuthState: state => {
      state.isAuth = true;
    },
    setAuthUser: (state, { code }) => {
      state.authUserCode = code;
    },
    unsetAuthState: state => {
      state.isAuth = false;
      state.authUserCode = null;
    },
    deleteCurrentApplication: state => {
      state.database.splice(
        state.database.findIndex(item => item.code === state.authUserCode),
        1
      );
      state.isAuth = false;
      state.authUserCode = null;
    },
    editApplicationData: (state, { user }) => {
      state.database[
        state.database.findIndex(item => item.code === state.authUserCode)
      ] = user;
    }
  },
  actions: {
    addNewForm: ({ commit }, payload) => {
      commit("appendFormData", payload);
    },
    authUser: ({ commit }, payload) => {
      commit("changeAuthState");
      commit("setAuthUser", payload);
    },
    logoutUser: ({ commit }) => {
      commit("unsetAuthState");
    },
    removeApplication: ({ commit }) => {
      commit("deleteCurrentApplication");
    },
    editApplication: ({ commit }, payload) => {
      commit("editApplicationData", payload);
    }
  },
  getters: {
    database: state => state.database,
    isAuth: state => state.isAuth,
    authUserCode: state => state.authUserCode
  },
  modules: {}
});
