<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-card height="64" color="primary" class="mx-3 mt-10">
        <v-row>
                    <span class="white--text ma-5 mx-15 t18600">
                        مدیریت وسیله ها
                    </span>
        </v-row>
      </v-card>
      <v-card v-if="!addBrache && !editBranche" height="103" class="mx-10 mt-5 br-15" outlined>
        <v-row justify="space-between" class="pa-11">
                    <span class="mt-2 t14600">
                        افزودن وسیله جدید
                    </span>
          <span>
                        <v-btn icon @click="addBrache = true">
                            <img src="~/assets/img/PlusCircle.svg" alt="">
                        </v-btn>
                    </span>
        </v-row>

      </v-card>

      <AddVehicle v-else-if="addBrache && !editBranche" :close="closeAdd" />
      <div v-if="editBranche && !addBrache">
        <v-card min-height="250" class="mx-10 mt-5 br-15" outlined>
          <v-form v-model="valid" ref="editVehicle" @submit.prevent="validate()">
            <v-row class="pt-10 px-10">
              <v-col cols="6">
                <v-row justify="center">
                  <v-col cols="5" class="pr-0">
                    <div class="pr-2 mb-5">
                                            <span class="t18400 black--text">
                                                نام
                                            </span>
                    </div>
                    <v-text-field :rules="rule" v-model="name" color="black" label="نام "
                                  class="br-10" filled dense></v-text-field>
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
            <v-btn :loading="loading" @click="validate()" color="DeepGreen" class="br-10 mr-5" width="199"
                   height="44">
                            <span class="t14400 white--text">
                                بارگذاری نهایی
                            </span>
            </v-btn>

          </v-row>
        </v-card>
      </div>
      <v-card height="103" outlined class="ma-3 mx-10 br-15" v-for="vehicle  in vehicles" :key="vehicles.id">
        <v-row align="center" class="fill-height">
          <v-col cols="8">
            <v-row justify="space-between" align="center" class="fill-height  mr-5">
              <v-col cols="5">
                <div class="mb-5">
                                    <span class="t14600">
                                        {{ vehicle.name }}
                                    </span>
                </div>

              </v-col>

            </v-row>
          </v-col>
          <v-col cols="4">
            <v-row justify="end" align="center" class="fill-height mt-3 mr-5 pl-10">

                            <span>
                                <v-btn @click="editBrancheFunc(vehicle)" icon>
                                    <img src="~/assets/img/edit.svg" alt="">
                                </v-btn>
                            </span>
              <span class="mr-5">
                                <v-btn @click="deleteBranche(vehicle.id)" icon>
                                    <img src="~/assets/img/trash-2.svg" alt="">
                                </v-btn>
                            </span>

            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import AddVehicle from '~/components/Vehicle/AddVehicle.vue'
import axios from 'axios'
import { gql } from "nuxt-graphql-request";
export default {
  components: {
    AddVehicle
  },
  data() {
    return {
      addBrache: false,
      name: '',
      rule: [v => !!v || 'این فیلد الزامی است'],
      valid: true,
      loading: false,
      editBranche: false,
      vehicleId: ''
    }
  },
  computed: {

    vehicles() {
      return this.$store.getters['get_vehicles']
    }
  },



  methods: {
    mapLoad() {
      setTimeout(() => {
        this.map = true
      }, 500)
    },
    searchFunction() {
      if (this.search) {
        setTimeout(() => {
          this.searchAddress();
        }, 2000);
      } else {
        this.Address = [];
      }
    },
    async searchAddress() {
      const query =
        gql`
      query {
        neshan(requestUrl:"v1/search?term=` +
        this.search +
        `&lat=` +
        this.latLng[0] +
        `&lng=` +
        this.latLng[1] +
        `")
    } `;
      this.loadingSearch = true;
      const map = await this.$graphql.default.request(query, {});
      var text = map.neshan;
      let result = text.replace(/'/g, '"');
      const obj = JSON.parse(result);
      this.loadingSearch = false;
      this.Address = obj.items;
    },
    async getGraphLocation() {
      const query = gql`
        query {
          neshan(requestUrl:"v5/reverse?lat=`+ this.latLng1[0] + `&lng=` + this.latLng1[1] + `")
          } `;
      this.loading = true
      const map = await this.$graphql.default.request(query, {});
      var text = map.neshan
      var result = text.replace(/'/g, '"').replace(/True/g, 'true').replace(/False/g, 'false').replace(/None/g, 'null');

      var form = {
        lat: this.latLng1[0],
        lng: this.latLng1[1],
        address: JSON.parse(result)
      }

      this.$store.commit('public/set_addressOnMap', form)
      this.close()
      if (localStorage.getItem('modalMap') != 'edit') {
        this.$store.commit('public/set_addAddressModal', true)

      }


      // this.$store.commit('user/set_mapAddress', form);
      this.loading = false
    },
    getLocation() {
      if (window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition((e) => {
          this.latLng1 = [e.coords.latitude, e.coords.longitude];
        });
        console.log(this.latLng1);
      } else {
        // x.innerHTML = "Geolocation is not supported by this browser.";
      }
    },

    getCenterMap(e) {
      // console.log(e.target.getCenter());
      var latlng = e.target.getCenter();
      // console.log(latlng.lat);
      this.latLng1 = [latlng.lat, latlng.lng];
    },
    closeAdd() {
      this.addBrache = false;
      this.editBranche = false
    },
    deleteBranche(id) {
      this.$store.commit('public/set_deleteModal', true)
      this.$store.commit('public/set_statusDelete', 'branche')
      this.$store.commit('public/set_objectId', id)

    },
    editBrancheFunc(branche) {
      this.brancheId = branche.id
      this.editBranche = true
      this.addBrache = false
      try {
        this.name = branche.name
        this.address = branche.address
        this.provice = branche.city.province.id
        this.city = branche.city.id
        this.latLng1 = [branche.lat, branche.long]
      } catch (error) {

      }
    },

    validate() {
      this.$refs.editVehicle.validate()
      setTimeout(() => {
        if (this.valid) {
          this.createBranche()
        }
      }, 200);
    },

    resetForm() {
      this.$refs.editVehicle.rest()
    },

    createBranche() {
      this.loading = true;
      axios({
        method: 'PATCH',
        url: process.env.apiUrl + 'vehicle/v1/admin/' + this.brancheId + '/',
        headers: {
          Authorization: "Bearer " + this.$cookies.get("token"),
        },
        data: {
          name: this.name,
        }
      })
        .then(response => {
          this.loading = false;
          this.$store.dispatch('set_vehicles', 0)
          this.editBranche = false
          this.resetForm()
        })
        .catch(err => {
          this.loading = false;
        })
    }
  },

  beforeMount() {
    this.$store.dispatch('set_vehicles', 0)
  }
}
</script>
