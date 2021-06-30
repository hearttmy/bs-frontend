import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'
import store from '@/store'

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
        component: () => import('@/views/dashboard/index'),
        meta: {
          title: '首页',
          icon: 'dashboard'
        }
      }
    ]
  },
  {
    path: '/statistic',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Statistic',
        component: () => import('@/views/dashboard/index'),
        meta: {
          title: '数据统计',
          icon: 'list'
        }
      }
    ]
  },
  {
    path: '/map',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Map',
        component: () => import('@/views/dashboard/index'),
        meta: {
          title: '地图展示',
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
        component: () => import('@/views/dashboard/index'),
        meta: {
          title: '设备配置',
          icon: 'star'
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
  }
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

router.beforeEach((to, from, next) => {
  const token = store.state.user.token
  // 这里是对登录后的值进行判断，也可对token的值进行判断
  if (to.path !== '/login' && to.path !== '/register' && !token) {
    next({ path: '/login' })
  } else {
    next()
  }
})

export default router
