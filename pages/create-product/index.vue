<template>
    <div>
        <v-form v-model="valid" ref="addProduct">
            <v-row justify="center" class="mt-15 pt-10">
                <v-col cols="5">
                    <v-row justify="center">
                        <div class="select-image-box">
                            <label class="label">
                                <div class="text-center">
                                    <img :src="pre?.base64" v-if="pre?.base64" width="394" height="394" alt=""
                                        class="mt-17 br-25">
                                    <img src="~/assets/img/ImageSquare.png" v-else alt="">
                                    <div class="text-center" v-if="!pre?.base64">
                                        <span class="t14400">محل بارگذاری تصویر محصول</span>
                                    </div>
                                    <v-file-input class="default-file-input" v-model="image" accept="image/*"
                                        label="File input"></v-file-input>
                                </div>
                            </label>

                        </div>

                        <div class="mx-3">
                            <div class="selected-image-box">
                              {{main[0]?.base64}}
                                <img :src="main[0]?.base64" v-if="main[0]" width="117px" height="117px" alt=""
                                    class="br-15" />
                            </div>
                            <div class="selected-image-box mt-5">
                                <img :src="main[1]?.base64" v-if="main[1]" width="117px" height="117px" alt=""
                                    class="br-15" />
                            </div>
                            <div class="selected-image-box mt-5">
                                <img :src="main[2]?.base64" v-if="main[2]" width="117px" height="117px" alt=""
                                    class="br-15" />
                            </div>
                        </div>
                    </v-row>

                    <div class="ma-8 mr-15 pr-10">
                        <v-btn @click="saveImage()" color="primary" class="br-10 mr-5" width="136" height="44">
                            <span class="t14400 white--text">
                                بارگذاری عکس
                            </span>
                        </v-btn>
                    </div>
                </v-col>
                <v-col cols="5">
                    <v-from v-model="valid" ref="product">
                        <div>
                            <div class="pr-12 "><span class="t18400 black--text">نام محصول</span></div>
                            <div class="mx-12 ml-14 mt-3">
                                <v-text-field v-model="product.name" :rules="rule" color="black" label="نام محصول"
                                    class="br-10" filled dense></v-text-field>
                            </div>
                            <div class="pr-12 "><span class="t18400 black--text">انتخاب دسته بندی</span></div>
                            <div class="mx-12 ml-14 mt-3">
                                <v-select :items="categories" v-model="product.category"  color="black"
                                    label="دسته بندی" class="br-10" filled dense></v-select>
                            </div>
                            <div class="pr-12 "><span class="t18400 black--text">قیمت</span></div>
                            <div class="mx-12 ml-14 mt-3">
                                <v-text-field  v-model="product.price" color="black" label="قیمت"
                                    class="br-10" filled dense></v-text-field>
                            </div>
