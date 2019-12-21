<template>
  <v-container>
    <v-row justify="center">
      <v-col lg="10" xl="7">
        <v-btn :to="homePath" class="float-right" large>Go back</v-btn>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col lg="10" xl="7" v-if="order">
        <table-component
          class="text-center"
          :data="order"
          :show-filter="false"
          :show-caption="false"
        >
          <table-column show="orderItemNumber" label="Number"></table-column>
          <table-column cell-class="tableTdLeft" show="title" label="Product name"></table-column>
          <table-column show="quantity" label="Quantity"></table-column>
          <table-column show="itemPrice" label="Price" :formatter="formatterPrice" cell-class="tableTdRight"></table-column>
          <table-column show="orderTime" label="Order time" data-type="date:DD/MM"></table-column>
          <table-column show="waitTimeInMinutes" label="Wait time" :formatter="formatterWaitTime"></table-column>
          <table-column show="status" label="Status" :formatter="formatterStatus"></table-column>
          <table-column label="Cancel order" :sortable="false" :filterable="false">
            <template slot-scope="row">
              <v-btn
                @click="cancelOrder({orderID: `${row.orderID}`, orderItemNumber: `${row.orderItemNumber}`})"
                outlined small color="indigo"
                :disabled="`${row.status}` === 'canceled'"
              >
                {{renderCancelOrderBtn(`${row.status}`)}}
              </v-btn>
            </template>
          </table-column>
          <template slot="tfoot" slot-scope="{ rows }">
            <tr>
              <th>Order total:</th>
              <th>&nbsp;</th>
              <th>&nbsp;</th>
              <th class="tableTdRight"><span>{{orderItemTotal}} AZN</span></th>
              <th>&nbsp;</th>
              <th>&nbsp;</th>
              <th>&nbsp;</th>
              <th>&nbsp;</th>
            </tr>
          </template>
        </table-component>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import {homePath} from "../api";

  export default {
    methods: {
      formatterPrice(val, rowProp) {
        const amount = rowProp.quantity * rowProp.itemPrice
        return `<span>${amount} AZN</span>`
      },
      formatterStatus(val) {
        let style

        if (val === 'preparing') {
          style = 'background-color: red'
        }
        else if (val === 'given') {
          style = 'background-color: limegreen'
        }
        else {
          style = 'background-color: grey'
        }

        return `<span style="${style}" class="tableInfoStatus">${val}</span>`
      },
      formatterWaitTime(val, rowProp) {
        if (rowProp.status === 'canceled') {
          return `<span style="background-color:grey" class="tableInfoStatus">canceled</span>`
        }
        else {
          return `<span>${rowProp.waitTimeInMinutes}</span><span> minutes</span>`
        }
      },
      renderCancelOrderBtn(status) {
        if (status === 'canceled') {
          return 'geri alindi'
        } else {
          return 'geri al'
        }
      },
      cancelOrder(orderNum) {
        this.$store.dispatch('cancelOrder', orderNum)
      }
    },
    computed: {
      order() {
        const id = this.$route.params.id
        return this.$store.getters.orderList(id)
      },
      orderItemTotal() {
        return this.$store.getters.orderItemTotal
      }
    },
    data: function () {
      return {
        homePath: homePath
      }
    }
  }
</script>
