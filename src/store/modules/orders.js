import axios from 'axios'

export default {
  state: {
    orders: [
      // {
      //   orderID: '1',
      //   tableID: 'a2',
      //   waiterName: 'Murtuz',
      //   orderStatus: 'completed',
      //   orderPrice: '22 AZN',
      //   orderTime: '19.12.2019, 15:19:53',
      // }
    ]
  },
  mutations: {
    fetchOrders(state, payload) {
      let orders = payload.map(el => {
        el.orderID = Number(el.orderID)
        el.orderPrice = Number(el.orderPrice)
        return el
      })

      orders.sort(function (a, b) {
        if (a.orderCompletedTime !== '---' && b.orderCompletedTime !== '---') {
          a = Number(a.orderCompletedTime.match(/\d+/g).join(''))
          b = Number(b.orderCompletedTime.match(/\d+/g).join(''))
        }
        return b - a
      })

      orders.sort((a, b) => {
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

      state.orders = orders
    }
  },
  actions: {
    fetchOrders: async ({commit}) => {
      await axios.get('http://localhost:8080/api.json')
        .then(r => {
          commit('fetchOrders', r.data);
        })
    },
  },
  getters: {
    orders: state => {
      return state.orders
    },
    orderTotal: state => {
      const prices = state.orders.map(el => el.orderPrice)

      const sum = prices.reduce(function(previousValue, currentValue) {
        return previousValue + currentValue;
      }, 0);
      return sum.toFixed(2)
    }
  }
}