<!--                            <div class="mx-12 ml-14 ">-->
<!--                                <v-text-field v-model="product.metaTitle" :rules="rule" color="black" label="Meta title"-->
<!--                                    class="br-10" filled dense></v-text-field>-->
<!--                            </div>-->
<!--                            <div class="mx-12 ml-14">-->
<!--                                <v-textarea v-model="product.metaDescription" :rules="rule" color="black"-->
<!--                                    label="Meta Description" class="br-10" filled dense></v-textarea>-->
<!--                            </div>-->
                        </div>
                    </v-from>
                </v-col>
                <v-col cols="9">
                  <div class="mx-12 ml-14 mt-8">
                    <v-text-field v-model="product.englishName" color="black" label="Alternative name" class="br-10"
                                  filled dense></v-text-field>
                  </div>
                  <div class="mx-12 ml-14">
                    <v-textarea v-model="product.desc" color="black" label="Alternative Caption" class="br-10" filled
                                dense></v-textarea>
                  </div>
                </v-col>
            </v-row>
            <v-row justify="center" class="mt-15 pt-10">
                <v-col cols="5">
                    <div class="box-card mr-10 py-15 pt-8">
                        <v-row justify="center">
                            <v-col cols="9">
                                <v-text-field v-model="product.pastUrl"  color="black" label="Past URL" class="br-10 py-2" hide-details filled
                                    dense></v-text-field>

                                <v-text-field v-model="product.url" color="black" label="New URL" class="br-10" py-1
                                    hide-details filled dense></v-text-field>

                            </v-col>
                            <v-col cols="2">
                                <span class="t18400">Redirect</span>
                            </v-col>
                        </v-row>
                    </div>

                    <div class="box-card mr-10 mt-15 py-5 pt-8">
                        <v-row justify="end" class="px-8">
                            <v-card outlined class="br-10  ml-15" max-height="40" width="194">
                                <v-item-group v-model="indexPage" active-class="btn2_toggle-plp">

                                    <v-item v-slot="{ active, toggle }" value="noIndex">
                                        <v-btn width="94" height="40" depressed rounded class="br-10" large @click="toggle"
                                            :color="active ? 'DeepCarminePink' : 'transparent'">

                                            <span class="t14400" :class="active ? 'white--text' : ''"> No Index</span>
                                        </v-btn>
                                    </v-item>
                                    <v-item v-slot="{ active, toggle }" value="index">
                                        <v-btn width="94" height="40" depressed rounded class="br-10" large @click="toggle"
                                            :color="active ? 'DeepGreen' : 'transparent'">

                                            <span class="t14400" :class="active ? 'white--text' : ''">Index</span>
                                        </v-btn>
                                    </v-item>
                                </v-item-group>
                            </v-card>
                            <span class="t18400 mt-2">
                                INDEX
                            </span>


                        </v-row>
                        <v-row justify="end" class="px-8 mt-6 mb-2">
                            <v-card outlined class="br-10  ml-11" max-height="40" width="194">
                                <v-item-group v-model="FollowPage" active-class="btn2_toggle-plp">

                                    <v-item v-slot="{ active, toggle }" value="Unfollow">
                                        <v-btn width="94" height="40" depressed rounded class="br-10" large @click="toggle"
                                            :color="active ? 'DeepCarminePink' : 'transparent'">

                                            <span class="t14400" :class="active ? 'white--text' : ''">Unfollow</span>
                                        </v-btn>
                                    </v-item>
                                    <v-item v-slot="{ active, toggle }" value="Follow">
                                        <v-btn width="94" height="40" depressed rounded class="br-10" large @click="toggle"
                                            :color="active ? 'DeepGreen' : 'transparent'">

                                            <span class="t14400" :class="active ? 'white--text' : ''">Follow</span>
                                        </v-btn>
                                    </v-item>
                                </v-item-group>
                            </v-card>
                            <span class="t18400 mt-2">
                                ROBOTS
                            </span>


                        </v-row>
                    </div>

<!--                    <div class="box-card mr-10 mt-15 py-5 pt-8">-->
<!--                        <v-row justify="space-between" class="px-8 pb-2">-->
<!--                            <FAQA ref="FAQA" />-->

<!--                            <span class="t18400 mt-2">-->
<!--                                FAQA-->
<!--                            </span>-->

<!--                        </v-row>-->

<!--                    </div>-->
                </v-col>
                <v-col cols="5">
                    <div class="box-card mr-10 py-4 pt-8">
                        <div>
                            <div class="pl-14 text-left"><span class="t18400 black--text">Meta Keyword</span></div>
                            <div class="mx-12 ml-14 mt-3">
                                <v-combobox   multiple v-model="product.metaKeyword" color="black" label="Meta Keyword" class="br-10" filled dense></v-combobox>
                            </div>
                            <div class="pl-14 text-left"><span class="t18400 black--text">Meta Title</span></div>
                            <div class="mx-12 ml-14 mt-3">
                                <v-text-field v-model="product.metaTitle" color="black" label="Meta Title" class="br-10"
                                    filled dense></v-text-field>
                            </div>
                            <div class="pl-14 text-left"><span class="t18400 black--text">Meta Description</span></div>
                            <div class="mx-12 ml-14 mt-3">
                                <v-textarea v-model="product.metaDescription" color="black" label="Meta Description"
                                    class="br-10" filled dense></v-textarea>
                            </div>
                            <div class="pl-14 text-left"><span class="t18400 black--text">Canonical</span></div>
                            <div class="mx-12 ml-14 mt-3">
                                <v-text-field v-model="product.canonical" color="black" label="Canonical" class="br-10"
                                    filled dense></v-text-field>
                            </div>

                        </div>
                    </div>

                </v-col>

                <v-col cols="10">
                    <v-row justify="end" class="px-13 my-10">
                        <v-btn @click="$router.push('/')" color="ChineseWhite" class="br-10" width="126" height="44">
                            <span class="t14400">
                                انصراف
                            </span>
                        </v-btn>
                        <v-btn dark @click="validate()" :loading="loading" color="primary" class="br-10 mr-5" width="199"
                            height="44">
                            <span class="t14400 white--text">
                                بارگذاری نهایی
                            </span>
                        </v-btn>

                    </v-row>
                </v-col>
            </v-row>
        </v-form>



    </div>
