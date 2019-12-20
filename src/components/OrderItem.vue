<template>
  <v-container>
    <v-layout text-center>
      <v-row justify="center">
        <v-col lg="10" xl="7" v-if="order">
          <table-component
            :data="order"
            :show-filter="false"
            :show-caption="false"
          >
            <table-column show="number" label="Number"></table-column>
            <table-column cell-class="tableTdLeft" show="title" label="Product name"></table-column>
            <table-column show="quantity" label="Quantity"></table-column>
            <table-column
              show="itemPrice" label="Price" :formatter="formatterPrice" cell-class="tableTdRight"
            ></table-column>
            <table-column show="orderTime" label="Order time" data-type="date:DD/MM"></table-column>
            <table-column show="waitTimeInMinutes" label="Wait time" :formatter="formatterWaitTime"></table-column>
            <table-column show="status" label="Status" :formatter="formatterStatus"></table-column>
            <table-column
              label="Cancel order" :formatter="formatterCancelOrder" :sortable="false" :filterable="false"
            ></table-column>
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
    </v-layout>
  </v-container>
</template>

<script>
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

        return `<span style="${style}" class="tableOrder">${val}</span>`
      },
      formatterWaitTime(val, rowProp) {
        if (rowProp.status === 'canceled') {
          return `<span class="tableWaitTimeCanceled">canceled</span>`
        }
        else {
          return `<span>${rowProp.waitTimeInMinutes}</span><span> minutes</span>`
        }
      },
      formatterCancelOrder(val, rowProp) {
        if (rowProp.status === 'canceled') {
          return `<button class="tableBtnCanceled" disabled>geri alindi</button>`
        }
        else {
          return `<button class="tableBtnCancel">geri al</button>`
        }
      }
    },
    computed: {
      orderItemTotal() {
        return this.$store.getters.orderItemTotal
      }
    },
    data: function () {
      return {
        order: null
      }
    },
    mounted() {
      this.$store.dispatch('fetchOrderItem', 1)
        .then(() => {
          this.order = this.$store.getters.order
        })
    }
  }
</script>

<style>
  .tableTdLeft { text-align: left }

  .tableOrder {
    color: #fff;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
  }

  .tableBtnCancel {
    padding: 0.2rem 0.5rem;
    width: 6rem;
    border: 1px solid #1976d2;
    border-radius: 4px;
    transition: .3s all;
  }

  .tableBtnCancel:hover {
    color: #fff;
    background-color: #1976d2;
  }

  .tableBtnCanceled {
    padding: 0.2rem 0.5rem;
    width: 6rem;
    border: 1px solid #1976d2;
    border-radius: 4px;
    color: white;
    background-color: #1976d2;
  }

  .tableWaitTimeCanceled {
    color: #fff;
    background-color: grey;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
  }
</style>
