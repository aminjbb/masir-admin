<template>
  <v-card class="br-20 mx-10 mt-10" outlined>
    <v-row justify="center" class="my-15 pt-10">
      <v-col cols="8">
        <v-row>
          <v-col cols="6">
            <div>
              <div class="text-right mb-5" >
                نام سرویس
              </div>
              <v-text-field color="Cultured" v-model="name" solo />
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
      name: '',
    }
  },

  methods: {

    createCategory() {
      this.loading = true;
      console.log(this.image);
      axios({
        method: 'post',
        url: process.env.apiUrl + 'service/v1/admin/',
        headers: {
          Authorization: "Bearer " + this.$cookies.get("token"),
          "Content-Type": "multipart/form-data",
        },
        data: {
          name: this.name,

        }
      })
        .then(response => {
          this.loading = false;
          this.$router.push('/service')
          this.$store.dispatch('set_categories', '')
        })
        .catch(err => {
          this.loading = false;
        })
    }

  },

  watch: {
    image(val) {
      this.imageToBase64()
    },
  },

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
