import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import NotFound from '@/components/NotFound'
import IndexPage from '@/components/IndexPage'
import Result from '@/components/Result'
import StartClass from '@/components/StartClass'

Vue.use(Router)

export default new Router({
  routes: [
  		{path: '/', component: Hello},
  		{path: '/404', component: NotFound},
  		{path: '/index', component: IndexPage},
  		{path: '/check', component: Result},
  		{path: '/startClass', component: StartClass},
  		{path: '*', redirect: { path: '/404' }}
    ]
})
