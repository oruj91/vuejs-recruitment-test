<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
        <h2>Villa Lounge</h2>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="#"
        target="_blank"
        text
      >
        <span class="mr-2">Login</span>
        <v-icon>mdi-account-box </v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <OrderList/>
      <OrderItem/>
    </v-content>
  </v-app>
</template>

<script>
import OrderList from './components/OrderList'
import OrderItem from './components/OrderItem'

export default {
  name: 'App',

  components: {
    OrderList,
    OrderItem
  },

  data: () => ({
    //
  }),
};
</script>
