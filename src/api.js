const mode = process.env.NODE_ENV

export const homePath = mode === 'production'
  ? '/vuejs-recruitment-test'
  : '/'

export const taskList = mode === 'production'
  ? 'https://oruj91.github.io/vuejs-recruitment-test/taskList.json'
  : 'http://localhost:8080/taskList.json'

export const orderList = mode === 'production'
  ? 'https://oruj91.github.io/vuejs-recruitment-test/orderList.json'
  : 'http://localhost:8080/orderList.json'
