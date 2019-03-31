'use strict'

const routes = [
  { path: '/', redirect: '/cave' },
  { path: '/cave', component: Cave },
  { name: 'entry', path: '/entry/:id?', component: Entry},
  { path: '*', component: Err404 }
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

const vm = new Vue({
  router,
  data: {
  },
  created: async function(){
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
