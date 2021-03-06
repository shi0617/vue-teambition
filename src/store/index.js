import Vue from 'vue'
import Vuex from 'vuex'
import cookies from "js-cookie"
Vue.use(Vuex)
let store = new Vuex.Store({
    state:{
        userData:[],
        addProjectState:false,
        createProjectName:'',
        createProjectDesc:'',
        page:"1",
        createFolderState: false,
        folderData:[],
        beforeChangeName:''
    },
    mutations:{
        checkedOne(state,payload){
            state.folderData.forEach(item=>{
                if(payload.id == item._id){
                    item.checked = payload.checked
                }
            })
        },
        allUserFile(state,payload){
            state.userData = payload
        },
        addNewFile(state,payload){
            state.userData.push(payload)
            state.addProjectState = !state.addProjectState
            state.createProjectName = ''
            state.createProjectDesc = ''
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
        },
        closeShade(state){
            state.addProjectState = !state.addProjectState
            state.createProjectName = ''
            state.createProjectDesc = ''
        },
        newProject(state){
            state.addProjectState = !state.addProjectState
        },
        page(state,payload){
            state.page = payload
        },
        createFolder(state){
            state.createFolderState = !state.createFolderState
        },
        editFolder(state,payload){
            state.folderData.forEach(item=>{
                if(payload == item._id){
                    item.edit = true
                    state.beforeChangeName = item.title
                }else{
                    item.edit = false
                }
            })
        },
        confirmChangeTitle(state,payload){
            state.folderData.forEach(item=>{
                if(payload == item._id){
                    item.edit = false
                    state.beforeChangeName = ''
                }
            })
        },
        cancelChangeTitle(state,payload){
            state.folderData.forEach(item=>{
                if(payload == item._id){
                    item.edit = false
                    item.title = state.beforeChangeName
                    state.beforeChangeName = ''
                }
            })
        },
        getFolder(state,payload){
            state.folderData = payload
        },
        deleteFolder(state,payload){
            state.folderData = state.folderData.filter(item=>{
                return item._id != payload
            })
        },
        confirmCreateFolder(state,payload){
            state.folderData.push(payload)
        },
        changeChecked(state,payload){
            state.folderData.forEach(item=>{
                item.checked = payload
            })
        }
    },
    actions:{
        
    },
    getters:{  // 都会挂载在当前实例的getters对象下
        checkedAll(state){
            if(!state.folderData.length){
                return false
            }
            return state.folderData.every(item=>item.checked)
        },
        len(state){
            let arr = state.folderData.filter(item=>{
                return item.checked
            })
            return arr.length
        },
        checkedIdArray(state){
            let arr = []
            state.folderData.forEach(item=>{
                if(item.checked){
                    arr.push(item._id)
                }
            })
            return arr
        }
    },
    modules:{}
})
export default store