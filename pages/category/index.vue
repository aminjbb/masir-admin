<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-card height="64" color="primary" class="mx-3 mt-10">
        <v-row>
          <span class="white--text ma-5 mx-15 t18600">
            مدیریت دسته بندی
          </span>
        </v-row>
      </v-card>
      <v-card height="103" class="mx-10 mt-5 br-15" outlined>
        <v-row justify="space-between" class="pa-11">
          <span class="mt-2 t14600">
            افزودن دسته‌بندی جدید
          </span>
          <span>
            <v-btn to="/category/add" icon>
              <img src="~/assets/img/PlusCircle.svg" alt="">
            </v-btn>
          </span>
        </v-row>
      </v-card>

      <v-card height="103" outlined class="ma-3 mx-10 br-15" v-for="category in categories" :key="category.id">
        <v-row align="center" class="fill-height">
          <v-col cols="4">
            <v-row justify="start" align="center" class="fill-height mt-3 mr-5">

              <span class="mr-10 t14600">
                {{ category.name }}
              </span>

            </v-row>
          </v-col>
          <v-col cols="8">
            <v-row justify="end" align="center" class="fill-height mt-3 mr-5 pl-10">

              <span>
                <v-btn @click="editCategory(category)" icon>
                  <img src="~/assets/img/edit.svg" alt="">
                </v-btn>
              </span>
              <span class="mr-5">
                <v-btn @click="deleteCategory(category.id)" icon>
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
export default {
  name: 'IndexPage',
  data() {
    return {
      message: ''
    }
  },
  computed: {
    categories() {
      return this.$store.getters['get_categories']
    },

    baseUrl() {
      return process.env.baseUrl + '/media/'
    }
  },

  methods: {
    editCategory(obj) {
      this.$store.commit('public/set_categoryEdit', obj)
      this.$router.push('/category/' + obj.id)
    },

    deleteCategory(id) {
      this.$store.commit('public/set_deleteModal', true)
      this.$store.commit('public/set_statusDelete', 'category')
      this.$store.commit('public/set_objectId', id)
    }
  },
  beforeMount() {
    this.$store.dispatch('set_categories', '')
  }
}
</script>
