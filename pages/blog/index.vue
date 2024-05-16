<template>
    <v-row justify="center" align="center">
        <v-col cols="12">
            <v-card height="64" color="primary" class="mx-3 mt-10">
                <v-row>
                    <span class="white--text ma-5 mx-15 t18600">
                        مدیریت بلاگ
                    </span>
                </v-row>
            </v-card>
            <v-card height="103" class="mx-10 mt-5 br-15" outlined>
                <v-row justify="space-between" class="pa-11">
                    <span class="mt-2 t14600">
                        افزودن مطلب جدید
                    </span>
                    <span>
                        <v-btn to="/blog/add" icon>
                            <img src="~/assets/img/PlusCircle.svg" alt="">
                        </v-btn>
                    </span>
                </v-row>
            </v-card>
            <!-- <v-row class="ma-3">
          <v-col cols="2" >
            <v-text-field class="rounded-lg" v-model="message" label="Outlined" outlined clearable></v-text-field>
          </v-col>
          <v-col cols="2" >
            <v-select class="rounded-lg" v-model="message" label="Outlined" outlined clearable></v-select>
          </v-col>
          <v-col cols="2" >
            <v-btn color="#0A0A0A" height="44" width="136" class="mt-1 rounded-lg" >
              <v-row justify="space-between px-2">
                <span class="white--text">
                  فیلتر
                </span>
              </v-row>
            </v-btn>
          </v-col>
        </v-row> -->

            <v-card height="103" outlined class="ma-3 mx-10 br-15" v-for="(blog , index) in blogs" :key="blog.id">
                <v-row align="center" class="fill-height">
                    <v-col cols="8">
                        <v-row justify="space-between" align="center" class="fill-height mt-3 mr-5">
                            <span>
                                <v-img class="br-10" :lazy-src="baseUrl + blog.image" height="72" width="123"
                                    :src="baseUrl + blog.image"></v-img>
                            </span>
                            <span>
                                {{ blog.mainTitle }}
                            </span>
                            <span>
                                سنگ های قیمتی
                            </span>
                            <span>
                                {{ convertDate(blog.CreatedAt) }}
                            </span>
                            <span>
                                <v-switch @change="activePost(index)" v-model="form[index].active" color="success"></v-switch>
                            </span>


                        </v-row>
                    </v-col>
                    <v-col cols="4">
                        <v-row justify="end" align="center" class="fill-height mt-3 mr-5 pl-10">

                            <span>
                                <v-btn :to="'/blog/' + blog.id" icon>
                                    <img src="~/assets/img/edit.svg" alt="">
                                </v-btn>
                            </span>
                            <span class="mr-5">
                                <v-btn @click="deleteBlog(blog.id)" icon>
                                    <img src="~/assets/img/trash-2.svg" alt="">
                                </v-btn>
                            </span>

                        </v-row>
                    </v-col>
                </v-row>
            </v-card>
            <div class="text-center mt-5">
                <v-pagination v-model="page" :length="pageLength" circle color="black"></v-pagination>
            </div>
        </v-col>
    </v-row>
</template>

<script>
import { PublicMethod } from '~/store/classes.js'
import axios from "axios";
export default {
    name: 'IndexPage',
    data() {
        return {
            message: '',
            page: 1,
            form:[]
        }
    },

    beforeMount() {
        this.$store.dispatch('set_blogs', '')
    },

    methods: {

      activePost(index){
        axios({
          method: 'PATCH',
          url: process.env.apiUrl + `blog_post/v1/admin/${this.blogs[index].id}/`,
          headers: {
            Authorization: "Bearer " + this.$cookies.get("token"),
          },
          data: {
            is_active: this.form[index]?.active,
          }
        })
          .then(response => {
          })
          .catch(err => {
            this.loading = false;
          })
      },
        deleteBlog(id) {
            this.$store.commit('public/set_deleteModal', true)
            this.$store.commit('public/set_statusDelete', 'blog')
            this.$store.commit('public/set_objectId', id)
        },
        convertDate(date) {
            let tmpDate = date.split('T')
            let splitDate = tmpDate[0].split('-')
            let pMethod = new PublicMethod()
            return pMethod.gregorian_to_jalali(parseInt(splitDate[0]), parseInt(splitDate[1]), parseInt(splitDate[2]))
        },

        createBy(obj) {
            try {
                return obj.client.user.firstName
            } catch (error) {
                return ''
            }
        }
    },
    watch: {
        page(val) {
            let page = (val - 1) * 20
            let fillter = ',offset:' + page
            this.$store.dispatch('set_blogs', fillter)
        },
      blogs(val){
          val.forEach(element=>{
            const form = {
              active : element?.isActive
            }
            this.form.push(form)
          })
      }
    },
  destroyed() {
      this.$store.commit('set_blogs' , [])
  },
  computed: {
        blogs() {
            return this.$store.getters['get_blogs']
        },

        baseUrl() {
            return process.env.baseUrl + '/media/'
        },
        pageLength() {
            return this.$store.getters['get_blogPageLength']
        }
    }
}
</script>
