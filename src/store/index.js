import Vue from 'vue'
import Vuex from 'vuex'
import cookies from "js-cookie"
Vue.use(Vuex)
let store = new Vuex.Store({
    state:{
        userData:[]
    },
    mutations:{
        allUserFile(state,payload){
            state.userData = payload
        },
        addNewFile(state,payload){
            state.userData.push(payload)
        },
        isStar(state,payload){
            state.userData.map(item=>{
                if(item._id == payload){
                    item.star = !item.star
                }
            })
        },
        isRecycle(state,payload){
            state.userData.map(item=>{
                if(item._id == payload){
                    item.delete = !item.delete
                }
            })
        },
        isDelete(state,payload){
            let index = state.userData.findIndex(item => {
                return item._id == payload
            })
            state.userData.splice(index,1)
        },
        isChange(state,payload){
            let index = state.userData.findIndex(item => {
                return item._id == payload._id
            })
            state.userData[index].filename = payload.filename
            state.userData[index].filedesc = payload.filedesc
        }
    },
    actions:{
        
    },
    getters:{  // 都会挂载在当前实例的getters对象下
        
    },
    modules:{}
})
export default store