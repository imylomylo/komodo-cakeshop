import Vue from 'vue'
import Router from 'vue-router'
import AppHome from '@/components/AppHome'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'AppHome',
      component: AppHome
    },
    {
      path: '/console',
      name: 'Console',
      component: AppHome
    },
    {
      path: '/contracts',
      name: 'Contracts',
      component: AppHome
    },
    {
      path: '/sandbox',
      name: 'Sandbox',
      component: AppHome
    },
    {
      path: '/chainexplorer',
      name: 'ChainExplorer',
      component: AppHome
    },
    {
      path: '/wallet',
      name: 'Wallet',
      component: AppHome
    },
    {
      path: '/peers',
      name: 'Peers',
      component: AppHome
    },
    {
      path: '/api',
      name: 'API',
      component: AppHome
    },
    {
      path: '/help',
      name: 'Help',
      component: AppHome
    }
  ]
})
