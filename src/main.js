import { createApp } from 'vue'
import App from './App'
import components from '@/components/UI'
import router from './router/router'

const app = createApp(App)

// глобальная регистрация UI компонента с пом. встроенной ф-ии component
components.forEach(component => {
    app.component(component.name, component)
})

app
    .use(router) // так подключаютсяы лубые плагины/библиотеки и тд
    .mount('#app')
