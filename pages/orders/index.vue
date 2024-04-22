<template>
    <v-row justify="center" align="center">
        <v-col cols="12">
            <v-card height="64" color="primary" class="mx-3 mt-10">
                <v-row>
                    <span class="white--text ma-5 mx-15 t18600">
                        مدیریت سفارشات
                    </span>
                </v-row>
            </v-card>


            <v-card height="103" outlined class="ma-3 mx-10 br-15" v-for="order in orders" :key="order.id">
                <v-row align="center" class="fill-height">
                    <v-col cols="8">
                        <v-row justify="space-between" align="center" class="fill-height  mr-5">
                            <v-col cols="2" class="pt-5">
                                <span class="t14600">
                                    {{ order.details[0].product?.persianName }}
                                </span>
                            </v-col>
                            <v-col cols="2" class="pt-5">
                                <span class="t14600">
                                    {{ order?.customer?.user?.firstName }}
                                </span>
                            </v-col>
                            <v-col cols="2">
                                <v-row align="center" class="pr-2 pt-8">
                                    <span class="ml-2">
                                        <img src="~/assets/img/phone.svg" alt="">
                                    </span>
                                    <span class="t14400 dana-fa">
                                        {{ order?.customer?.user?.mobile }}
                                    </span>
                                </v-row>
                            </v-col>

                            <v-col cols="2" class="pt-6">
                                <div class=" text-center pt-2" :class="order.currentStatus === 'WAITING' ? 'status-box-warning' : 'status-box-success'">
                                    <span class="t14400 DeepGreen--text">{{ order.currentStatus }}</span>
                                </div>
                            </v-col>

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
export default {
    name: 'IndexPage',
    data() {
        return {
            message: '',
            page: 1
        }
    },

    computed: {
        orders() {
            return this.$store.getters['get_orders']
        },

        pageLength() {
          if ( this.$store.getters['get_orderPageLength']){
            return this.$store.getters['get_orderPageLength']
          }
          else {
            return 1
          }

        }
    },

    watch: {
        page(val) {
            let page = (val - 1) * 20
            let fillter = ',offset:' + page
            this.$store.dispatch('set_orders', fillter)
        }
    },
    methods: {
        orderClientName(e) {
            try {
                return e.customer.client.user.firstName
            } catch (error) {
                return ''
            }
        },
        orderClientMobile(e) {
            try {
                return e.customer.client.mobile
            } catch (error) {
                return ''
            }
        }
    },

    beforeMount() { this.$store.dispatch('set_orders', '') }
}
</script>

<style>
.order-chip{
  width: 118px;
  height: 40px;
  border-radius: 18.5px;
  background: #E0E0E0;

}
</style>
