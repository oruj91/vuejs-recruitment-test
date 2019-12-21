import {taskList, orderList} from '../../api'
import axios from 'axios'

export default {
  state: {
    taskList: [],
    orderList: []
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
    CANCEL_ORDER(state, {orderID, orderItemNumber}) {
      const order = state.orderList.filter(el => el.orderID === orderID)
      const orderItem = order[0].info.filter(i => i.orderItemNumber === orderItemNumber)
      orderItem[0].status = 'canceled'
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
    cancelOrder: async ({commit}, payload) => {
      // await axios.post() POST запрос на отмену заказа с данными о orderID, orderItemNumber
      commit('CANCEL_ORDER', payload)
    }
  },
  getters: {
    taskList: state => {
      return state.taskList
    },
    taskListTotal: state => {
      const prices = state.taskList.map(el => el.price)

      const sum = prices.reduce(function(previousValue, currentValue) {
        return previousValue + currentValue;
      }, 0);
      return sum.toFixed(2)
    },
    orderList: state => id => {
      const _order = state.orderList.filter(el => el.orderID === id)[0]
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
    orderItemTotal: state => {
      const orderCount = state.orderList.length
      let total = 0

      for (let i = 0; i < orderCount; i++) {
        const amount = state.orderList[i].itemPrice * state.orderList[i].quantity
        total += amount
      }

      return total
    }
  }
}

