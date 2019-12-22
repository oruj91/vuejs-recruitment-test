<template>
  <v-container>
    <v-row justify="center">
      <v-col xs="12" sm="6" lg="5" xl="4">
        <v-card>
          <v-card-text>
            <form>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="name"
                    :error-messages="nameErrors"
                    label="Имя"
                    required
                    @input="$v.name.$touch()"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="surname"
                    :error-messages="surnameErrors"
                    label="Фамилия"
                    required
                    @input="$v.surname.$touch()"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-select
                    v-model="operator"
                    :items="operators"
                    label="Мобильный оператор"
                  ></v-select>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="number"
                    :error-messages="numberErrors"
                    label="Мобильный номер"
                    placeholder="277-84-30"
                    v-mask="mask"
                    required
                    @input="$v.number.$touch()"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="password"
                    :error-messages="passwordErrors"
                    label="Password"
                    @input="$v.password.$touch()"
                    @click:append="showPassword = !showPassword"
                    :type="showPassword ? 'text' : 'password'"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    hint="Не менее 6 символов"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-btn class="mr-4" @click="submit" color="primary">submit</v-btn>
              <v-btn @click="clear">clear</v-btn>
            </form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import {required, maxLength, minLength, numeric} from 'vuelidate/lib/validators'
  import { mask } from 'vue-the-mask'

  export default {
    directives: {
      mask,
    },
    validations: {
      name: {required, maxLength: maxLength(10)},
      surname: {required, maxLength: maxLength(10)},
      number: {required},
      password: {required, maxLength: maxLength(10), minLength: minLength(6)},
    },
    data: () => ({
      name: '',
      surname: '',
      operator: '050',
      number: '',
      password: '',
      showPassword: false,
      mask: '###-##-##',
      operators: ['050', '051', '055', '070', '077']
    }),
    computed: {
      nameErrors() {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.maxLength && errors.push('Не больше 10-ти символов')
        !this.$v.name.required && errors.push('Обязательное поле')
        return errors
      },
      surnameErrors() {
        const errors = []
        if (!this.$v.surname.$dirty) return errors
        !this.$v.surname.maxLength && errors.push('Не больше 10-ти символов')
        !this.$v.surname.required && errors.push('Обязательное поле')
        return errors
      },
      numberErrors() {
        const errors = []
        if (!this.$v.number.$dirty) return errors
        !this.$v.number.required && errors.push('Обязательное поле')
        return errors
      },
      passwordErrors() {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.maxLength && errors.push('Не больше 10-ти символов')
        !this.$v.password.minLength && errors.push('Не менее 6 символов')
        !this.$v.password.required && errors.push('Обязательное поле')
        return errors
      },
    },
    methods: {
      submit() {
        this.$v.$touch()

        if (this.$v.$invalid) {
          console.log('submit error')
          // this.submitStatus = 'ERROR'
        }
        else {
          const data = {
            number: this.operator + this.number,
            password: this.password,
            name: this.name,
            surname: this.surname,
          }

          this.$store.dispatch('setUser', data)
            .then(() => this.$router.push('/add/order'))
        }
      },
      clear() {
        this.$v.$reset()
        this.name = ''
        this.surname = ''
        this.number = null
        this.password = null
      },
    },
  }
</script>
