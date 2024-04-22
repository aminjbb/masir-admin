<template>
  <div>
    <v-form v-model="valid" ref="addOrder">
      <v-row justify="center" class="mt-15 pt-10">
        <v-col cols="5">
          <v-form v-model="valid" ref="product">
            <div>
              <div class="pr-12 "><span class="t18400 black--text"> محصول</span></div>
              <div class="mx-12 ml-14 mt-3">
                <v-autocomplete  v-model="order.product" :items="productList" :rules="rule" color="black" label="محصول"
                                 class="br-10" filled dense></v-autocomplete>
              </div>
              <div class="pr-12 "><span class="t18400 black--text">مشتری</span></div>
              <div class="mx-12 ml-14 mt-3">
                <v-autocomplete item-text="text" item-value="value" :items="userList" v-model="order.customer"  color="black"
                          label="مشتری" class="br-10" filled dense></v-autocomplete>
              </div>
              <div class="pr-12 "><span class="t18400 black--text">تعداد</span></div>
              <div class="mx-12 ml-14 mt-3">
                <v-text-field  v-model="order.quantity" color="black" label="تعداد"
                               class="br-10" filled dense></v-text-field>
              </div>
            </div>
          </v-form>
        </v-col>
        <v-col cols="10">
          <v-row justify="end" class="px-13 my-10">
            <v-btn @click="$router.push('/orders')" color="ChineseWhite" class="br-10" width="126" height="44">
                            <span class="t14400">
                                انصراف
                            </span>
            </v-btn>
            <v-btn dark @click="validate()" :loading="loading" color="primary" class="br-10 mr-5" width="199"
                   height="44">
                  <span class="t14400 white--text">
                    بارگذاری نهایی
                  </span>
            </v-btn>

          </v-row>
        </v-col>
      </v-row>
    </v-form>

  </div>
</template>

<script>
import FAQA from '~/components/Product/FAQA.vue'
import axios from 'axios'
import {gql} from "nuxt-graphql-request";
import VueCookies from "vue-cookies";
export default {
  components: {
    FAQA
  },
  data() {
    return {
      products:[],
      customers:[],
      search:null,
      valid: true,
      rule: [v => !!v || 'این فیلد الزامی است'],
      loading: false,
      order: {
        product: null,
        customer:null,
        quantity:null
      }
    }
  },

  methods: {
    async productSearch(){
      const requestHeaders = {
        Authorization: "Bearer " + VueCookies.get("token"),
      };
      const query = gql`
        query{
            adminProducts(limit:2000){
                totalCount,
                results{
                    id,
                    persianName,
                }
            }
          } `;
      const obj = await this.$graphql.default.request(query, {}, requestHeaders);
      this.products = obj.adminProducts.results
    },

    async getCustomer(){
      const requestHeaders = {
        Authorization: "Bearer " + VueCookies.get("token"),
      };
      const query = gql`
        query{
            adminUsers(limit:2000){
                results{
                    firstName,
                    lastName,
                    mobile,
                    id,
                    customer{
                      id
                    }
                }

            }
          } `;
      const obj = await this.$graphql.default.request(query, {}, requestHeaders);
      this.customers = obj?.adminUsers?.results
    },

    validate() {
      this.$refs.addOrder.validate()
      setTimeout(() => {
        if (this.valid) {
          this.createOrder()
        }

      }, 200);
    },

    createOrder() {
      this.loading = true;
      axios({
        method: 'post',
        url: process.env.apiUrl + 'order/v1/admin/',
        headers: {
          Authorization: "Bearer " + this.$cookies.get("token"),
        },
        data: {
          product: this.order.product,
          user: this.order.customer,
          quantity: parseInt(this.order.quantity),
        }
      })
        .then(response => {
          this.loading = false;
          this.$router.push('/orders')
        })
        .catch(err => {
          this.loading = false;
        })
    },

  },


  beforeMount() {
      this.productSearch()
      this.getCustomer()
  },

  computed: {
    productList() {
      var productList = []
      this.products.forEach(element => {
        var form = {
          text: element.persianName,
          value: element.id
        }
        productList.push(form)
      });
      return productList
    },
    userList() {
      var userList = []
      this.customers.forEach(element => {
        var form = {
          text: element.firstName + element.lastName +`(${element?.mobile})`,
          value: element?.id
        }
        userList.push(form)
      });
      return userList
    },
  }
}
</script>
