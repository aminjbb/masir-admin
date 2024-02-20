<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-card height="64" color="primary" class="mx-3 mt-10">
        <v-row>
          <span class="white--text ma-5 mx-15 t18600">
            مدیریت مهارت
          </span>
        </v-row>
      </v-card>
      <v-card height="103" class="mx-10 mt-5 br-15" outlined>
        <v-row justify="space-between" class="pa-11">
          <span class="mt-2 t14600">
            افزودن مهارت
          </span>
          <span>
            <v-btn to="/skill/add" icon>
              <img src="~/assets/img/PlusCircle.svg" alt="">
            </v-btn>
          </span>
        </v-row>
      </v-card>

      <v-card height="103" outlined class="ma-3 mx-10 br-15" v-for="skill in skillsList" :key="skill.id">
        <v-row align="center" class="fill-height">
          <v-col cols="4">
            <v-row justify="start" align="center" class="fill-height mt-3 mr-5">
              <span class="mr-10 t14600">
                {{ skill.name }}
              </span>

            </v-row>
          </v-col>
          <v-col cols="8">
            <v-row justify="end" align="center" class="fill-height mt-3 mr-5 pl-10">

              <span>
                <v-btn @click="editSkill(skill)" icon>
                  <img src="~/assets/img/edit.svg" alt="">
                </v-btn>
              </span>
              <span class="mr-5">
                <v-btn @click="deleteSkill(skill.id)" icon>
                  <img src="~/assets/img/trash-2.svg" alt="">
                </v-btn>
              </span>

            </v-row>
          </v-col>
        </v-row>
      </v-card>
      <div class="text-center mt-5">
        <v-pagination v-model="page" :total-visible="5" :length="skillsPageLength" circle color="black"></v-pagination>
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
    skills() {
      return this.$store.getters['get_skills']
    },
    skillsList(){
      try {
        return  this.skills.results
      }catch (e){
        return []
      }
    },
    skillsPageLength(){
      try {
        const pageLength = Math.round(this.skills.totalCount  / 20)
        if (pageLength >0) return pageLength
        return 1
      }catch (e){
        return []
      }
    },

    baseUrl() {
      return process.env.baseUrl + '/media/'
    }
  },

  methods: {
    editSkill(obj) {
      this.$store.commit('public/set_skill', obj)
      this.$router.push('/skill/' + obj.id)
    },

    deleteSkill(id) {
      this.$store.commit('public/set_deleteModal', true)
      this.$store.commit('public/set_statusDelete', 'skill')
      this.$store.commit('public/set_objectId', id)
    }
  },
  watch:{
    page(val){
      const offset = (this.page - 1) * 10
      this.$store.dispatch('set_skills', offset)
    }
  },
  beforeMount() {
    const offset = (this.page - 1) * 10
    this.$store.dispatch('set_skills', offset)
  }
}
</script>
