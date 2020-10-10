import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import MyProjects from '../MyProjects/App'
import Desk from '../Desk/App'
import Drive from '../Desk/components/Drive.vue'
import Computer from '../Desk/components/Computer.vue'
import {Stretch} from 'vue-loading-spinner'

Vue.component('Stretch', Stretch);
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'App',
    component: App
  },
  { path: '/myprojects', name:"myprojects", component: MyProjects },
  { path: '/desk', name: 'desk', component: Desk, props(route) {
      return  route.query || {}
    },
    redirect: { name: 'computer' },
    children: [
      {
        path: 'drive',
        name: 'drive',
        component: Drive
      },
      {
        path: 'computer',
        name: 'computer',
        component: Computer
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

function hasQueryParams(route) {
  return !!Object.keys(route.query).length
}

router.beforeEach((to, from, next) => {
  if(!hasQueryParams(to) && hasQueryParams(from)){
   next({name: to.name, query: from.query});
 } else {
   next()
 }
})

new Vue({
  el: '#Authorization',
  router: router,
  template: '<router-view></router-view>'
})
