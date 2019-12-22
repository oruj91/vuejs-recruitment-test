import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuelidate from 'vuelidate'
import router from './router/index'
import store from './store/index'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import TableComponent from 'vue-table-component';

Vue.use(VueRouter)
Vue.use(TableComponent);
Vue.use(Vuelidate)
Vue.config.productionTip = false

new Vue({
  vuetify,
  router: router,
  store: store,
  created: function() {
    this.$store.dispatch('fetchTaskList')
    this.$store.dispatch('fetchOrderList')
    this.$store.dispatch('fetchProducts')
  },
  render: h => h(App)
}).$mount('#app')
