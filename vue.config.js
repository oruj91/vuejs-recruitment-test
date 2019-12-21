module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vuejs-recruitment-test/'
    : '/',
  "transpileDependencies": [
    "vuetify"
  ],
  lintOnSave: false
}
