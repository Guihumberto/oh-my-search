// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
      },
      {
        path: '/leges',
        name: 'Legislacao',
        component: () => import('@/views/Legislacao.vue'),
      },
      {
        path: '/text/:id',
        name: 'Texto',
        component: () => import('@/views/textoComplet.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
