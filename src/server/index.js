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
    得到用户项目
*/
export function getUserFiles(params) {
    return teambition.get('/projects?user_id='+params.user_id)
}
/*
    新建项目
*/
export function postCreateFile(params) {
    return teambition.post('/created',params)
}
/*
    星标项目
*/
export function postStar(params) {
    return teambition.post('/star',params)
}
/*
    项目回收站
*/
export function postRecycle(params) {
    return teambition.post('/recycle',params)
}
/*
    删除项目
*/
export function postDelete(params) {
    return teambition.post('/delete',params)
}
/*
    改名称和描述
*/
export function postChangeName(params) {
    return teambition.post('/change',params)
}
export default {
    install(Vue){
        Vue.prototype.http = {
            postLogin,
            postSignin,
            postCreateFile,
            postStar,
            postRecycle,
            postDelete,
            postChangeName,
            getUserFiles
        }
    }
}