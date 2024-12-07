import Main from '@/pages/Main'
import PostPage from '@/pages/PostPage'
import About from '@/pages/About'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        component: Main,
    },  
    {
        path: '/posts',
        component: PostPage,
    },
    {
        path: '/about',
        component: About
    }
]

const router = createRouter({
    routes, 
    history: createWebHashHistory(process.env.BASE_URL) // передаем переменную окружения (опционально)
})

export default router