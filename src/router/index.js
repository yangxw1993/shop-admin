import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/goods',
    name: '商品管理',
    meta: {
      icon: 'theme',
      title: '商品管理'
    },
    component: Layout,
    children: [
      {
        path: 'index',
        name: '商品列表',
        meta: {
          icon: 'ios-document',
          title: '商品列表'
        },
        component: () => import('@/views/goods/index')
      },
      {
        path: 'detail',
        name: '商品详情',
        meta: {
          hideInMenu: true,
          icon: 'md-clipboard',
          title: '商品详情'
        },
        component: () => import('@/views/goods/detail')
      },
      {
        path: 'add',
        name: '新增商品',
        meta: {
          icon: 'md-clipboard',
          title: '新增商品'
        },
        component: () => import('@/views/goods/addGoods')
      }
    ]
  },
  {
    path: '/order',
    name: '订单管理',
    meta: {
      icon: 'el-icon-s-order',
      title: '订单管理'
    },
    component: Layout,
    children: [
      {
        path: 'index',
        name: '订单列表',
        meta: {
          icon: 'ios-document',
          title: '订单列表'
        },
        component: () => import('@/views/order/index')
      },
      {
        path: 'after',
        name: '售后订单',
        meta: {
          hideInMenu: true,
          icon: 'md-clipboard',
          title: '商品详情'
        },
        component: () => import('@/views/order/after-sales')
      },
    ]
  },
  {
    path: '/member',
    component: Layout,
    redirect: '/member/index',
    meta: {
      icon: 'user',
      title: '会员管理'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/member/index'),
        name: 'Dashboard',
        meta: { title: '会员列表', icon: 'user', affix: true }
      }
    ]
  },
  {
    path: '/promotion',
    name: '促销管理',
    meta: {
      icon: 'el-icon-s-ticket',
      title: '促销管理'
    },
    component: Layout,
    children: [
      {
        path: 'index',
        name: '促销列表',
        meta: {
          icon: 'ios-document',
          title: '促销列表'
        },
        component: () => import('@/views/promotion/index')
      },
      {
        path: 'send-coupon',
        name: '发放优惠券',
        meta: {
          hideInMenu: true,
          icon: 'md-clipboard',
          title: '发放优惠券'
        },
        component: () => import('@/views/promotion/send-coupon')
      },
    ]
  },
  {
    path: '/content',
    name: '内容管理',
    meta: {
      icon: 'theme',
      title: '内容管理'
    },
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'H5/小程序首页',
        meta: {
          icon: 'ios-document',
          title: 'H5/小程序首页'
        },
        component: () => import('@/views/content/mini')
      },
      {
        path: 'pc',
        name: 'PC官网页面设置',
        meta: {
          hideInMenu: true,
          icon: 'md-clipboard',
          title: 'PC官网页面设置'
        },
        component: () => import('@/views/content/pc')
      },
      {
        path: 'nav',
        name: 'PC导航设置',
        meta: {
          hideInMenu: true,
          icon: 'md-clipboard',
          title: 'PC导航设置'
        },
        component: () => import('@/views/content/nav')
      },
    ]
  },
  {
    path: '/tool',
    name: '工具箱',
    meta: {
      icon: 'el-icon-suitcase',
      title: '工具箱'
    },
    component: Layout,
    children: [
      {
        path: 'send-sms',
        name: '群发短信',
        meta: {
          icon: 'el-icon-s-comment',
          title: '群发短信'
        },
        component: () => import('@/views/tool/send-sms')
      },
      {
        path: 'refresh-cdn',
        name: 'PC官网页面设置',
        meta: {
          hideInMenu: true,
          icon: 'md-clipboard',
          title: 'PC官网页面设置'
        },
        component: () => import('@/views/tool/refresh-cdn')
      }
    ]
  },
  {
    path: '/setting',
    name: '系统设置',
    meta: {
      icon: 'el-icon-setting',
      title: '系统设置'
    },
    component: Layout,
    children: [
      {
        path: 'menu',
        name: '菜单管理',
        component: () => import('@/views/setting/menu')
      },
      {
        path: 'role',
        name: '角色管理',
        component: () => import('@/views/setting/role')
      },
      {
        path: 'employee',
        name: '员工管理',
        component: () => import('@/views/setting/employee')
      }
    ]
  },
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: 'Permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'Page Permission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'Directive Permission'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: 'Role Permission',
          roles: ['admin']
        }
      }
    ]
  },






  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
