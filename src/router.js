import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Miner from '@/components/Miner'
import Block from '@/components/Block'
import Payment from '@/components/Payment'
import Account from '@/components/MinerAccount'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'getHome',
      component: Home
    },
    {
      path: '/miners',
      name: 'initMiners',
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
  ]
})
