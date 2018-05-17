import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Created from '@/components/Created'

Vue.use(Router)

export default new Router({
    mode:'history',
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/created',
            name: 'Created',
            component: Created
        },
        {
          path: '*',
          redirect: '/login'
        }
    ]
})
