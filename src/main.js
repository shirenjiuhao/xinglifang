// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App'
import router from './router'

Vue.use(ElementUI)
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  //NProgress.start();
  if (to.path == '/') {
    localStorage.removeItem('user');
  }
  let user = JSON.parse(localStorage.getItem('user'));
  if (!user && to.path != '/') {
    next({ path: '/' })
  } else {
    next()
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
