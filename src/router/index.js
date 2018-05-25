import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Project from '@/components/details/Project'
import Detail from '@/components/details/Detail'
import Mission from '@/components/details/others/Mission'
import Chat from '@/components/details/others/Chat'
import Share from '@/components/details/others/Share'
import File from '@/components/details/others/File'

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
                        },
                        {
                            path: 'chat',
                            name: 'Chat',
                            component: Chat,
                        },
                        {
                            path: 'share',
                            name: 'Share',
                            component: Share,
                        },
                        {
                            path: 'file',
                            name: 'File',
                            component: File,
                        },
                        {
                            path: '*',
                            redirect: ''
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
