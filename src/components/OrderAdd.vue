<template>
  <v-container>
    <v-row justify="center">
      <v-col sm="12" md="10" lg="8" xl="5">
        <v-btn :to="homePath" class="float-right" large>НАЗАД</v-btn>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col sm="12" md="10" lg="8" xl="5">
        <v-card>
          <v-card-text>
            <form>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="row"
                    :error-messages="rowErrors"
                    :counter="2"
                    label="Ряд"
                    required
                    @input="$v.row.$touch()"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="table"
                    :error-messages="tableErrors"
                    :counter="3"
                    label="Стол"
                    required
                    @input="$v.table.$touch()"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-select
                    v-model="waiter"
                    :items="waiters"
                    :error-messages="waiterErrors"
                    label="Официант"
                    required
                    @change="$v.waiter.$touch()"
                  ></v-select>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="time"
                    :error-messages="timeErrors"
                    :counter="2"
                    label="Время приготовления"
                    required
                    @input="$v.time.$touch()"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="9">
                  <v-select
                    v-model="product"
                    :items="products"
                    item-text="name"
                    item-value="price"
                    :error-messages="productErrors"
                    label="Продукт"
                    required
                    return-object
                    @change="$v.product.$touch()"
                  ></v-select>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model="quantity"
                    :error-messages="quantityErrors"
                    :counter="3"
                    label="Количество"
                    required
                    @input="$v.quantity.$touch()"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="mb-5">
                <v-col cols="5">
                  <v-btn @click="addProduct" :disabled="!product || !quantity">Добавить выбранный продукт</v-btn>
                  <div class="v-text-field__details mt-2" v-if="submitStatus">
                    <div class="v-messages theme--light error--text" role="alert">
                      <div class="v-messages__wrapper">
                        <div class="v-messages__message">{{submitStatus}}</div>
                      </div>
                    </div>
                  </div>
                </v-col>
                <v-col cols="7">
                  <v-row>
                    <v-col cols="10" class="text-right">
                      <h3 class="mb-1" style="text-wrap: none">Итоговая цена заказа: </h3>
                      <h3>Приблизительное время приготовления: </h3>
                    </v-col>
                    <v-col style="padding-left: 0" class="text-left">
                      <h3>{{newOrderPrice}}</h3>
                      <h3>-</h3>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <table-component
                v-if="newOrder.length > 0"
                class="text-center mb-10"
                :data="newOrder"
                :show-filter="false"
                :show-caption="false"
              >
                <table-column show="name" label="Product"></table-column>
                <table-column show="price" label="Price"></table-column>
                <table-column show="quantity" label="Quantity"></table-column>
                <table-column label="Total price" :formatter="formatterTotalPrice"></table-column>
              </table-component>
              <v-btn @click="submit" class="mr-4" color="primary">СОЗДАТЬ ЗАКАЗ</v-btn>
              <v-btn @click="clear">ОЧИСТИТЬ ПОЛЯ</v-btn>
            </form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import {required, maxLength, numeric} from 'vuelidate/lib/validators'
  import {homePath} from "../api";

  const requiredIfNewOrderEmpty = (value) => {
    return value !== null
  }

  export default {
    validations: {
      row: {required, maxLength: maxLength(2), numeric},
      table: {required, maxLength: maxLength(3)},
      waiter: {required},
      time: {required, maxLength: maxLength(2), numeric},
      product: {requiredIfNewOrderEmpty},
      quantity: {requiredIfNewOrderEmpty, numeric, maxLength: maxLength(3)},
    },
    data: () => ({
      row: '',
      table: '',
      waiter: '',
      time: '',
      product: null,
      quantity: null,
      submitStatus: null
    }),
    computed: {
      newOrder() {
        return this.$store.getters.newOrder
      },
      newOrderPrice() {
        return this.$store.getters.newOrderPrice
      },

      homePath() {
        return homePath
      },
      products() {
        return this.$store.getters.products
      },
      waiters() {
        return ['Orxan', 'Veysel', 'Zaur', 'Kamran', 'Tural', 'Fuad', 'Riad', 'Sergey']
      },

      rowErrors() {
        const errors = []
        if (!this.$v.row.$dirty) return errors
        !this.$v.row.required && errors.push('Обязательное поле')
        !this.$v.row.maxLength && errors.push('Не больше 2 символов')
        !this.$v.row.numeric && errors.push('Допускаются только цифры')
        return errors
      },
      tableErrors() {
        const errors = []
        if (!this.$v.table.$dirty) return errors
        !this.$v.table.required && errors.push('Обязательное поле')
        !this.$v.table.maxLength && errors.push('Не больше 3 символов')
        return errors
      },
      waiterErrors() {
        const errors = []
        if (!this.$v.waiter.$dirty) return errors
        !this.$v.waiter.required && errors.push('Обязательное поле')
        return errors
      },
      timeErrors() {
        const errors = []
        if (!this.$v.time.$dirty) return errors
        !this.$v.time.required && errors.push('Обязательное поле')
        !this.$v.time.maxLength && errors.push('Не больше 2 символов')
        !this.$v.time.numeric && errors.push('Допускаются только цифры')
        return errors
      },
      productErrors() {
        const errors = []
        if (!this.$v.product.$dirty) return errors
        !this.$v.product.requiredIfNewOrderEmpty && errors.push('Обязательное поле')
        return errors
      },
      quantityErrors() {
        const errors = []
        if (!this.$v.quantity.$dirty) return errors
        !this.$v.quantity.requiredIfNewOrderEmpty && errors.push('Обязательное поле')
        !this.$v.quantity.numeric && errors.push('Допускаются только цифры')
        !this.$v.quantity.maxLength && errors.push('Не больше 3 символов')
        return errors
      },
    },
    methods: {
      addProduct() {
        this.submitStatus = null

        const orderItem = {
          id: this.product.id,
          name: this.product.name,
          price: this.product.price,
          quantity: this.quantity
        }
        this.$store.dispatch('addOrderItem', orderItem)
        this.product = ''
        this.quantity = ''
      },
      formatterTotalPrice(val, rowProp) {
        return (rowProp.price * rowProp.quantity).toFixed(2)
      },
      submit() {
        this.$v.$touch()
        if (this.$store.getters.newOrder.length === 0) {
          this.submitStatus = 'Не добавлены продукты'
          return
        }
        else {
          this.submitStatus = null
        }

        if (this.$v.$invalid) {
          console.log('submit error')
          // this.submitStatus = 'ERROR'
        }
        else {
          const newOrder = this.$store.getters.newOrder
          const date = new Date()

          let itemNumber = 1
          const orderInfos = newOrder.map(el => {

            return {
              orderItemNumber: itemNumber++,
              title: el.name,
              quantity: el.quantity,
              itemPrice: el.price,
              status: 'preparing'
            }
          })

          const orderListData = {
            info: orderInfos,
            orderID: this.$store.getters.getFreeOrderID,
            totalPrice: this.newOrderPrice,
            orderTime: `${date.getHours()}:${date.getMinutes()}`,
            waitTimeInMinutes: this.time
          }

          const taskListData = {
            id: this.$store.getters.getFreeOrderID,
            status: 'not completed',
            completedTime: "---",
            price: this.$store.getters.newOrderPrice,
            row: this.row,
            table: this.table,
            waiter: this.waiter
          }

          this.$store.dispatch('addOrder', orderListData)
          this.$store.dispatch('addTask', taskListData)
          this.$store.dispatch('clearOrderItems')
        }
      },
      clear() {
        this.$v.$reset()
        this.row = ''
        this.table = ''
        this.waiter = ''
        this.time = ''
        this.product = null
        this.quantity = null
        this.submitStatus = null
        this.newOrderPrice = 0
      }
    },
  }
</script>
