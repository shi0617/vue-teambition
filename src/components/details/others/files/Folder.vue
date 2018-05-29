<template>
    <ul class="list">
        <li v-for="item in folderData">
            <div class="li-left">
                <Checkbox size="large" v-nodel="item.checked" ></Checkbox>
                <span 
                    style="margin-left: 30px;" 
                    v-if="true"
                >
                    {{item.title}}
                </span>
                <input 
                    type="text" 
                    class="input" 
                    v-if="item.edit" 
                    v-focus="item.edit" 
                    v-model="item.title"
                >
                <span class="folder">
                    <Icon type="folder"></Icon>
                </span> 
            </div>
            <div class="li-right">
                <span>
                    <Icon type="arrow-move"></Icon>
                    <p>移动</p>
                </span>
                <span @click="editFolder(item._id)">
                    <Icon type="edit"></Icon>
                    <p>编辑</p>
                </span> 
                <span @click="deleteFolder(item._id)">
                    <Icon type="trash-a"></Icon>
                    <p>删除</p>
                </span> 
            </div>
        </li>
        <li v-if="$store.state.createFolderState">
            <div class="li-left">
                <Checkbox size="large"></Checkbox>
                <input 
                    type="text" 
                    class="input" 
                    v-focus="$store.state.createFolderState"
                    v-model="folderName"
                >
                <span class="folder">
                    <Icon type="folder"></Icon>
                </span> 
            </div>
            <div class="li-right" style="display:block;">
                <a @click="confirmCreateFolder">
                    确定
                </a> 
                <a @click="cancelCreateFolder">
                    取消
                </a> 
            </div>
        </li>
    </ul>
</template>
<script>
    export default{
        data(){
            return{
                folderName:'',
                folderData:[]
            }
        },
        methods:{
            cancelCreateFolder(){
                this.$store.commit('createFolder')
                this.folderName = ''
            },
            confirmCreateFolder(){
                if(this.folderName==''){
                    alert('请输入文件夹名称')
                    return
                }
                let id = this.$route.query.id
                let pid = this.$route.query.pid
                pid = pid||id
                this.http.postCreateFolder({pid,title:this.folderName})
                .then(({data})=>{
                    this.folderData.push(data.doc)
                    this.cancelCreateFolder()
                })
            },
            deleteFolder(id){
                this.http.postDeleteFolder({id})
                .then(({data})=>{
                    if(data.success){
                        this.folderData = this.folderData.filter(item=>{
                            return item._id != id
                        })
                    }else{
                        alert(data.doc)
                    }
                    
                })
            },
            editFolder(id){
                this.folderData.forEach(item=>{
                    if(id == item._id){
                        item.edit = true
                    }
                })
            }
        },
        created(){
            let id = this.$route.query.id
            let pid = this.$route.query.pid
            pid = pid||id
            this.http.getFolder({pid})
            .then(({data})=>{
                if(data.success){
                    this.folderData = data.doc
                }else{
                    alert(data.code)
                }
            })
        }
    }
</script>