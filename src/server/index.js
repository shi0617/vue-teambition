import axios from 'axios'
/* 
    axios.defaults.baseURL = 'miaov.com'
*/

let cn = axios.create({
    baseURL: 'https://cnodejs.org/api/v1',
   //timeout: 3000
})
/* 
    get 主题首页
    data:
        page Number 页数
        tab String 主题分类。目前有 ask share job good
        limit Number 每一页的主题数量
    params
        Object
*/
export function getTopics(params = { page: 1, tab: '', limit: 10 }) {
    return cn.get('/topics', {
        params
    })
}
/* 
    get 主题详情
    parmas: Object
        id String
*/
export function getTopicsById(params) {  // {id}
    return cn.get('/topic/' + params.id+'?accesstoken='+params.token)
}
/*
    get 用户信息
*/ 
export function getUsers(params) {  // {id}
    return cn.get('/user/' + params.loginname)
}
/*
    post 点赞
*/
export function postUps(params) {
    return cn.post('reply/'+params.id+'/ups',{accesstoken:params.token})
}
/*
    post 评论
*/
export function postReplies(params) {
    return cn.post('topic/'+params.id+'/replies',{
                                                    accesstoken:params.token,
                                                    content:params.content
                                                })
}
/* 
    post 收藏和取消收藏
*/
export function postCollect(params) {
    return cn.post('/topic_collect/collect',{topic_id:params.id,accesstoken:params.token})
}
export function postNoCollect(params) {
    return cn.post('/topic_collect/de_collect',{topic_id:params.id,accesstoken:params.token})
}
/*
    post 新建主题和编辑主题
*/
export function postNewTopic(params) {
    return cn.post('/topics',params)
}
export function postEditTopic(params) {
    return cn.post('/topic_collect/de_collect',{topic_id:params.id,accesstoken:params.token})
}
export default {
    install(Vue){
        Vue.prototype.http = {
            getTopics, 
            getTopicsById,
            getUsers,
            postUps,
            postReplies,
            postCollect,
            postNoCollect,
            postNewTopic
        }
    }
}