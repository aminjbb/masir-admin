<template>
  <v-card class="br-20 mx-10 mt-10" outlined>
    <v-row justify="center" class="my-15 pt-10">
      <v-col cols="8">
        <v-row justify="center">
          <v-col cols="3">
            <div>
              <div class="text-right mb-5" >
                سرویس
              </div>
              <v-select :items="services" color="Cultured" v-model="service" solo />
            </div>
            <div>
            </div>
          </v-col>
          <v-col cols="3">
            <div>
              <div class="text-right mb-5" >
                نیاز
              </div>
              <v-text-field color="Cultured" v-model="requirement" solo />
            </div>
            <div>
            </div>
          </v-col>
          <v-col cols="3">
            <div>
              <div class="text-right mb-5" >
                نوع دیتا
              </div>
              <v-select color="Cultured" :items="valueTypes" v-model="valueType" solo />
            </div>
            <div>
            </div>
          </v-col>
          <v-col cols="3">
            <div>
              <div class="text-right mb-5" >
               تصویر
              </div>
              <v-switch color="success"  v-model="hasImage" solo />
            </div>
            <div>
            </div>
          </v-col>

        </v-row>
      </v-col>

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
export default {
  data() {
    return {
      service:null,
      requirement:null,
      valueType:null,
      hasImage:false,
      valueTypes:[
        {text:'متن' , value:'text'},
        {text:'عدد' , value:'number'}
      ],
    }
  },

  methods: {
    createCategory() {
      this.loading = true;
      axios({
        method: 'post',
        url: process.env.apiUrl + 'service/v1/admin/requirements/',
        headers: {
          Authorization: "Bearer " + this.$cookies.get("token"),
        },
        data: {
          service: this.service,
          requirement: this.requirement,
          value_type: this.valueType,
          does_need_image: this.hasImage,
        }
      })
        .then(response => {
          this.loading = false;
          this.$router.push('/service_requirement')
          this.$store.dispatch('set_categories', '')
        })
        .catch(err => {
          this.loading = false;
        })
    }

  },

  watch: {

  },
  computed: {
    services() {
      try {
        var cats = []
        this.$store.getters['get_service'].forEach(element => {
          var form = { text: element.name, value: element.id }
          cats.push(form)
        });
        return cats
      } catch (error) {
        return []
      }
    },
  },
  beforeMount() {
    this.$store.dispatch('set_service', 0)
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
