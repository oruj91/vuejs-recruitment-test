import VueRouter from 'vue-router'
import OrderList from '../components/OrderList'
import OrderItem from '../components/OrderItem'

let homePath

if (window.location.host === 'localhost:8080') {
  homePath = '/'
}
else if (window.location.host === 'oruj91.github.io') {
  homePath = '/vuejs-recruitment-test/'
}

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: homePath, component: OrderList },
    { path: '/order/:id', component: OrderItem }
  ]
})
