import axios from 'axios'

export default {
  state: {
    orderList: [],
    order: []
  },
  mutations: {
    fetchOrderList(state, payload) {
      let orderList = payload.map(el => {
        el.orderID = Number(el.orderID)
        el.orderPrice = Number(el.orderPrice)
        return el
      })

      orderList.sort(function (a, b) {
        if (a.orderCompletedTime !== '---' && b.orderCompletedTime !== '---') {
          a = Number(a.orderCompletedTime.match(/\d+/g).join(''))
          b = Number(b.orderCompletedTime.match(/\d+/g).join(''))
        }
        return b - a
      })

      orderList.sort((a, b) => {
        a = a.orderStatus
        b = b.orderStatus
        if (a < b) {
          return 1
        }
        if (a > b) {
          return -1
        }
        return 0
      })

      state.orderList = orderList
    },
    fetchOrderItem(state, payload) {
      state.order = payload
    }
  },
  actions: {
    fetchOrderList: async ({commit}) => {
      await axios.get('http://localhost:8080/orderList.json')
        .then(r => {
          commit('fetchOrderList', r.data);
        })
    },
    fetchOrderItem: async ({commit}, id) => {
      await axios.get('http://localhost:8080/orderItem.json')
        .then(r => {
          let orders = []
          const order = r.data.filter(el => Number(el.orderID) === id)[0]
          const orderItemCount = order.orderInfo.length

          for (let i = 0; i < orderItemCount; i++) {
            const orderItem = {
              number: order.orderInfo[i].number,
              title: order.orderInfo[i].title,
              quantity: order.orderInfo[i].quantity,
              itemPrice: order.orderInfo[i].itemPrice,
              status: order.orderInfo[i].status,
              orderTime: order.orderTime,
              waitTimeInMinutes: order.waitTimeInMinutes,
            }
            orders.push(orderItem)
          }

          commit('fetchOrderItem', orders)
        })
    },
  },
  getters: {
    orderList: state => {
      return state.orderList
    },
    orderListTotal: state => {
      const prices = state.orderList.map(el => el.orderPrice)

      const sum = prices.reduce(function(previousValue, currentValue) {
        return previousValue + currentValue;
      }, 0);
      return sum.toFixed(2)
    },
    order: state => {
      return state.order
    },
    orderItemTotal: state => {
      const orderCount = state.order.length
      let total = 0

      for (let i = 0; i < orderCount; i++) {
        const amount = state.order[i].itemPrice * state.order[i].quantity
        total += amount
      }

      return total
    }
  }
}

