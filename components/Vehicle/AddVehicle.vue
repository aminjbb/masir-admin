<template>
  <v-card min-height="250" class="mx-10 mt-5 br-15" outlined>
    <v-form v-model="valid" ref="addVehicle" @submit.prevent="validate()">
      <v-row class="pt-10 px-10">
        <v-col cols="6">
          <v-row justify="center">
            <v-col cols="3" class="pr-0">
              <div class="pr-2 mb-5">
                                <span class="t18400 black--text">
                                    نام
                                </span>
              </div>
              <v-text-field :rules="rule" v-model="name" color="black" label="نام " class="br-10" filled
                            dense></v-text-field>
            </v-col>

          </v-row>
        </v-col>

      </v-row>
    </v-form>


    <v-row justify="end" class="pa-13 ">
      <v-btn @click="close()" color="ChineseWhite" class="br-10" width="126" height="44">
                <span class="t14400">
                    انصراف
                </span>
      </v-btn>
      <v-btn :loading="loading" @click="validate()" color="DeepGreen" class="br-10 mr-5" width="199" height="44">
                <span class="t14400 white--text">
                    بارگذاری نهایی
                </span>
      </v-btn>

    </v-row>
  </v-card>
</template>

<script>
import axios from 'axios'
import { gql } from "nuxt-graphql-request";
export default {
  props: {
    close: { type: Function }
  },

  data() {
    return {
      name: '',
      valid:true,
      rule:[(v) => !!v || 'این فیلد الزامی است']
    }
  },

  methods: {

    validate() {
      this.$refs.addVehicle.validate()
      setTimeout(() => {
        if (this.valid) {
          this.createBranche()
        }
      }, 200);
    },

    resetForm() {
      this.$refs.addVehicle.reset()
      this.close()
    },

    createBranche() {
      this.loading = true;
      axios({
        method: 'post',
        url: process.env.apiUrl + 'vehicle/v1/admin/',
        headers: {
          Authorization: "Bearer " + this.$cookies.get("token"),
        },
        data: {
          name: this.name,

        }
      })
        .then(response => {
          this.loading = false;
          this.$store.dispatch('set_vehicles' , 0)
          this.close()
          this.resetForm()
        })
        .catch(err => {
          this.loading = false;
        })
    }
  }
}
</script>