</template>

<script>
import FAQA from '~/components/Product/FAQA.vue'
import axios from 'axios'
export default {
    components: {
        FAQA
    },
    data() {
        return {
          indexPage:'index',
          FollowPage:'Follow',
            image: '',
            pre: {
                image: '',
                base64: '',

            },
            main: [],
            valid: true,
            rule: [v => !!v || 'این فیلد الزامی است'],
            loading: false,
            product: {
                name: '',
                category: '',
                price: '',
                metaTitle: '',
                metaDescription: '',
                canonical: '',
                url: '',
                pastUrl:null,
                metaKeyword:[],
                englishName: '',
                desc: ''
            }
        }
    },

    methods: {
        imageToBase64() {
            this.pre.image = this.image
            var imageFile = this.image
            var fileReader = new FileReader();
            fileReader.onload = () => {
                const srcData = fileReader.result;
                // console.log('base64:', srcData)
                this.pre.base64 = srcData
            };
            fileReader.readAsDataURL(imageFile);
        },
        saveImage() {
            this.main.push(this.pre)
            this.pre = {
                image: '',
                base64: '',

            }
        },

        validate() {
            this.$refs.addProduct.validate()
            setTimeout(() => {
                if (this.valid) {
                    this.createProduct()
                }

            }, 200);
        },

        createProduct() {
            this.loading = true;
            axios({
                method: 'post',
                url: process.env.apiUrl + 'product/v1/admin/',
                headers: {
                    Authorization: "Bearer " + this.$cookies.get("token"),
                    // "Content-Type": "multipart/form-data",
                },
                data: {
                    persian_name: this.product.name,
                    english_name: this.product.englishName,
                    meta_title: this.product.metaTitle,
                    meta_description: this.product.metaDescription,
                    keywords: this.product.metaKeyword,
                    canonical :this.product.canonical,
                    description: this.product.desc,
                    is_active: false,

                    price: this.product.price
                }
            })
                .then(response => {
                    this.loading = false;
                    // this.categoryAssignment( response.data.id)
                    this.main.forEach(element => {
                        this.uploadImage(element, response.data.id)
                    });
                    this.$router.push('/')
                    this.$store.dispatch('set_products', '')
                })
                .catch(err => {
                    this.loading = false;
                })
        },

        categoryAssignment(id){
            axios({
                method: 'post',
                url: process.env.apiUrl + 'category/admin/assignment/',
                headers: {
                    Authorization: "Bearer " + this.$cookies.get("token"),
                    "Content-Type": "multipart/form-data",
                },
                data: {
                    product: id,
                    category: this.product.category,

                }
            })
                .then(response => {

                })
                .catch(err => {
                    this.loading = false;
                })
        },

        uploadImage(obj, id) {
            axios({
                method: 'post',
                url: process.env.apiUrl + 'product/v1/admin/image/',
                headers: {
                    Authorization: "Bearer " + this.$cookies.get("token"),
                    "Content-Type": "multipart/form-data",
                },
                data: {
                    product: id,
                    image: obj.image,
                }
            })
                .then(response => {

                })
                .catch(err => {
                    this.loading = false;
                })
        }

    },

    watch: {
        image(val) {
            this.imageToBase64()
        },


    },

    beforeMount() {
        this.$store.dispatch('set_categories', '')
    },

    computed: {
        categories() {
            var cats = []
            this.$store.getters['get_categories'].forEach(element => {
                var form = {
                    text: element.name,
                    value: element.id
                }
                cats.push(form)
            });
            return cats
        },
        collections() {
            var collections = []
            this.$store.getters['get_collections'].forEach(element => {
                var form = {
                    text: element.name,
                    value: element.id
                }
                collections.push(form)
            });
            return collections
        }
    }
}
</script>
