import Vue from 'vue'
import axios from 'axios'
/* 
    axios.defaults.baseURL = 'miaov.com'
*/

let teambition = axios.create({
    baseURL: 'http://localhost:8000',
   //timeout: 3000
})
/* 
    用户登录
*/
export function postLogin(params) {
    return teambition.post('/login',params)
}
/* 
    用户注册
*/
export function postSignin(params) {
    return teambition.post('/signin',params)
}
/*
    新建项目
*/
export function postCreateFile(params) {
    return teambition.post('/created',params)
}
export default {
    install(Vue){
        Vue.prototype.http = {
            postLogin,
            postSignin,
            postCreateFile
        }
    }
}