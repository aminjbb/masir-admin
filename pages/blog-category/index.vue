<template>
    <v-row justify="center" align="center">
        <v-col cols="12">
            <v-card height="64" color="primary" class="mx-3 mt-10">
                <v-row>
                    <span class="white--text ma-5 mx-15 t18600">
                        مدیریت دسته بندی بلاگ
                    </span>
                </v-row>
            </v-card>
            <v-card v-if="!addCollection && !editCollection" height="103" class="mx-10 mt-5 br-15" outlined>
                <v-row justify="space-between" class="pa-11">
                    <span class="mt-2 t14600">
                        افزودن دسته بندی
                    </span>
                    <span>
                        <v-btn @click="addCollection = true; editCollection = false" icon>
                            <img src="~/assets/img/PlusCircle.svg" alt="">
                        </v-btn>
                    </span>
                </v-row>
            </v-card>
            <AddCategory v-else-if="addCollection && !editCollection" :close="closeAdd" />

            <v-card height="103" outlined class="ma-3 mx-10 br-15" v-for="cat in categories" :key="cat.id">
                <v-row align="center" class="fill-height">
                    <v-col cols="4">
                        <v-row justify="start" align="center" class="fill-height mt-3 mr-5">

                            <span class="mr-5 t14600">
                                {{ cat.name }}
                            </span>

                        </v-row>
                    </v-col>
                    <v-col cols="8">
                        <v-row justify="end" align="center" class="fill-height mt-3 mr-5 pl-10">
<!--
                            <span>
                                <v-btn @click="categoryEdit(cat.name, cat.id)" icon>
                                    <img src="~/assets/img/edit.svg" alt="">
                                </v-btn>
                            </span> -->
                            <span class="mr-5">
                                <v-btn @click="deleteCategory(cat.id)" icon>
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
import AddCategory from '~/components/BlogCategory/AddCategory'
export default {
    components: {
        AddCategory,
    },
    data() {
        return {
            message: '',
            name: '',
            collectionId: '',
            addCollection: false,
            editCollection: false
        }
    },
    methods: {
        closeAdd() {
            this.addCollection = false;
        },
        closeEdit() {
            this.editCollection = false;
        },
        categoryEdit(name, id) {
            this.name = name
            this.collectionId = id
            this.editCollection = true;
            this.addCollection = false
        },

        deleteCategory(id){
            this.$store.commit('public/set_deleteModal', true)
            this.$store.commit('public/set_statusDelete', 'blogCategory')
            this.$store.commit('public/set_objectId', id)
        }
    },

    computed: {
        categories() {
            return this.$store.getters['get_blogCategorys']
        }
    },

    beforeMount() {
        this.$store.dispatch('set_blogCategorys', '')
    },
}
</script>
