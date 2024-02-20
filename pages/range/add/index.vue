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

                <v-autocomplete :items="provinces" item-text="name" item-value="id" return-object :rules="rule" color="Cultured" v-model="province" solo />

              </div>

            </v-col>
            <v-col cols="4">
              <div>
                <div class="text-right mb-5" >
                  شهر
                </div>
                <v-autocomplete :items="cities" item-text="name" item-value="id" :rules="rule" color="Cultured" v-model="city" solo />
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
      <v-btn dark @click="validate()" :loading="loading" color="primary" class="br-10 mr-5" width="199"
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
export default {
  data() {
    return {
      name: '',
      province: '',
      city: '',
      loading: false,
      validForm:true,
      rule:[v=>!!v || 'این فیلد الزمی است'],
      cities:[],

    }
  },

  methods: {
    validate(){
      this.$refs.addSkill.validate()
      setTimeout(()=>{
        if (this.validForm) this.createNeighborhood()
      }, 200)
    },
    createNeighborhood() {

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
          this.$router.push('/range')
        })
        .catch(err => {
          this.loading = false;
        })
    }
  },
  watch:{
    province(val){
      try {
        this.cities = []
        this.cities = val.cities
      } catch (e) {

      }
    },
  },
  computed:{
    provinces(){
      return this.$store.getters['public/get_provinces']
    }
  },
  beforeMount() {
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
