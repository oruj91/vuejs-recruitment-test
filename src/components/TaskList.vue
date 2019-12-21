<template>
  <v-container>
    <v-row justify="center">
      <v-col lg="10" xl="7">
        <table-component
          class="text-center"
          :data="taskList"
          :show-filter="false"
          :show-caption="false"
        >
          <table-column show="row" label="Row" :formatter="formatterRow" data-type="numeric"></table-column>
          <table-column show="table" label="Table" :formatter="formatterTable"></table-column>
          <table-column show="waiter" label="Waiter" :formatter="formatterWaiter"></table-column>
          <table-column show="status" label="Status" :formatter="formatterStatus"></table-column>
          <table-column show="price" label="Price" :formatter="formatterPrice" data-type="numeric"
                        cell-class="text-right"></table-column>
          <table-column show="completedTime" label="Completed time" :formatter="formatterCompletedTime"></table-column>
          <table-column label="" :sortable="false" :filterable="false">
            <template slot-scope="row">
              <v-btn @click="showOrder(`${row.id}`)" small outlined color="indigo">bax</v-btn>
            </template>
          </table-column>
          <template slot="tfoot" slot-scope="{ rows }">
            <tr>
              <th>Order total:</th>
              <th>&nbsp;</th>
              <th>&nbsp;</th>
              <th>&nbsp;</th>
              <th class="text-right"><span>{{taskListTotal}} AZN</span></th>
              <th>&nbsp;</th>
              <th>&nbsp;</th>
            </tr>
          </template>
        </table-component>
      </v-col>
      <!-- <p>{{new Date().toLocaleString('ru-RU')}}</p>-->
    </v-row>
  </v-container>
</template>

<script>
  export default {
    computed: {
      taskList() {
        return this.$store.getters.taskList
      },
      taskListTotal() {
        return this.$store.getters.taskListTotal
      }
    },
    methods: {
      formatterRow(val, rowProp) {
        if (rowProp.status === 'not completed') {
          return `<span class="tableNotFinished">${val}</span>`
        }
        else {
          return `<span>${val}</span>`
        }
      },
      formatterTable(val, rowProp) {
        if (rowProp.status === 'not completed') {
          return `<span class="tableNotFinished">${val}</span>`
        }
        else {
          return `<span>${val}</span>`
        }
      },
      formatterWaiter(val, rowProp) {
        if (rowProp.status === 'not completed') {
          return `<span class="tableNotFinished">${val}</span>`
        }
        else {
          return `<span>${val}</span>`
        }
      },
      formatterStatus(val, rowProp) {
        if (rowProp.status === 'not completed') {
          return `<span class="tableNotFinished">${val}</span>`
        }
        else {
          return `<span>${val}</span>`
        }
      },
      formatterPrice(val, rowProp) {
        if (rowProp.status === 'not completed') {
          return `<span class="tableNotFinished">${val}</span> <span class="tableNotFinished">AZN</span>`
        }
        else {
          return `<span>${val}</span> <span>AZN</span>`
        }
      },
      formatterCompletedTime(val, rowProp) {
        if (rowProp.status === 'not completed') {
          return `<span class="tableNotFinished">${val}</span>`
        }
        else {
          return `<span>${val}</span>`
        }
      },
      showOrder(id) { // сменить на routerLink
        this.$router.push({path: `/order/${id}`})
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
        {text: 'Waiter name', value: 'waiter'},
        {text: 'Status', value: 'status'},
        {text: 'Order price', value: 'price', align: 'right',},
        {text: 'Order time', value: 'orderTime'},
      ],
    })
  };
</script>
