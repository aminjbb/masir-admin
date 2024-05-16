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
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" :right="right" fixed app id="admin-menu">
      <div class="box-nav-laveen">
        <v-btn icon @click.stop="miniVariant = !miniVariant">
          <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
        </v-btn>
      </div>
      <v-list >
        <v-list-group
          :value="$route.name === 'index' || $route.name === 'user-profile-histort-contractor' ? true : false"
          no-action
          router
          sub-group
          class="px-2"
          prepend-icon=""
        >

          <template v-slot:activator >
            <div  class="py-2 px-2 d-flex"
                  :class="$route.name === 'index' ? 'active-style-group' : 'none-active-navigation'" >
              <v-list-item-action class="z-index-10">
                <img width="24" height="24" src="~/assets/img/package.svg" :class="$route.fullPath == '/user-profile/user-detail' ? 'active-menu-svg' :''" >
              </v-list-item-action>
              <v-list-item-content class="z-index-10">
                <v-list-item-title class="mr-8">
                  <span class="t18400 " :class="$route.fullPath == '/' ? 'white--text' :'primary--text'">مدیریت محصول</span></v-list-item-title>
              </v-list-item-content>
            </div>
          </template>

          <v-list-item router to="/"  class="px-0 pr-3">
            <v-list-item-title > <span class="primary--text " :class="$route.name === 'user-profile-contractor-list' ?'t12600' : ''">مدیریت محصول‌های مسیر</span></v-list-item-title>
          </v-list-item>
          <v-list-item router to="/user-products" class="px-0 pr-3">
            <v-list-item-title > <span class="primary--text "  :class="$route.name === 'user-profile-histort-contractor' ?'t12600' : ''">مدیریت محصول‌های کاربران</span></v-list-item-title>
          </v-list-item>
        </v-list-group>

        <v-list-item class="my-4 pa-2 mx-2 " to="/category" router exact  :class="$route.fullPath == '/category' ? 'active-style' :'deactive-style'"
                     v-model="page">
          <v-list-item-action class="z-index-10">
                        <img width="24" height="24" src="~/assets/img/grid.svg" :class="$route.fullPath == '/category' ? 'active-menu-svg' :''" >
          </v-list-item-action>
          <v-list-item-content class="z-index-10">
            <v-list-item-title>
              <span class="t18400" :class="$route.fullPath == '/category' ? 'white--text' :'primary--text'">مدیریت دسته‌بندی </span></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="my-4 pa-2 mx-2" to="/kopon" router exact
                     :class="$route.fullPath == '/kopon' ? 'active-style' :'deactive-style'" v-model="page">
          <v-list-item-action class="z-index-10">
                        <img width="24" height="24" src="~/assets/img/1212.svg" :class="$route.fullPath == '/kopon' ? 'active-menu-svg' :''" >
          </v-list-item-action>
          <v-list-item-content class="z-index-10">
            <v-list-item-title>
              <span class="t18400" :class="$route.fullPath == '/kopon' ? 'white--text' :'primary--text'">مدیریت کوپن تخفیف </span></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="my-4 pa-2 mx-2" to="/skill" router exact
                     :class="$route.fullPath == '/skill' ? 'active-style' :'deactive-style'" v-model="page">
          <v-list-item-action class="z-index-10">
            <!--            <img width="24" height="24" src="~/assets/img/info.svg" :class="$route.fullPath == '/user-profile/user-detail' ? 'active-menu-svg' :''" >-->
          </v-list-item-action>
          <v-list-item-content class="z-index-10">
            <v-list-item-title>
              <span class="t18400 "  :class="$route.fullPath == '/skill' ? 'white--text' :'primary--text'">مهارت ها </span></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="my-4 pa-2 mx-2" to="/vehicle" router exact
                     :class="$route.fullPath == '/vehicle' ? 'active-style' :'deactive-style'" v-model="page">
          <v-list-item-action class="z-index-10">
            <!--            <img width="24" height="24" src="~/assets/img/info.svg" :class="$route.fullPath == '/user-profile/user-detail' ? 'active-menu-svg' :''" >-->
          </v-list-item-action>
          <v-list-item-content class="z-index-10">
            <v-list-item-title>
              <span class="t18400"  :class="$route.fullPath == '/vehicle' ? 'white--text' :'primary--text'">وسیله ها </span></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="my-4 pa-2 mx-2" to="/service" router exact
                     :class="$route.fullPath == '/service' ? 'active-style' :'deactive-style'" v-model="page">
          <v-list-item-action class="z-index-10">
            <!--            <img width="24" height="24" src="~/assets/img/info.svg" :class="$route.fullPath == '/user-profile/user-detail' ? 'active-menu-svg' :''" >-->
          </v-list-item-action>
          <v-list-item-content class="z-index-10">
            <v-list-item-title>
              <span class="t18400"  :class="$route.fullPath == '/service' ? 'white--text' :'primary--text'">سرویس ها </span></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="my-4 pa-2 mx-2" to="/service-category" router exact
                     :class="$route.fullPath == '/service-category' ? 'active-style' :'deactive-style'" v-model="page">
          <v-list-item-action class="z-index-10">
                        <img width="24" height="24" src="~/assets/img/1212.svg" :class="$route.fullPath == '/service-category' ? 'active-menu-svg' :''" >
          </v-list-item-action>
          <v-list-item-content class="z-index-10">
            <v-list-item-title>
              <span class="t18400" :class="$route.fullPath == '/service-category' ? 'white--text' :'primary--text'">دسته بندی سرویس ها</span></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="my-4 pa-2 mx-2" to="/range" router exact
                     :class="$route.fullPath == '/range' ? 'active-style' :'deactive-style'" v-model="page">
          <v-list-item-action class="z-index-10">
            <!--            <img width="24" height="24" src="~/assets/img/info.svg" :class="$route.fullPath == '/user-profile/user-detail' ? 'active-menu-svg' :''" >-->
          </v-list-item-action>
          <v-list-item-content class="z-index-10">
            <v-list-item-title>
              <span class="t18400" :class="$route.fullPath == '/range' ? 'white--text' :'primary--text'">محله ها</span></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="my-4 pa-2 mx-2" to="/orders" router exact
                     :class="$route.fullPath == '/orders' ? 'active-style' :'deactive-style'" v-model="page">
          <v-list-item-action class="z-index-10">
                        <img width="24" height="24" src="~/assets/img/ShoppingCart.svg" :class="$route.fullPath == '/orders' ? 'active-menu-svg' :''" >
          </v-list-item-action>
          <v-list-item-content class="z-index-10">
            <v-list-item-title>
              <span class="t18400" :class="$route.fullPath == '/orders' ? 'white--text' :'primary--text'">مدیریت سفارشات </span></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="my-4 pa-2 mx-2" to="/projects" router exact
                     :class="$route.fullPath == '/projects' ? 'active-style' :'deactive-style'" v-model="page">
          <v-list-item-action class="z-index-10">
                        <img width="24" height="24" src="~/assets/img/ShoppingCart.svg" :class="$route.fullPath == '/projects' ? 'active-menu-svg' :''" >
          </v-list-item-action>
          <v-list-item-content class="z-index-10">
            <v-list-item-title>
              <span class="t18400" :class="$route.fullPath == '/projects' ? 'white--text' :'primary--text'">مدیریت پروژه‌ها</span></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="my-4 pa-2 mx-2" to="/blog" router exact
                     :class="$route.fullPath == '/blog' ? 'active-style' :'deactive-style'" v-model="page">
          <v-list-item-action class="z-index-10">
                        <img width="24" height="24" src="~/assets/img/Newspaper.svg" :class="$route.fullPath == '/blog' ? 'active-menu-svg' :''" >
          </v-list-item-action>
          <v-list-item-content class="z-index-10">
            <v-list-item-title>
              <span class="t18400" :class="$route.fullPath == '/blog' ? 'white--text' :'primary--text'">مدیریت بلاگ</span></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="my-4 pa-2 mx-2" to="/admins" router exact
                     :class="$route.fullPath == '/admins' ? 'active-style' :'deactive-style'" v-model="page">
          <v-list-item-action class="z-index-10">
                        <img width="24" height="24" src="~/assets/img/UserCircleGear.svg" :class="$route.fullPath == '/admins' ? 'active-menu-svg' :''" >
          </v-list-item-action>
          <v-list-item-content class="z-index-10">
            <v-list-item-title>
              <span class="t18400 " :class="$route.fullPath == '/admins' ? 'white--text' :'primary--text'">مدیریت ادمین ها</span></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="my-4 pa-2 mx-2" to="/user" router exact
                     :class="$route.fullPath == '/user' ? 'active-style' :'deactive-style'" v-model="page">
          <v-list-item-action class="z-index-10">
                        <img width="24" height="24" src="~/assets/img/UsersThree.svg" :class="$route.fullPath == '/user' ? 'active-menu-svg' :''" >
          </v-list-item-action>
          <v-list-item-content class="z-index-10">
            <v-list-item-title>
              <span class="t18400" :class="$route.fullPath == '/user' ? 'white--text' :'primary--text'">مدیریت کاربران</span></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="my-4 pa-2 mx-2" to="/banners" router exact
                     :class="$route.fullPath == '/banners' ? 'active-style' :'deactive-style'" v-model="page">
          <v-list-item-action class="z-index-10">
                        <img width="24" height="24" src="~/assets/img/PaintBrushBroad.svg" :class="$route.fullPath == '/banners' ? 'active-menu-svg' :''" >
          </v-list-item-action>
          <v-list-item-content class="z-index-10">
            <v-list-item-title>
              <span class="t18400" :class="$route.fullPath == '/banners' ? 'white--text' :'primary--text'">مدیریت بنر‌ها</span></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="my-4 pa-2 mx-2" to="/seo" router exact
                     :class="$route.fullPath == '/seo' ? 'active-style' :'deactive-style'" v-model="page">
          <v-list-item-action class="z-index-10">
                        <img width="24" height="24" src="~/assets/img/sliders.svg" :class="$route.fullPath == '/seo' ? 'active-menu-svg' :''" >
          </v-list-item-action>
          <v-list-item-content class="z-index-10">
            <v-list-item-title>
              <span class="t18400" :class="$route.fullPath == '/seo' ? 'white--text' :'primary--text'">SEO Pannel</span></v-list-item-title>
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
    if (!this.$cookies.get('token')) {
      this.$router.push('/login')
    }

  }
}
</script>

<style>
.active-menu-svg{
  filter: invert(83%) sepia(66%) saturate(3384%) hue-rotate(340deg) brightness(104%) contrast(101%);
}

.deactive-style{
  height: 60px;
  border-radius: 10px;
  background: #fff
}
.active-style{
  height: 60px;
  border-radius: 10px;
  background: #0C385F;
}
.active-style-group{
  border-radius: 10px;
  background: #0C385F;
}

</style>
