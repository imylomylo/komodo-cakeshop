import Vue from 'vue'
import Router from 'vue-router'
import AppHome from '@/app/shared/components/AppHome'
import AppWallet from '@/app/wallet/components/AppWallet'
import AppContracts from '@/app/shared/components/AppContracts'
import AppConsole from '@/app/console/components/AppConsole'
import AppPeers from '@/app/peers/components/AppPeers'
import AppTx from '@/app/transactions/components/AppTx'

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
      component: AppConsole
    },
    {
      path: '/contracts',
      name: 'Contracts',
      component: AppContracts
    },
    {
      path: '/txexplorer',
      name: 'Tx',
      component: AppTx
    },
    {
      path: '/chainexplorer',
      name: 'ChainExplorer',
      component: AppHome
    },
    {
      path: '/walletexplorer',
      name: 'Wallet',
      component: AppWallet
    },
    {
      path: '/peers',
      name: 'Peers',
      component: AppPeers
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
