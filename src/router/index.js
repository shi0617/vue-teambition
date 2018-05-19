import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Project from '@/components/details/Project'
import Detail from '@/components/details/Detail'
import Mission from '@/components/details/others/Mission'

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
            path: '/home',
            component: Home,
            children:[
                {
                    path: '',
                    name: 'Project',
                    component: Project,
                },
                {
                    path: 'detail',
                    component: Detail,
                    children:[
                        {
                            path: '',
                            name: 'Mission',
                            component: Mission,
                        }
                    ]
                },
                {
                    path: '*',
                    redirect: ''
                  }
            ]
        },
        {
          path: '*',
          redirect: '/login'
        }
    ]
})
