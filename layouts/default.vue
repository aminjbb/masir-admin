<template>
  <v-app dark>

    <v-app-bar :clipped-rigth="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <!-- <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn> -->
      <!-- <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn> -->

      <v-spacer />
      <!-- <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn> -->
    </v-app-bar>
    <v-main>
      <Nuxt />
      <ModalConfirmDelete />
    </v-main>
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" :right="right" fixed app>
      <div class="box-nav-laveen">
        <v-btn icon @click.stop="miniVariant = !miniVariant">
          <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
        </v-btn>
      </div>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact class="ma-5">
           <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import ModalConfirmDelete from '~/components/public/ModalConfirmDelete'
export default {
  name: 'DefaultLayout',
  components: {
    ModalConfirmDelete
  },
  data() {

    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-basket',
          title: 'مدیریت محصول',
          to: '/'
        },
        {
          icon: 'mdi-monitor',
          title: 'مدیریت مهارت ها',
          to: '/skill'
        },
        {
          icon: 'mdi-city',
          title: 'مدیریت محله ها',
          to: '/range'
        },
        {
          icon: 'mdi-shape',
          title: 'مدیریت دسته بندی',
          to: '/category'
        },
        {
          icon: 'mdi-shape',
          title: ' مدیریت دسته بندی بلاگ',
          to: '/blog-category'
        },
        {
          icon: 'mdi-toolbox-outline',
          title: 'خدمات',
          to: '/service'
        },
        {
          icon: 'mdi-toolbox-outline',
          title: 'نیاز های خدمات',
          to: '/service_requirement'
        },
        // {
        //   icon: 'mdi-chart-bubble',
        //   title: 'مدیریت کوپن تخفیف',
        //   to: '/kopon'
        // },
        // {
        //   icon: 'mdi-chart-bubble',
        //   title: 'مدیریت فروش ویژه',
        //   to: '/special-sales'
        // },

        {
          icon: 'mdi-basket-fill',
          title: 'مدیریت سفارشات',
          to: '/orders'
        },
        {
          icon: 'mdi-post',
          title: 'مدیریت بلاگ',
          to: '/blog'
        },
        // {
        //   icon: 'mdi-chart-bubble',
        //   title: 'مدیریت ادمین ها',
        //   to: '/admins'
        // },
        {
          icon: 'mdi-account-box-multiple-outline',
          title: 'مدیریت کاربران',
          to: '/user'
        },
        // {
        //   icon: 'mdi-chart-bubble',
        //   title: 'خروج',
        //   to: '/inspire'
        // },

      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
  beforeMount() {
    // if (!this.$cookies.get('token')) {
    //   this.$router.push('/login')
    // }

  }
}
</script>
