<template>
  <div>
    <v-card class="mx-10 mt-10 br-15" outlined>
      <div class="pa-5 ">
        <v-form v-model="valid" ref="editUser">
          <v-row justify="center" align="center">
            <v-col cols="2">
              <div class="pr-2 mb-5">
                                <span class="t18400 black--text">
                                    نام
                                </span>
              </div>
              <v-text-field :rules="rule" v-model="name" color="black" label="نام و نام خانوادگی"
                            class="br-10" filled dense></v-text-field>
            </v-col>
            <v-col cols="2">
              <div class="pr-2 mb-5">
                                <span class="t18400 black--text">
                                    نام خانوادگی
                                </span>
              </div>
              <v-text-field :rules="rule" v-model="lastName" color="black" label="نام و نام خانوادگی"
                            class="br-10" filled dense></v-text-field>
            </v-col>

            <v-col cols="2">
              <div class="pr-2 mb-5">
                                <span class="t18400 black--text">
                                    شماره موبایل
                                </span>
              </div>
              <v-text-field :rules="rule" v-model="mobile" color="black" label="شماره موبایل" class="br-10"
                            filled dense></v-text-field>
            </v-col>
            <v-col cols="2">
              <div class="pr-2 mb-5">
                                <span class="t18400 black--text">
                                    کد ملی
                                </span>
              </div>
              <v-text-field :rules="rule" v-model="nationalCode" color="black" label=" کد ملی" class="br-10"
                            filled dense></v-text-field>
            </v-col>

            <v-col cols="2">
              <div class="pr-2 mb-5">
                                <span class="t18400 black--text">
                                    ایمیل
                                </span>
              </div>
              <v-text-field :rules="rule" v-model="email" color="black" label=" ایمیل" class="br-10" filled
                            dense></v-text-field>
            </v-col>
          </v-row>
        </v-form>

        <v-row justify="end" class="px-5 ">
          <v-btn @click="close()" color="ChineseWhite" class="br-10" width="126" height="44">
                        <span class="t14400">
                            انصراف
                        </span>
          </v-btn>
          <v-btn dark @click="validate()" :loading="loading" color="DeepGreen" class="br-10 mr-5" width="199"
                 height="44">
                        <span class="t14400 white--text">
                            ویرایش کاربر
                        </span>
          </v-btn>

        </v-row>

      </div>
    </v-card>

    <v-row justify="center" class="px-10">
      <v-col cols="6">
        <v-card class=" mt-10 br-15" min-height="80" outlined>
          <Address v-for="(address, index) in customerAddress" :key="index" :address="address"/>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card class=" mt-10 br-15" min-height="80" outlined>
          <v-card height="103" outlined class="ma-3 mx-10 br-15" v-for="order in customerOrder" :key="order.id">
            <v-row align="center" class="fill-height">
              <v-col cols="8">
                <v-row justify="space-between" align="center" class="fill-height  mr-5">
                  <v-col cols="6" class="pt-3">
                                        <span class="t14600">
                                            {{ order.details[0].variantName }}
                                        </span>
                  </v-col>
                  <v-col cols="6" class="pt-3">
                                        <span class="t14600">
                                            {{ order.details[0].variantUnitPrice }}
                                        </span>
                  </v-col>


                </v-row>
              </v-col>

            </v-row>
          </v-card>

        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import Address from '~/components/public/Address'
import axios from 'axios'
import VuePersianDatetimePicker from "vue-persian-datetime-picker";
import {PublicMethod} from '~/store/classes.js'

export default {
  components: {
    Address,
    datePicker: VuePersianDatetimePicker,
  },
  data() {
    return {
      loading: false,
      valid: true,
      name: '',
      sex: '',
      mobile: '',
      nationalCode: '',
      lastName: '',
      date: '',
      email: '',
      rule: [v => !!v || 'این فیلد الزامی است'],
      sexObj: [{
        text: 'آقا', value: 'Male'
      },
        {
          text: 'خانم', value: 'Female'
        }]
    }
  },
  beforeMount() {
    this.$store.dispatch('set_customer', this.$route.params.id)
  },

  computed: {
    customer() {
      try {
        return this.$store.getters['get_customer']
      } catch (error) {
        return ''
      }
    },

    customerAddress() {
      try {
        return this.customer.client.addresses
      } catch (error) {
        return []
      }
    },
    customerOrder() {
      try {
        let ordres = this.customer.orders.slice(0, 5)
        return ordres
      } catch (error) {
        return []
      }
    }
  },

  methods: {
    validate() {
      this.$refs.editUser.validate()
      setTimeout(() => {
        if (this.valid) {
          this.editUser()
        }
      }, 200);
    },

    editUser() {
      axios({
        method: 'put',
        url: process.env.apiUrl + 'user/v1/admin/' + this.customer[0].id + '/',
        headers: {
          Authorization: "Bearer " + this.$cookies.get("token"),
        },
        data: {
          mobile: this.mobile,
          first_name: this.name,
          last_name: this.lastname,
          email: this.email,
          national_id :this.nationalCode
        }
      })
        .then(response => {
          this.editCient()

        })
        .catch(err => {
          this.loading = false;
        })
    },

    setForm(obj) {
      console.log(obj)
      this.name = obj[0].firstName
      this.lastName = obj[0].lastname
      this.mobile = obj[0].mobile
      this.nationalCode = obj[0].nationalId
      this.email = obj[0].email

    }
  },

  watch: {
    customer(val) {
      this.setForm(val);
    }
  }
}
</script>
