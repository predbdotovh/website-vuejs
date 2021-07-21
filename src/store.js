import Vue from "vue";
import Vuex from "vuex";
import Cookie from "js-cookie";

Vue.use(Vuex);

function save(state) {
  Cookie.set("vuex-store", state);
}
function load() {
  return Cookie.getJSON("vuex-store");
}

export default new Vuex.Store({
  state() {
    return (
      load() || {
        darkTheme: false,
      }
    );
  },
  getters: {
    appTheme(state) {
      return state.darkTheme ? "theme-dark" : "";
    },
  },
  mutations: {
    setDarkTheme(state, darkTheme) {
      state.darkTheme = darkTheme;
      save(state);
    },
  },
});
