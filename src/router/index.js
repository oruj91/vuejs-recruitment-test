import VueRouter from 'vue-router'
import taskList from '../components/TaskList'
import OrderItem from '../components/OrderList'
import OrderAdd from '../components/OrderAdd'

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
    { path: homePath, component: taskList },
    { path: '/order/:id', component: OrderItem },
    { path: '/add/order', component: OrderAdd },
  ]
})
