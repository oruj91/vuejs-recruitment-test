import {taskList, orderList, products} from '../../api'
import axios from 'axios'

export default {
  state: {
    taskList: [],
    orderList: [],
    products: [],
    newOrder: []
  },
  mutations: {
    FETCH_TASK_LIST(state, payload) {
      let taskList = payload.map(el => {
        el.id = Number(el.id)
        el.price = Number(el.price)
        return el
      })

      taskList.sort(function (a, b) {
        if (a.completedTime !== '---' && b.completedTime !== '---') {
          a = Number(a.completedTime.match(/\d+/g).join(''))
          b = Number(b.completedTime.match(/\d+/g).join(''))
        }
        return b - a
      })

      taskList.sort((a, b) => {
        a = a.status
        b = b.status
        if (a < b) {
          return 1
        }
        if (a > b) {
          return -1
        }
        return 0
      })

      state.taskList = taskList
    },
    FETCH_ORDER_LIST(state, payload) {
      state.orderList = payload
    },
    FETCH_PRODUCTS(state, payload) {
      state.products = payload
    },
    CANCEL_ORDER(state, {orderID, orderItemNumber}) {
      const order = state.orderList.filter(el => Number(el.orderID) === Number(orderID))
      const orderItem = order[0].info.filter(i => Number(i.orderItemNumber) === Number(orderItemNumber))
      orderItem[0].status = 'canceled'
    },
    ADD_ORDER_ITEM(state, payload) {
      state.newOrder.push(payload)
    },
    CLEAR_ORDER_ITEM(state) {
      state.newOrder = []
    },
    ADD_ORDER(state, payload) {
      state.orderList.push(payload)
    },
    ADD_TASK(state, payload) {
      state.taskList.push(payload)
    },
    FINISH_TASK(state, payload) {
      const task = state.taskList.filter(el => el.id === Number(payload))
      const order = state.orderList.filter(el => Number(el.orderID) === Number(payload))
      const d = new Date()
      const date = `
        ${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}
      `

      order[0].info.forEach(el => {
        if (el.status === 'preparing') {
          el.status = 'given'
        }
      })

      task[0].status = 'completed'
      task[0].completedTime = date
    }
  },
  actions: {
    fetchTaskList: async ({commit}) => {
      await axios.get(taskList)
        .then(r => commit('FETCH_TASK_LIST', r.data))
    },
    fetchOrderList: async ({commit}) => {
      await axios.get(orderList)
        .then(r => commit('FETCH_ORDER_LIST', r.data))
    },
    fetchProducts: async ({commit}) => {
      await axios.get(products)
        .then(r => commit('FETCH_PRODUCTS', r.data))
    },
    cancelOrder: async ({commit}, payload) => {
      // await axios.post() POST запрос на отмену заказа с данными о orderID, orderItemNumber
      commit('CANCEL_ORDER', payload)
    },
    addOrderItem: ({commit}, payload) => {
      commit('ADD_ORDER_ITEM', payload)
    },
    clearOrderItems: ({commit}) => {
      commit('CLEAR_ORDER_ITEM')
    },
    addOrder: async ({commit}, payload) => {
      // await axios
      commit('ADD_ORDER', payload)
    },
    addTask: async ({commit}, payload) => {
      // await axios
      commit('ADD_TASK', payload)
    },
    finishTask: async ({commit}, payload) => {
      commit('FINISH_TASK', payload)
    }
  },
  getters: {
    taskList: state => {
      return state.taskList
    },
    taskListTotal: state => {
      const prices = state.taskList.map(el => Number(el.price))
      const sum = prices.reduce(function(previousValue, currentValue) {
        return previousValue + currentValue;
      }, 0);

      return sum.toFixed(2)
    },
    orderList: state => id => {
      const _order = state.orderList.filter(el => Number(el.orderID) === Number(id))[0]
      const orderItemsCount = _order.info.length
      let order = []

      for (let i = 0; i < orderItemsCount; i++) {
        const orderItem = {
          orderID: _order.orderID,
          orderItemNumber: _order.info[i].orderItemNumber,
          title: _order.info[i].title,
          quantity: _order.info[i].quantity,
          itemPrice: _order.info[i].itemPrice,
          status: _order.info[i].status,
          orderTime: _order.orderTime,
          waitTimeInMinutes: _order.waitTimeInMinutes,
        }
        order.push(orderItem)
      }
      return order
    },
    orderListTotal: state => orderID => {
      const order = state.orderList.filter(el => Number(el.orderID) === Number(orderID))
      return order[0].totalPrice
    },
    products: state => {
      return state.products
    },
    newOrder: state => {
      return state.newOrder
    },
    newOrderPrice: state => {
      if (state.newOrder.length === 0) {
        return 0
      }
      const prices = state.newOrder.map(el => el.price * el.quantity)
      const sum = prices.reduce(function(previousValue, currentValue) {
        return previousValue + currentValue;
      }, 0);
      return sum.toFixed(2)
    },
    getFreeOrderID: state => {
      const IDs = state.taskList.map(el => el.id)
      return Math.max.apply(Math, IDs) + 1
    }
  }
}

