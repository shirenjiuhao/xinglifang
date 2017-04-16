import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import NotFound from '@/components/NotFound'

Vue.use(Router)

export default new Router({
  routes: [
  		{path: '/', component: Hello},
  		{path: '/404', component:NotFound},
  		{path: '*', redirect: { path: '/404' }}
    ]
})
