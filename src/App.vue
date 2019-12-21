<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <router-link :to="homePath" style="color: #fff; text-decoration: none">
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
      </router-link>

      <v-spacer></v-spacer>

      <v-btn href="#" target="_blank" text>
        <span class="mr-2">Add order</span>
        <v-icon>mdi-playlist-plus</v-icon>
      </v-btn>

      <v-btn href="#" target="_blank" text>
        <span class="mr-2">Login</span>
        <v-icon>mdi-account-box</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
  import {homePath} from './api'
  import OrderList from './components/OrderList'
  import OrderItem from './components/OrderItem'

  export default {
    data: function () {
      return {
        homePath
      }
    },
    name: 'App',
    components: {
      OrderList,
      OrderItem
    },
  };
</script>
