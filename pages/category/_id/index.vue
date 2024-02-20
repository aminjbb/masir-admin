<template>
  <v-card class="br-20 mx-10 mt-10" outlined>
    <v-row justify="center" class="my-15 pt-10">
      <v-col cols="8">
        <v-row>
          <v-col cols="6">
            <div>
              <div class="text-right mb-5" >
                نام دسته بندی
              </div>
              <v-text-field color="Cultured" v-model="name" solo />
            </div>
            <div>
              <!--                      <div class="text-right mb-5" >-->
              <!--                        <span class="primary&#45;&#45;text">-->
              <!--                          نام زیرمجموعه‌ها-->
              <!--                        </span>-->

              <!--                      </div>-->
              <!--                      <v-row justify="start">-->
              <!--                          <v-col cols="4" >-->
              <!--                            <div class="sub-category-box d-flex align-center pr-2">-->
              <!--                              <span class="primary&#45;&#45;text">-->
              <!--                                نگین دار-->
              <!--                              </span>-->
              <!--                            </div>-->
              <!--                          </v-col>-->
              <!--                          <v-col cols="4" >-->
              <!--                            <div class="sub-category-box d-flex align-center pr-2">-->
              <!--                              <span class="primary&#45;&#45;text">-->
              <!--                                نگین دار-->
              <!--                              </span>-->
              <!--                            </div>-->
              <!--                          </v-col>-->
              <!--                          <v-col cols="4" >-->
              <!--                            <div class="sub-category-box d-flex align-center pr-2">-->
              <!--                              <span class="primary&#45;&#45;text">-->
              <!--                                نگین دار-->
              <!--                              </span>-->
              <!--                            </div>-->
              <!--                          </v-col>-->
              <!--                      </v-row>-->
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
      image:'',
      pre: {
        image: '',
        base64: '',
        name: '',
        desc: ''
      },
      name: '',
      category: '',
      loading: false,
      url:''
    }
  },

  methods: {
    imageToBase64() {

      this.pre.image = this.image
      var imageFile = this.image
      var fileReader = new FileReader();
      fileReader.onload = () => {
        const srcData = fileReader.result;
        // console.log('base64:', srcData)
        this.pre.base64 = srcData
      };
      fileReader.readAsDataURL(imageFile);
    },

    createCategory() {
      this.loading = true;
      axios({
        method: 'put',
        url: process.env.apiUrl + `product_category/v1/admin/${this.$route.params.id}/`,
        headers: {
          Authorization: "Bearer " + this.$cookies.get("token"),
        },
        data: {
          name: this.name,
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
    },
    setForm(){
      const category = this.$store.getters['public/get_categoryEdit']
      this.name = category.name
    }
  },


  beforeMount() {
    this.setForm()
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
