<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-card height="64" color="primary" class="mx-3 mt-10">
        <v-row>
          <span class="white--text ma-5 mx-15 t18600">
            مدیریت محدوده
          </span>
        </v-row>
      </v-card>
      <v-card height="103" class="mx-10 mt-5 br-15" outlined>
        <v-row justify="space-between" class="pa-11">
          <span class="mt-2 t14600">
            افزودن محدوده
          </span>
          <span>
            <v-btn to="/range/add" icon>
              <img src="~/assets/img/PlusCircle.svg" alt="">
            </v-btn>
          </span>
        </v-row>
      </v-card>

      <v-card height="103" outlined class="ma-3 mx-10 br-15" v-for="range in rangeList" :key="range.id">
        <v-row align="center" class="fill-height">
          <v-col cols="4">
            <v-row justify="start" align="center" class="fill-height mt-3 mr-5">

              <span class="mr-10 t14600">
                {{ range.name }}
              </span>
              <span class="mr-10 t14600">
                {{ range?.city?.name }}
              </span>

            </v-row>
          </v-col>
          <v-col cols="8">
            <v-row justify="end" align="center" class="fill-height mt-3 mr-5 pl-10">

              <span>
                <v-btn @click="editRange(range)" icon>
                  <img src="~/assets/img/edit.svg" alt="">
                </v-btn>
              </span>
              <span class="mr-5">
                <v-btn @click="deleteRange(range.id)" icon>
                  <img src="~/assets/img/trash-2.svg" alt="">
                </v-btn>
              </span>

            </v-row>
          </v-col>
        </v-row>
      </v-card>
      <div class="text-center mt-5">
        <v-pagination v-model="page" :total-visible="5" :length="rangePageLength" circle color="black"></v-pagination>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      message: '',
      page:1
    }
  },
  computed: {
    ranges() {
      return this.$store.getters['get_ranges']
    },
    rangeList() {
      try {
        return this.ranges.results
      } catch (e) {
        return  []
      }
    },
    rangePageLength(){
      try {
        const pageLength = Math.round(this.ranges.totalCount  / 20)
        if (pageLength >0) return pageLength
        return 1
      }catch (e){
        return 1
      }
    },

    baseUrl() {
      return process.env.baseUrl + '/media/'
    }
  },

  methods: {
    editRange(obj) {
      this.$store.commit('public/set_range', obj)
      this.$router.push('/range/' + obj.id)
    },

    deleteRange(id) {
      this.$store.commit('public/set_deleteModal', true)
      this.$store.commit('public/set_statusDelete', 'range')
      this.$store.commit('public/set_objectId', id)
    }
  },
  watch:{
    page(val){
      const offset = (this.page - 1) * 10
      this.$store.dispatch('set_ranges', offset)

    }
  },
  beforeMount() {
    this.$store.dispatch('set_ranges', 0)
  }
}
</script>
