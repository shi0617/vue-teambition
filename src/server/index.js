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
/*
    获取任务
*/
export function getMissionsByPid(params) {
    return teambition.get('/projectmissions?pid='+params.pid)
}
/*
    新建任务
*/
export function postCreateMission(params) {
    return teambition.post('/mission',params)
}
/*
    删除任务
*/
export function postDeleteMission(params) {
    return teambition.post('/deletemission',params)
}
/*
    编辑任务
*/
export function postEditMission(params) {
    return teambition.post('/editmission',params)
}
/*
    添加任务
*/
export function postAddMission(params) {
    return teambition.post('/addmission',params)
}
/*
    删除任务
*/
export function postDeleteThisMission(params) {
    return teambition.post('/deletethismission',params)
}
/*
    修改任务
*/
export function postChangeThisMission(params) {
    return teambition.post('/changethismission',params)
}
/*
    获取文件夹
*/
export function getFolder(params) {
    return teambition.get('/getfolder?pid='+ params.pid)
}
/*
    创建文件夹
*/
export function postCreateFolder(params) {
    return teambition.post('/createfolder',params)
}
/*
    删除文件夹
*/
export function postDeleteFolder(params) {
    return teambition.post('/deletefolder',params)
}
/*
    修改文件夹名称文件夹
*/
export function postChangeFolder(params) {
    return teambition.post('/changefolder',params)
}
/*
    删除选中文件夹
*/
export function postDeleteCheckedFolder(params) {
    return teambition.post('/deletecheckedfolder',params)
}
/*
    获取分享
*/
export function getShare(params) {
    return teambition.get('/getshare?pid='+ params.pid)
}
/*
    创建分享
*/
export function postCreateShare(params) {
    return teambition.post('/createshare',params)
}
/*
    删除分享
*/
export function postDeleteShare(params) {
    return teambition.post('/deleteshare',params)
}
/*
    修改分享
*/
export function postChangeShare(params) {
    return teambition.post('/changeshare',params)
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
            postCreateMission,
            postDeleteMission,
            postEditMission,
            postAddMission,
            postDeleteThisMission,
            postChangeThisMission,
            postCreateFolder,
            postDeleteFolder,
            postChangeFolder,
            postDeleteCheckedFolder,
            postCreateShare,
            postDeleteShare,
            postChangeShare,
            getShare,
            getFolder,
            getUserFiles,
            getMissionsByPid
        }
    }
}