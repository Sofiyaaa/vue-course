import Main from '@/pages/Main'
import PostPage from '@/pages/PostsPage'
import About from '@/pages/About'
import PostIdPage from '@/pages/PostIdPage'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '',
        component: Main,
    },  
    {
        path: '/posts',
        component: PostPage,
    },
    {
        path: '/about',
        component: About,
    }, 
    {
        path: '/posts/:id',
        component: PostIdPage,
    }
]

const router = createRouter({
    history: createWebHistory(), // передаем переменную окружения (опционально)
    routes
})

export default router