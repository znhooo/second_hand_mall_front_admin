import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/user/list',
    name: 'dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },


  //用户设置
  {
    path: '/user',
    component: Layout,
    redirect: '/user/list',
    name: 'user',
    meta: { title: '用户设置', icon: 'user' },
    children: [
      {
        path: 'list',
        name: 'userList',
        component: () => import('@/views/user/list'),
        meta: { title: '用户列表', icon: 'table' }
      },
      {
        path: 'add',
        name: 'userAdd',
        component: () => import('@/views/user/add'),
        meta: { title: '用户添加', icon: 'tree' }
      },
      {
        path: 'update/:id',
        name: 'userEdit',
        component: () =>import('@/views/user/add'),
        meta: { title: '编辑', noCache: true },
        hidden: true
      },
    ]
  },

  //商品设置
  {
    path: '/good',
    component: Layout,
    redirect: '/good/list',
    name: 'good',
    alwaysShow: true,
    meta: { title: '商品设置', icon: 'example' },
    children: [
      {
        path: 'list',
        name: 'goodList',
        component: () => import('@/views/good/list'),
        meta: { title: '商品列表', icon: 'table' }
      },
      {
        path: 'update/:id',
        name: 'goodEdit',
        component: () =>import('@/views/good/add'),
        meta: { title: '编辑', noCache: true },
        hidden: true
      },
    ]
  },

  //数据字典
  {
    path: '/dict',
    component: Layout,
    redirect: '/dict/list',
    name: 'dict',
    alwaysShow: true,
    meta: { title: '数据管理', icon: 'table' },
    children: [
      {
        path: 'list',
        name: 'dictList',
        component: () => import('@/views/dict/list'),
        meta: { title: '数据字典', icon: 'tree' }
      }
    ]
  },


   //订单设置
   {
    path: '/order',
    component: Layout,
    redirect: '/order/list',
    name: 'order',
    alwaysShow: true,
    meta: { title: '订单设置', icon: 'form' },
    children: [
      {
        path: 'list',
        name: 'orderList',
        component: () => import('@/views/order/list'),
        meta: { title: '订单列表', icon: 'table' }
      },
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
