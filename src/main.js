import { createApp } from 'vue'
import App from './App'
import components from '@/components/UI'
import router from './router/router'
import VIntersection from '@/directives/VIntersection'

const app = createApp(App)

// глобальная регистрация UI компонента с пом. встроенной ф-ии component
components.forEach(component => {
    app.component(component.name, component)
})

app.directive('intersection', VIntersection)

app
    .use(router) // так подключаютсяы лубые плагины/библиотеки и тд
    .mount('#app')
