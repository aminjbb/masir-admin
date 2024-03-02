import axios from 'axios'
import {gql} from 'nuxt-graphql-request';
import VueCookies from "vue-cookies";

export const strict = false
export const state = () => ({
  branches: [],
  collections: [],
  categories: [],
  products: [],
  blogCategorys: [],
  orders: [],
  blogs: [],
  blog: '',
  customers: [],
  skills: [],
  ranges: [],
  services: [],
  servicesRequirement: [],
  vehicles:[],
  customer: '',
  productPageLength: 1,
  blogPageLength: 1,
  userPageLength: 1,
  orderPageLength: 1,
  servicePageLength: 1,
  servicesRequirementPageLength: 1,
  vehiclePageLength: 1

})

export const mutations = {
  set_vehicles(state , obj){
    state.vehicles = obj
  },
  set_vehiclePageLength(state, obj) {
    state.vehiclePageLength = obj
  },
  set_servicesRequirementPageLength(state, obj) {
    state.servicesRequirementPageLength = obj
  },
  set_servicesRequirement(state, obj) {
    state.servicesRequirement = obj
  },
  set_servicePageLength(state, obj) {
    state.servicePageLength = obj
  },
  set_service(state, obj) {
    state.services = obj
  },
  set_ranges(state, obj) {
    state.ranges = obj
  },
  set_skills(state, obj) {
    state.skills = obj
  },
  set_orderPageLength(state, num) {
    state.orderPageLength = num
  },
  set_userPageLength(state, num) {
    state.userPageLength = num
  },
  set_blogPageLength(state, num) {
    state.blogPageLength = num
  },
  set_productPageLength(state, num) {
    state.productPageLength = num
  },
  set_customer(state, obj) {
    state.customer = obj
  },
  set_customers(state, obj) {
    state.customers = obj
  },
  set_blog(state, obj) {
    state.blog = obj
  },
  set_blogs(state, obj) {
    state.blogs = obj
  },
  set_orders(state, obj) {
    state.orders = obj
  },
  set_blogCategorys(state, obj) {
    state.blogCategorys = obj
  },
  set_products(state, obj) {
    state.products = obj
  },
  set_categories(state, obj) {
    state.categories = obj
  },

  set_collections(state, obj) {
    state.collections = obj
  },

  set_branches(state, obj) {
    state.branches = obj
  },


}


