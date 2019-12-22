<template>
  <v-container>
    <v-row justify="center">
      <v-col lg="12" xl="9">
        <v-btn :to="homePath" class="float-right" large>НАЗАД</v-btn>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col v-if="order" lg="12" xl="9">
        <table-component
          class="text-center"
          :data="order"
          :show-filter="false"
          :show-caption="false"
        >
          <table-column show="orderItemNumber" label="Номер"></table-column>
          <table-column cell-class="tableTdLeft" show="title" label="Продукт"></table-column>
          <table-column show="quantity" label="Количество"></table-column>
          <table-column show="itemPrice" label="Итоговая цена" :formatter="formatterPrice"
                        cell-class="text-right"></table-column>
          <table-column show="orderTime" label="Время заказа" data-type="date:DD/MM"></table-column>
          <table-column show="waitTimeInMinutes" label="Время ожидания" :formatter="formatterWaitTime"></table-column>
          <table-column show="status" label="Статус" :formatter="formatterStatus"></table-column>
          <table-column label="Отменить заказ" :sortable="false" :filterable="false">
            <template slot-scope="row">
              <v-btn
                @click="cancelOrder({orderID: `${row.orderID}`, orderItemNumber: `${row.orderItemNumber}`})"
                outlined small color="indigo"
                :disabled="`${row.status}` === 'canceled' || `${row.status}` === 'given'"
              >
                {{renderCancelOrderItemBtn(`${row.status}`)}}
              </v-btn>
            </template>
          </table-column>
          <template slot="tfoot" slot-scope="{ rows }">
            <tr>
              <th>Итоговая цена:</th>
              <th>&nbsp;</th>
              <th>&nbsp;</th>
              <th class="text-right"><span>{{orderListTotal}} ₼</span></th>
              <th>&nbsp;</th>
              <th>&nbsp;</th>
              <th>&nbsp;</th>
              <th>&nbsp;</th>
            </tr>
          </template>
        </table-component>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col lg="12" xl="9">
        <v-btn @click="finishTask(id)" class="float-right" color="primary" large>ЗАВЕРШИТЬ ЗАКАЗ</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import {homePath} from "../api";

  export default {
    methods: {
      finishTask(id) {
        this.$store.dispatch('finishTask', id)
      },
      formatterPrice(val, rowProp) {
        const amount = rowProp.quantity * rowProp.itemPrice
        return `<span>${amount} ₼</span>`
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
      renderCancelOrderItemBtn(status) {
        if (status === 'canceled') {
          return 'ОТМЕНЕНО'
        }
        else {
          return 'ОТМЕНИТЬ'
        }
      },
      cancelOrder(orderNum) {
        this.$store.dispatch('cancelOrder', orderNum)
      }
    },
    computed: {
      id() {
        return this.$route.params.id
      },
      order() {
        return this.$store.getters.orderList(this.id)
      },
      orderListTotal() {
        return this.$store.getters.orderListTotal(this.id)
      },
      homePath() {
        return homePath
      }
    }
  }
</script>
