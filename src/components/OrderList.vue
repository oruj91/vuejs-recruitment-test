<template>
  <v-container>
    <v-layout
      text-center
      wrap
    >
      <v-flex xs12>
        <table-component
          :data="orders"
          :show-filter="false"
          :show-caption="false"
        >
          <table-column show="row" label="Row number">
            <template slot-scope="row" >
              <span :class="{tableNotFinished: row.orderStatus === 'not complited'}">{{row.row}}</span>
            </template>
          </table-column>
          <table-column show="tableID" label="Table">
            <template slot-scope="row" >
              <span :class="{tableNotFinished: row.orderStatus === 'not complited'}">{{row.tableID}}</span>
            </template>
          </table-column>
          <table-column show="waiterName" label="Waiter name">
            <template slot-scope="row" >
              <span :class="{tableNotFinished: row.orderStatus === 'not complited'}">{{row.waiterName}}</span>
            </template>
          </table-column>
          <table-column show="orderStatus" label="Status">
            <template slot-scope="row" >
              <span :class="{tableNotFinished: row.orderStatus === 'not complited'}">{{row.orderStatus}}</span>
            </template>
          </table-column>
          <table-column show="orderPrice" label="Order price" data-type="numeric" cell-class="tableTdRight">
            <template slot-scope="row">
              <span :class="{tableNotFinished: row.orderStatus === 'not complited'}">{{row.orderPrice}}</span>
              <span :class="{tableNotFinished: row.orderStatus === 'not complited'}"> AZN</span>
            </template>
          </table-column>
          <table-column show="orderCompletedTime" label="Order completed time" data-type="date:DD/MM/YYYY">
            <template slot-scope="row" >
              <span :class="{tableNotFinished: row.orderStatus === 'not complited'}">{{row.orderCompletedTime}}</span>
            </template>
          </table-column>
          <table-column label="" :sortable="false" :filterable="false">
            <template slot-scope="row">
              <button class="btnShowOrder" @click="showOrder(`${row.orderID}`)">bax</button>
            </template>
          </table-column>
          <template slot="tfoot" slot-scope="{ rows }">
            <tr>
              <th>Order total:</th>
              <th>&nbsp;</th>
              <th>&nbsp;</th>
              <th>&nbsp;</th>
              <th class="tableTdRight"><span>{{totalOrder}} AZN</span></th>
              <th>&nbsp;</th>
              <th>&nbsp;</th>
            </tr>
          </template>
        </table-component>
      </v-flex>

<!--      <v-flex xs12>-->
<!--        <v-data-table-->
<!--          :headers="headers"-->
<!--          :items="orders"-->
<!--          :items-per-page="10"-->
<!--          class="elevation-1 my-8"-->
<!--        ></v-data-table>-->
<!--      </v-flex>-->

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

<!--    <p>{{new Date().toLocaleString('ru-RU')}}</p>-->
  </v-container>
</template>

<script>
  export default {
    computed: {
      orders() {
        return this.$store.getters.orders
      },
      totalOrder() {
        return this.$store.getters.orderTotal
      }
    },
    data: () => ({
      headers: [
        {
          text: 'Order ID',
          align: 'left',
          sortable: false,
          value: 'orderID',
        },
        {text: 'Table', value: 'tableID'},
        {text: 'Waiter name', value: 'waiterName'},
        {text: 'Status', value: 'orderStatus'},
        {text: 'Order price', value: 'orderPrice', align: 'right',},
        {text: 'Order time', value: 'orderTime'},
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
    methods: {
      showOrder(id) {
        console.log(id)
      }
    }
  };
</script>

<style>
  .table-component__table {
    margin-top: 1rem;
    width: 100%;
    border: 1px solid #ebebeb;
    border-collapse: collapse;

  }
  .table-component__table tr {
    border-bottom: 1px solid #ebebeb;
    background: #fff;
  }
  .table-component__table th, .table-component__table td {
    padding: .5rem;
  }

  .btnShowOrder {
    padding: .1rem .3rem;
    color: #fff;
    background: #1976d2;
    border-radius: 4px;
  }
  .tableTdRight { text-align: right }

  .tableNotFinished { color: red }
</style>
