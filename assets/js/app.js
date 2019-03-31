'use strict'

const routes = [
  { path: '/', redirect: '/cave' },
  { path: '/cave', component: Cave },
  { path: '/entry', component: Entry}
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

const vm = new Vue({
  router,
  data: {
    // db: null
  },
  mounted: async function(){
    window.db = new DB()
    try {
      await window.db.open()
      console.info('indexedDB open')
    }
    catch(err){
      console.log(err)
    }
  },
  methods: {

  }
})
