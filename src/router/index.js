import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/Dashboard'),
        meta: {
          title: '首页',
          icon: 'dashboard'
        }
      }
    ]
  },
  {
    path: '/settings',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Settings',
        component: () => import('@/views/settings/Dashboard'),
        meta: {
          title: '设备配置',
          icon: 'dashboard'
        }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    name: 'User',
    redirect: 'noRedirect',
    meta: {
      title: '登录&注册',
      icon: 'peoples'
    },
    children: [
      {
        path: 'login',
        redirect: '/login',
        name: 'Login',
        meta: {
          title: '登录',
          icon: 'user'
        }
      },
      {
        path: 'register',
        redirect: '/register',
        name: 'Register',
        meta: {
          title: '注册',
          icon: 'user'
        }
      }
    ]
  },
]

const createRouter = () => new VueRouter({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
