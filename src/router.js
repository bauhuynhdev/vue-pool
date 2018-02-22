import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/pages/Home'
import Miner from '@/components/pages/Miner'
import Block from '@/components/pages/Block'
import Payment from '@/components/pages/Payment'
import Account from '@/components/pages/MinerAccount'

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'getHome',
      component: Home
    },
    {
      path: '/miners',
      name: 'getMiners',
      component: Miner
    },
    {
      path: '/blocks',
      name: 'getBlocks',
      component: Block
    },
    {
      path: '/payments',
      name: 'getPayments',
      component: Payment
    },
    {
      path: '/account/:id',
      name: 'getAccount',
      component: Account
    }
  ],
  mode: 'history'
})

export default router;
