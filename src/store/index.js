import Vue from 'vue'
import Vuex from 'vuex'
import orders from './modules/orders'
import user from "./modules/user";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    orders: orders,
    user: user
  }
})
