<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-card height="64" color="primary" class="mx-3 mt-10">
        <v-row>
          <span class="white--text ma-5 mx-15 t18600">
            مدیریت پروژه‌ها
          </span>
        </v-row>
      </v-card>

      <v-card max-height="245" class="mx-10 br-15 mt-3"  v-if="edit">
        <v-row justify="start" class="px-5 pt-10">
          <v-col cols="4" class="pl-10">
            <div>
                <span class="t14600">
                    {{ projectDetail?.name }}
                </span>
            </div>
            <div class="d-flex justify-space-between align-center mt-5">
              <div class="chip-box">
                <span>خاک برداری</span>
              </div>

              <div>
                <span class="t14600 dana-fa">{{ splitChar(projectDetail?.projectServices[0]?.budget) }} تومان</span>
              </div>
            </div>
            <div class="d-flex justify-space-between align-center mt-5">
              <div>
                <span class="t14400">{{ projectDetail?.employer?.user?.firstName  }}</span>
              </div>

              <div class="d-flex justify-space-between">
                 <span class="ml-2">
                   <img src="~/assets/img/phone.svg" alt="">
                 </span>
                <span class="t14400 dana-fa">
                {{ projectDetail?.employer?.user?.mobile  }}
                </span>
              </div>
            </div>
            <div class="d-flex justify-space-between align-center mt-5">
              <div>
                <span class="t14400">تاریخ پروژه</span>
                <span class="t14400 mr-2">{{ projectDetail?.predictedStartDate }}</span>
              </div>
              <div class="d-flex justify-space-between">
                 <span class="ml-2">
                   <img src="~/assets/img/map-pin.svg" alt="">
                 </span>
                <span class="t14400 dana-fa">
                  تهران، سعادت آباد
                </span>
              </div>
            </div>
          </v-col>
          <v-col cols="5">
            <v-card height="182" class="br-20" outlined>
              <v-row justify="center" align="center" class="pa-3">
                  <v-col cols="6">
                    <span class="t14400">
                      {{ projectDetail?.employer?.user?.firstName }}
                    </span>
                  </v-col>
                <v-col cols="2" class="px-0">
                    <span class="t14400" v-if=" !projectDetail?.isPublished ">
                     در حال بررسی
                    </span>
                  <span class="t14400" v-else>
                     تایید شده
                    </span>
                </v-col>
                <v-col cols="1">
                    <span class="t14400">
                    <v-icon>
                      mdi-chevron-left
                    </v-icon>
                    </span>
                </v-col>
                <v-col cols="2">
                    <span class="t14400">
                    ثبت شده
                    </span>
                </v-col>
              </v-row>
              <v-divider/>
            </v-card>
          </v-col>
          <v-col cols="3">
            <div class="d-flex justify-end ml-2">
              <div class="status-box success-status " :class=" !projectDetail?.isPublished ? 'success-status' : 'unsuccess-status'">
                <span v-if="projectDetail?.isPublished">ثبت شده</span>
                <span v-else>در انتظار</span>
              </div>
            </div>
            <v-row justify="end" class="mt-15 ml-2">
              <v-btn @click="edit=false" color="ChineseWhite" class="br-10" width="90" height="44">
                            <span class="t14400">
                                انصراف
                            </span>
              </v-btn>
              <v-btn dark @click="publishProject()" :loading="loading" color="primary" class="br-10 mr-2" width="140"
                     height="44">
                            <span class="t14400 white--text">
                                بارگذاری نهایی
                            </span>
              </v-btn>

            </v-row>

          </v-col>
        </v-row>
      </v-card>
      <v-card height="103" outlined class="ma-3 mx-10 br-15" v-for="project in projects" :key="project.id">
        <v-row align="center" class="fill-height">
          <v-col cols="8">
            <v-row justify="space-between" align="center" class="fill-height mt-3 mr-5">
              <span class="mr-10 t14600">
                {{ project.name }}
              </span>

              <span class="mr-10 t14600">
                {{ project?.employer?.user?.firstName }}
              </span>
              <div class="pr-2 pt-4">
                                    <span class="ml-2">
                                        <img src="~/assets/img/phone.svg" alt="">
                                    </span>
                <span class="t14400 dana-fa">
                                        {{ project?.employer?.user?.mobile }}
                                    </span>
              </div>

              <div class="chip-box">
                <span>{{ project?.projectServices[0]?.service?.name }}</span>
              </div>

              <div class="status-box" :class="project?.isPublished ?'success-status' : 'unsuccess-status'">
                <span v-if="project?.isPublished">ثبت شده</span>
                <span v-else>در انتظار</span>
              </div>
            </v-row>
          </v-col>
          <v-col cols="4">
            <v-row justify="end" align="center" class="fill-height mt-3 mr-5 pl-10">

              <span>
                <v-btn @click="editProject(project)" icon>
                  <img src="~/assets/img/edit.svg" alt="">
                </v-btn>
              </span>
              <span class="mr-5">
                <v-btn @click="deleteRange(project.id)" icon>
                  <img src="~/assets/img/trash-2.svg" alt="">
                </v-btn>
              </span>

            </v-row>
          </v-col>
        </v-row>
      </v-card>
      <div class="text-center mt-5">
        <v-pagination v-model="page" :total-visible="5" :length="adminProjectsPageLength" circle
                      color="black"></v-pagination>
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
      page: 1,
      projectDetail: null,
      edit:false
    }
  },
  computed: {
    projects() {
      return this.$store.getters['get_adminProjects']
    },
    adminProjectsPageLength() {
      try {
        const pageLength = this.$store.getters['get_adminProjectsPageLength']
        if (pageLength > 0) return pageLength
        return 1
      } catch (e) {
        return 1
      }
    },

    baseUrl() {
      return process.env.baseUrl + '/media/'
    }
  },

  methods: {
    editProject(obj) {
      this.edit = true
      this.projectDetail = obj
    },

    deleteRange(id) {
      this.$store.commit('public/set_deleteModal', true)
      this.$store.commit('public/set_statusDelete', 'range')
      this.$store.commit('public/set_objectId', id)
    },

    splitChar(text) {
      if (text) {
        return text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      } else {
        return 0;
      }
  }
  },
  watch: {
    page(val) {
      const offset = (this.page - 1) * 10
      this.$store.dispatch('set_adminProjects', offset)
    }
  },
  beforeMount() {
    this.$store.dispatch('set_adminProjects', 0)
  }
}
</script>

<style>
.chip-box {
  width: 118px;
  height: 40px;
  background: #E0E0E0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 18.5px;
}

.status-box {
  width: 98px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: 1px !important;
}

.success-status {
  background: #C3FFD8;
  border-color: #1BA94C;
  color: #1BA94C;
}

.unsuccess-status {
  background: #FFE7E7;
  border-color: #EE4343;
  color: #EE4343;
}
</style>
