<template>
  <v-card class="br-20 mx-10 mt-10" outlined>
    <v-row justify="center" class="my-15 pt-10">
      <v-form v-model="validForm" ref="addSkill">
        <v-col cols="12">
          <v-row>
            <v-col cols="4">
              <div>
                <div class="text-right mb-5" >
                  عنوان
                </div>
                <v-text-field :rules="rule" color="Cultured" v-model="name" solo />
              </div>

            </v-col>
            <v-col cols="4">
              <div>
                <div class="text-right mb-5" >
                  استان
                </div>
                <v-autocomplete :items="provinces" :rules="rule" color="Cultured" v-model="province" solo />

              </div>

            </v-col>
            <v-col cols="4">
              <div>
                <div class="text-right mb-5" >
                  شهر
                </div>
                <v-autocomplete :items="cities" :rules="rule" color="Cultured" v-model="name" solo />
              </div>

            </v-col>
          </v-row>
        </v-col>
      </v-form>


    </v-row>
    <v-row justify="end" class="px-13 mb-10">
      <v-btn @click="$router.push('/category')" color="ChineseWhite" class="br-10" width="126" height="44">
                <span class="t14400">
                    انصراف
                </span>
      </v-btn>
      <v-btn dark @click="createCategory()" :loading="loading" color="primary" class="br-10 mr-5" width="199"
             height="44">
                <span class="t14400 white--text">
                    بارگذاری نهایی
                </span>
      </v-btn>

    </v-row>
  </v-card>
</template>

<script>
import axios from 'axios'
import VueCookies from "vue-cookies";
import {gql} from "nuxt-graphql-request";
export default {
  data() {
    return {
      name: '',
      province: '',
      city: '',
      loading: false,
      validForm:true,
      rule:[v=>!!v || 'این فیلد الزمی است'],
      provinces:[],
      cities:[],
      range:null

    }
  },

  methods: {
    async set_ranges() {
      const requestHeaders = {
        Authorization: "Bearer " + VueCookies.VueCookies.get("token"),
      };
      const query = gql`
        query{
            adminCustomer(customerId:` + id + `){

            }
          } `;
      const obj = await this.$graphql.default.request(query, {}, requestHeaders);
      this.range= obj.adminCustomer;
      this.setForm()
    },
    setForm(){
      try {
        const range = this.$store.getters['public/get_range']
        this.name = range?.name
        // this.province = range?.province?.id
        this.city = range?.province?.city?.id
      }
      catch (e) {

      }
    },
    validate(){
      this.$refs.addSkill.validate()
      setTimeout(()=>{
        if (this.validForm) this.createSkill()
      }, 200)
    },
    createSkill() {

      this.loading = true;
      axios({
        method: 'post',
        url: process.env.apiUrl + 'neighborhood/v1/admin/',
        headers: {
          Authorization: "Bearer " + this.$cookies.get("token"),
        },
        data: {
          name: this.name,
          city: this.city,
        }
      })
        .then(response => {
          this.loading = false;
          this.$router.push('/category')
          this.$store.dispatch('set_categories', '')
        })
        .catch(err => {
          this.loading = false;
        })
    }

  },
  watch:{
    province(val){
      // this.getCities(val)
    },
  },

  beforeMount() {
    this.setForm()
    this.$store.dispatch('public/set_provinces')
  }
}
</script>

<style>
.sub-category-box{
  border-radius: 10px;
  background: #F5F5F5;
  height: 44px;
  width: 100%;
}
</style>
