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

      <v-btn to="/add/order" text class="mr-3">
        <span class="mr-2">ДОБАВИТЬ ЗАКАЗ</span>
        <v-icon>mdi-playlist-plus</v-icon>
      </v-btn>

      <v-btn to="/login" text>
        <span class="mr-2">ВХОД</span>
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

  export default {
    computed: {
      homePath() {
        return homePath
      }
    }
  }
</script>

<style>
  .table-component__table {
    width: 100%;
    border: 1px solid #ebebeb;
    border-collapse: collapse;
  }

  .table-component__table tr {
    border-bottom: 1px solid #ebebeb;
    background: #fff;
  }

  .table-component__table th,
  .table-component__table td {
    padding: .5rem
  }

  .table-component__th--sort-asc,
  .table-component__th--sort-desc,
  .table-component__th--sort:hover {
    position: relative;
    cursor: pointer;
  }

  .table-component__th--sort-asc::after {
    position: absolute;
    top: 10px;
    right: 0;
    content: url("./assets/arrow-down.png");
  }

  .table-component__th--sort-desc::after {
    position: absolute;
    top: 10px;
    right: 0;
    content: url("./assets/arrow-up.png");
  }

  .tableNotFinished {
    color: red
  }

  .tableInfoStatus {
    color: #fff;
    padding: 0.3rem 1rem;
    border-radius: 4px;
  }
</style>
