import Vue from 'vue'
import Vuex from 'vuex'
import cookies from "js-cookie"
Vue.use(Vuex)
let store = new Vuex.Store({
    state:{
        // loginState:cookies('loginState')||false
    },
    mutations:{
        // changeLoginState(state,payload){
        //     state.loginState = payload
        // }
    },
    actions:{
        
    },
    getters:{  // 都会挂载在当前实例的getters对象下
        
    },
    modules:{}
})
export default store