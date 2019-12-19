<template>
  <v-container>
    <v-layout
      text-center
      wrap
    >
      <v-flex xs12>
        <v-data-table
          :headers="headers"
          :items="orders"
          :items-per-page="10"
          class="elevation-1 my-8"
        ></v-data-table>
      </v-flex>

      <!--<v-flex xs12>
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        ></v-img>
      </v-flex>

      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to Vuetify
        </h1>
        <p class="subheading font-weight-regular">
          For help and collaboration with other Vuetify developers,
          <br>please join our online
          <a href="https://community.vuetifyjs.com" target="_blank">Discord Community</a>
        </p>
      </v-flex>

      <v-flex
        mb-5
        xs12
      >
        <h2 class="headline font-weight-bold mb-3">What's next?</h2>

        <v-layout justify-center>
          <a
            v-for="(next, i) in whatsNext"
            :key="i"
            :href="next.href"
            class="subheading mx-3"
            target="_blank"
          >
            {{ next.text }}
          </a>
        </v-layout>
      </v-flex>

      <v-flex
        xs12
        mb-5
      >
        <h2 class="headline font-weight-bold mb-3">Important Links</h2>

        <v-layout justify-center>
          <a
            v-for="(link, i) in importantLinks"
            :key="i"
            :href="link.href"
            class="subheading mx-3"
            target="_blank"
          >
            {{ link.text }}
          </a>
        </v-layout>
      </v-flex>

      <v-flex
        xs12
        mb-5
      >
        <h2 class="headline font-weight-bold mb-3">Ecosystem</h2>

        <v-layout justify-center>
          <a
            v-for="(eco, i) in ecosystem"
            :key="i"
            :href="eco.href"
            class="subheading mx-3"
            target="_blank"
          >
            {{ eco.text }}
          </a>
        </v-layout>
      </v-flex>-->
    </v-layout>
    <p>{{new Date().toLocaleString('ru-RU')}}</p>
  </v-container>
</template>

<script>
export default {
  orderID: 'HelloWorld',

  data: () => ({
    headers: [
      {
        text: 'Order ID',
        align: 'left',
        sortable: false,
        value: 'orderID',
      },
      { text: 'Table', value: 'tableID' },
      { text: 'Waiter name', value: 'waiterName' },
      { text: 'Status', value: 'orderStatus' },
      { text: 'Order price', value: 'orderPrice' },
      { text: 'Order time', value: 'orderTime' },
    ],
    orders: [
      {
        orderID: '1',
        tableID: 'a2',
        waiterName: 'Murtuz',
        orderStatus: 'completed',
        orderPrice: '22 AZN',
        orderTime: '19.12.2019, 15:19:53',
      },
      {
        orderID: '2',
        tableID: 'v3',
        waiterName: 'Murtuz',
        orderStatus: 'completed',
        orderPrice: '41.3 AZN',
        orderTime: '19.12.2019, 15:29:53',
      },
      {
        orderID: '3',
        tableID: 'm2',
        waiterName: 'Kamran',
        orderStatus: 'not finished',
        orderPrice: '62.0 AZN',
        orderTime: '19.12.2019, 16:39:00',
      },
      {
        orderID: '4',
        tableID: 'a3',
        waiterName: 'Murtuz',
        orderStatus: 'completed',
        orderPrice: '14.3 AZN',
        orderTime: '19.12.2019, 17:19:26',
      },
      {
        orderID: '5',
        tableID: 'g3',
        waiterName: 'Kamran',
        orderStatus: 'not finished',
        orderPrice: '23.9 AZN',
        orderTime: '19.12.2019, 17:35:47',
      },
      {
        orderID: '6',
        tableID: 'a4',
        waiterName: 'Kamran',
        orderStatus: 'completed',
        orderPrice: '7 AZN',
        orderTime: '19.12.2019, 19:20:25',
      },
      {
        orderID: '7',
        tableID: 'f23',
        waiterName: 'Murtuz',
        orderStatus: 'not finished',
        orderPrice: '10 AZN',
        orderTime: '19.12.2019, 19:42:21',
      },
      {
        orderID: '8',
        tableID: 'd10',
        waiterName: 'Zaur',
        orderStatus: 'completed',
        orderPrice: '16.5 AZN',
        orderTime: '19.12.2019, 20:19:53',
      },
      {
        orderID: '9',
        tableID: 'r4',
        waiterName: 'Zaur',
        orderStatus: 'completed',
        orderPrice: '24.9 AZN',
        orderTime: '19.12.2019, 20:34:11',
      },
      {
        orderID: '10',
        tableID: 'b3',
        waiterName: 'Zaur',
        orderStatus: 'completed',
        orderPrice: '27 AZN',
        orderTime: '19.12.2019, 21:19:22',
      },
    ],

    ecosystem: [
      {
        text: 'vuetify-loader',
        href: 'https://github.com/vuetifyjs/vuetify-loader',
      },
      {
        text: 'github',
        href: 'https://github.com/vuetifyjs/vuetify',
      },
      {
        text: 'awesome-vuetify',
        href: 'https://github.com/vuetifyjs/awesome-vuetify',
      },
    ],
    importantLinks: [
      {
        text: 'Documentation',
        href: 'https://vuetifyjs.com',
      },
      {
        text: 'Chat',
        href: 'https://community.vuetifyjs.com',
      },
      {
        text: 'Made with Vuetify',
        href: 'https://madewithvuejs.com/vuetify',
      },
      {
        text: 'Twitter',
        href: 'https://twitter.com/vuetifyjs',
      },
      {
        text: 'Articles',
        href: 'https://medium.com/vuetify',
      },
    ],
    whatsNext: [
      {
        text: 'Explore components',
        href: 'https://vuetifyjs.com/components/api-explorer',
      },
      {
        text: 'Select a layout',
        href: 'https://vuetifyjs.com/layout/pre-defined',
      },
      {
        text: 'Frequently Asked Questions',
        href: 'https://vuetifyjs.com/getting-started/frequently-asked-questions',
      },
    ],
  }),
};
</script>
