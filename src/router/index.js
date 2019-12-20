import VueRouter from 'vue-router'
import OrderList from '../components/OrderList'
import OrderItem from '../components/OrderItem'

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: OrderList },
    { path: '/order/:id', component: OrderItem }
  ]
})
