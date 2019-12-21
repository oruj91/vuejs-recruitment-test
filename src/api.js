const mode = process.env.NODE_ENV

export const homePath = mode === 'production'
  ? '/vuejs-recruitment-test'
  : '/'

export const orderList = mode === 'production'
  ? 'https://oruj91.github.io/vuejs-recruitment-test/orderList.json'
  : 'http://localhost:8080/orderList.json'

export const orderItem = mode === 'production'
  ? 'https://oruj91.github.io/vuejs-recruitment-test/orderItem.json'
  : 'http://localhost:8080/orderItem.json'
