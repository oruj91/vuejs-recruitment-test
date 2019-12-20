import Vue from 'vue'
import store from './store/index'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import TableComponent from 'vue-table-component';

Vue.use(TableComponent);
Vue.config.productionTip = false

new Vue({
  vuetify,
  store: store,
  created: function() {
    this.$store.dispatch('fetchOrders')
  },
  render: h => h(App)
}).$mount('#app')
