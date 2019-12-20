import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './router/index'
import store from './store/index'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import TableComponent from 'vue-table-component';

Vue.use(VueRouter)
Vue.use(TableComponent);
Vue.config.productionTip = false

new Vue({
  vuetify,
  router: router,
  store: store,
  created: function() {
    this.$store.dispatch('fetchOrderList')
  },
  render: h => h(App)
}).$mount('#app')