export const actions = {
  async set_vehicles({commit}, page) {
    const requestHeaders = {
      Authorization: "Bearer " + VueCookies.get("token"),
    };
    const query = gql`
        query{
            adminVehicles(limit:10,offset:${page}){
                 totalCount
                results{
                id,
                name,

              }
            }
          } `;
    const obj = await this.$graphql.default.request(query, {}, requestHeaders);
    commit('set_vehiclePageLength', Math.round(obj.adminVehicles.totalCount / 20));
    commit('set_vehicles', obj.adminVehicles.results);
  },
  async set_servicesRequirement({commit}, page) {
    const requestHeaders = {
      Authorization: "Bearer " + VueCookies.get("token"),
    };
    const query = gql`
        query{
            adminServiceRequirement(limit:10,offset:${page}){
                 totalCount
                results{
                id,
                name,
                order,
                requirement
              }
            }
          } `;
    const obj = await this.$graphql.default.request(query, {}, requestHeaders);
    commit('set_servicesRequirementPageLength', Math.round(obj.adminServiceRequirementType.totalCount / 20));
    commit('set_servicesRequirement', obj.adminServiceRequirementType.results);
  },
  async set_service({commit}, page) {
    const requestHeaders = {
      Authorization: "Bearer " + VueCookies.get("token"),
    };
    const query = gql`
        query{
            adminServices(limit:10,offset:${page}){
                 totalCount
                results{
                id,
                name,
              }
            }
          } `;
    const obj = await this.$graphql.default.request(query, {}, requestHeaders);
    commit('set_servicePageLength', Math.round(obj.adminServices.totalCount / 20));
    commit('set_service', obj.adminServices.results);
  },
  async set_ranges({commit}, page) {
    const requestHeaders = {
      Authorization: "Bearer " + VueCookies.get("token"),
    };
    const query = gql`
        query{
            adminNeighborhoods(limit:10,offset:${page}){
                 totalCount
                results{
                id,
                name,
                city{
                  id
                  name
                }
              }
            }
          } `;
    const obj = await this.$graphql.default.request(query, {}, requestHeaders);
    commit('set_ranges', obj.adminNeighborhoods);
  },
  async set_skills({commit}, page) {
    const requestHeaders = {
      Authorization: "Bearer " + VueCookies.get("token"),
    };
    const query = gql`
        query{
            adminSkills(limit:10,offset:${page}){
            totalCount
                results{
                id,
                name
              }
            }
          } `;
    const obj = await this.$graphql.default.request(query, {}, requestHeaders);
    commit('set_skills', obj.adminSkills);
  },
  async set_customer({commit}, id) {
    const requestHeaders = {
      Authorization: "Bearer " + VueCookies.get("token"),
    };
    const query = gql`
        query{
            adminUsers(id:` + id + `){
                results{
                username,
                firstName,
                lastName,
                nationalId,
                email,
                mobile,
                    id

                }

            }
          } `;
    const obj = await this.$graphql.default.request(query, {}, requestHeaders);
    commit('set_customer', obj.adminUsers.results);
  },
  async set_customers({commit}, form) {
    const requestHeaders = {
      Authorization: "Bearer " + VueCookies.get("token"),
    };
    const query = gql`
        query{
            adminUsers(limit:20  ` + form + `){
                totalCount
                results{
                username,
                firstName,
                lastName,
                email,
                mobile,
                    id

                }

            }
          } `;
    const obj = await this.$graphql.default.request(query, {}, requestHeaders);
    commit('set_userPageLength', Math.ceil(obj.adminUsers.totalCount / 20));
    commit('set_customers', obj.adminUsers.results);
  },
  async set_blog({commit}, id) {
    const requestHeaders = {
      Authorization: "Bearer " + VueCookies.VueCookies.get("token"),
    };
    const query = gql`
        query{
            adminBlogPost(blogPostId:` + id + `){
                id,
                    mainTitle,
                    image,
                    createdAt,
                    canonical
                    schema
                    url
                    metaDescription
                    metaTitle
                    description
            }
          } `;
    const obj = await this.$graphql.default.request(query, {}, requestHeaders);
    commit('set_blog', obj.adminBlogPost);
  },
  async set_blogs({commit}, form) {
    const requestHeaders = {
      Authorization: "Bearer " + VueCookies.get("token"),
    };
    const query = gql`
        query{
            adminBlogPosts(limit:20  ` + form + `){
                totalCount
                results{
                    id,
                    mainTitle,
                    image,
                    CreatedAt,

                }

            }
          } `;
    const obj = await this.$graphql.default.request(query, {}, requestHeaders);

    commit('set_blogPageLength', Math.ceil(obj.adminBlogPosts.totalCount / 20));
    commit('set_blogs', obj.adminBlogPosts.results);
  },
  async set_orders({commit}, form) {
    const requestHeaders = {
      Authorization: "Bearer " + VueCookies.VueCookies.get("token"),
    };
    const query = gql`
        query{
            adminOrders(limit:20  ` + form + `){
                totalCount
                results{
                    id,
                    finalPrice,
                    delivery{
                        id,
                        name
                    }
                    address{
                        addressDetail
                    }
                    createdAt,
                    currentStatus{
                        name
                    },
                    details{
                        variantName,
                        variantUnitPriceWithoutDiscount,
                        variantUnitPrice
                    }
                    payments{
                        id,
                        amount,
                        paidAt
                    }
                    customer{
                        client{
                            mobile
                            user{
                                firstName
                            }
                        }
                    }
                }
            }
          } `;
    const obj = await this.$graphql.default.request(query, {}, requestHeaders);
    commit('set_orderPageLength', Math.round(obj.adminOrders.totalCount / 20));
    commit('set_orders', obj.adminOrders.results);
  },
  async set_blogCategorys({commit}, form) {
    const requestHeaders = {
      Authorization: "Bearer " + VueCookies.get("token"),
    };
    const query = gql`
        query{
            adminBlogCategories(limit:200  ` + form + `){
                results{
                    id,
                    name,
                }
            }
          } `;
    const obj = await this.$graphql.default.request(query, {}, requestHeaders);
    commit('set_blogCategorys', obj.adminBlogCategories.results);
  },
  async set_products({commit}, form) {
    const requestHeaders = {
      Authorization: "Bearer " + VueCookies.get("token"),
    };
    const query = gql`
        query{
            adminProducts(limit:20  ` + form + `){
                totalCount,
                results{
                    id,
                    isActive,
                    englishName,
                    persianName,
                    metaDescription,
                    metaTitle,
                    canonical,
                    schema,
                    price,
                    nofollow,
                    noindex,
                    description,
                    images{
                      image
                    }
                }
            }
          } `;
    const obj = await this.$graphql.default.request(query, {}, requestHeaders);
    commit('set_productPageLength', Math.round(obj.adminProducts.totalCount / 20));
    commit('set_products', obj.adminProducts.results);
  },
  async set_categories({commit}, form) {
    const requestHeaders = {
      Authorization: "Bearer " + VueCookies.get("token"),
    };
    const query = gql`
        query{
            adminProductCategories(limit:20  ` + form + `){
                results{
                    id,
                    name,

                }
            }
          } `;
    const obj = await this.$graphql.default.request(query, {}, requestHeaders);
    commit('set_categories', obj.adminProductCategories.results);
  },
  async set_collections({commit}, form) {
    const requestHeaders = {
      Authorization: "Bearer " + VueCookies.VueCookies.get("token"),
    };
    const query = gql`
        query{
            adminCollections(limit:20  ` + form + `){
                results{
                    id,
                    name,

                }
            }
          } `;
    const obj = await this.$graphql.default.request(query, {}, requestHeaders);
    commit('set_collections', obj.adminCollections.results);
  },
  async set_branches({commit}, form) {
    const requestHeaders = {
      Authorization: "Bearer " + VueCookies.VueCookies.get("token"),
    };
    const query = gql`
        query{
            adminBranches(limit:20  ` + form + `){
                results{
                    id,
                    name,
                    lat,
                    long,

                    address,
                    city{
                        province{
                            id,
                        },
                        id
                        name
                    }
                }
            }
          } `;
    const obj = await this.$graphql.default.request(query, {}, requestHeaders);
    commit('set_branches', obj.adminBranches.results);
  },

}


export const getters = {
  get_vehicles(state ){
    return state.vehicles
  },
  get_servicesRequirementPageLength(state) {
    return state.servicesRequirementPageLength
  },
  get_servicesRequirement(state) {
    return state.servicesRequirement
  },
  get_servicePageLength(state) {
    return state.servicePageLength
  },
  get_service(state) {
    return state.services
  },
  get_ranges(state) {
    return state.ranges
  },
  get_skills(state) {
    return state.skills
  },
  get_orderPageLength(state) {
    return state.orderPageLength
  },
  get_userPageLength(state) {
    return state.userPageLength
  },
  get_blogPageLength(state) {
    return state.blogPageLength
  },
  get_productPageLength(state) {
    return state.productPageLength
  },
  get_customer(state) {
    return state.customer
  },
  get_customers(state) {
    return state.customers
  },
  get_blog(state) {
    return state.blog
  },
  get_blogs(state) {
    return state.blogs
  },
  get_orders(state) {
    return state.orders
  },
  get_blogCategorys(state) {
    return state.blogCategorys
  },
  get_products(state) {
    return state.products
  },
  get_categories(state) {
    return state.categories
  },
  get_collections(state) {
    return state.collections
  },
  get_branches(state) {
    return state.branches
  }

}
