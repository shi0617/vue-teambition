<template>
    <ul class="list">
        <li
            v-for="item in folderData"
            @click="thisFolder($event,item._id)"
        >
            <div class="li-left">
                <Checkbox size="large" 
                    v-model='item.checked' 
                    @on-change="checkedOne(item._id,item.checked)"></Checkbox>
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
                    @keyup.enter="confirmChangeTitle(item._id,item.title)"
                    @keyup.esc="cancelChangeTitle(item._id)"
                >
                <span class="folder">
                    <Icon type="folder"></Icon>
                </span> 
            </div>
            <div class="li-right">
                <span v-if="false">
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
                    @keyup.enter="confirmCreateFolder"
                    @keyup.esc="cancelCreateFolder"
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
                name:this.$route.query.name,
                id:this.$route.query.id
            }
        },
        methods:{
            thisFolder(ev,pid){
                let targrt = ev.target
                if(targrt.nodeName=='INPUT' || targrt.nodeName=='I') return
                
                this.$router.push({
                    query:{
                        pid,
                        name:this.name,
                        id: this.id
                    }
                })
            },
            checkedOne(id,checked){
                this.$store.commit('checkedOne',{id,checked})
            },
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
                    this.$store.commit('confirmCreateFolder',data.doc)
                    this.cancelCreateFolder()
                })
            },
            deleteFolder(id){
                this.http.postDeleteFolder({id})
                .then(({data})=>{
                    if(data.success){
                        this.$store.commit('deleteFolder',id)
                    }else{
                        alert(data.code)
                    }
                    
                })
            },
            editFolder(id){
                this.$store.commit('editFolder',id)
            },
            confirmChangeTitle(id,title){
                if(title == ''){
                    alert('请输入名称')
                    return
                }
                this.http.postChangeFolder({id,title})
                .then(({data})=>{
                    if(data.success){
                        this.$store.commit('confirmChangeTitle',id)
                    }else{
                        alert(data.code)
                    }
                })
            },
            cancelChangeTitle(id){
                this.$store.commit('cancelChangeTitle',id)
            },
            getFolder(){
                let id = this.$route.query.id
                let pid = this.$route.query.pid
                pid = pid||id
                this.http.getFolder({pid})
                .then(({data})=>{
                    if(data.success){
                        this.$store.commit('getFolder',data.doc)
                    }else{
                        alert(data.code)
                    }
                })
            }
        },
        watch:{
            $route:{
                handler:'getFolder',
                immediate:true
            }
        },
        created(){
            this.getFolder()
        },
        computed:{
            folderData(){
                return this.$store.state.folderData
            }
        }
    }
</script>