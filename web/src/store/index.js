import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    shortened: ""
  },
  mutations: {
    setUrl(state, url) {
      state.shortened = url;
    }
  },
  actions: {
    async shorten({ commit }, { url }) {
      try {
        console.log(url);
        console.log(`${process.env.VUE_APP_SERVER_URL}/shorten`);
        const res = await axios.post(
          `${process.env.VUE_APP_SERVER_URL}/shorten`,
          url
        );
        commit(
          "setUrl",
          `${process.env.VUE_APP_SERVER_URL}/${res.data.shortened}`
        );
      } catch (err) {
        alert(err);
      }
    }
  }
});
