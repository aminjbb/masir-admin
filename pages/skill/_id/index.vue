<template>
  <v-card class="br-20 mx-10 mt-10" outlined>
    <v-row justify="center" class="my-15 pt-10">
      <v-col cols="8">
        <v-row>
          <v-col cols="6">
            <div>
              <div class="text-right mb-5">
                عنوان
              </div>
              <v-form v-model="validForm" ref="addSkill">
                <v-text-field :rules="rule" color="Cultured" v-model="name" solo/>
              </v-form>
            </div>

          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row justify="end" class="px-13 mb-10">
      <v-btn @click="$router.go(-1)" color="ChineseWhite" class="br-10" width="126" height="44">
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
import VueCookies from "vue-cookies";
import {gql} from "nuxt-graphql-request";

export default {
  data() {
    return {
      name: '',
      skill: null,
      loading: false,
      validForm: true,
      rule: [v => !!v || 'این فیلد الزمی است']
    }
  },

  methods: {
    validate() {
      this.$refs.addSkill.validate()
      setTimeout(() => {
        if (this.validForm) this.createSkill()
      }, 200)
    },
    createSkill() {
      this.loading = true;
      axios({
        method: 'put',
        url: process.env.apiUrl + `skill/v1/admin/${this.$route.params.id}/`,
        headers: {
          Authorization: "Bearer " + this.$cookies.get("token"),
        },
        data: {
          name: this.name,
        }
      })
        .then(response => {
          this.loading = false;
          this.$router.push('/skill')
          this.$store.dispatch('set_skill', '')
        })
        .catch(err => {
          this.loading = false;
        })
    },
    async getSkill() {
      const requestHeaders = {
        Authorization: "Bearer " + this.$cookies.get("token"),
      };
      const query = gql`
        query{
            adminSkills(skillId:${this.$route.params.id}){
                results{
                id,
                name
              }
            }
          } `;
      const obj = await this.$graphql.default.request(query, {}, requestHeaders);
      this.skill = obj.adminSkills?.results;
      this.name = this.skill?.name
    },
    async setForm(){
      const skill = this.$store.getters['public/get_skill']
      this.name = skill?.name
    }
  },
  beforeMount() {
    this.setForm()
  }

}
</script>

<style>
.sub-category-box {
  border-radius: 10px;
  background: #F5F5F5;
  height: 44px;
  width: 100%;
}
</style>
