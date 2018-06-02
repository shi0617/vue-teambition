<template>
    <div id="share">
        <div class='share_box' v-if="shareState">
            <div class='share_box_content'>
                <input type="text" placeholder="点击输入标题" v-model="shareTitle">
                <textarea placeholder="点击输入正文" v-model="shareContent"></textarea>
                <div class="div">
                    <button @click="confirmCreateShare">保存</button>
                    <button @click="cancelCreateShare">取消</button>
                </div>
            </div>
        </div>
        <div class='share_box' v-if="changeState">
            <div class='share_box_content'>
                <input type="text" placeholder="点击输入标题" v-model="changeObj.title" v-focus="changeState"> 
                <textarea placeholder="点击输入正文" v-model="changeObj.content"></textarea>
                <div class="div">
                    <button @click="confirmChangeShare">保存</button>
                    <button @click="cancelChangeShare">取消</button>
                </div>
            </div>
        </div>
        <div class="wall-view">
            <div class="wall-wrap">
                <div class="wall-left-column">
                    <header class="wall-left-column-header">
                        <a @click="addShare">
                            <span style="font-size: 20px;">
                                <Icon type="ios-plus"></Icon>
                            </span>
                            <span>添加分享</span>
                        </a>
                    </header>
                    <nav class="posts-navigator">
                        <Menu 
                            theme="light" 
                            style="width:100%"
                            @on-select='selectMenu' 
                        >
                            <MenuItem 
                                v-for="item,index in shareData"
                                :name="index" 
                                :key="item._id"
                                style="font:16px/20px '微软雅黑';"
                                :class="{color:page== index}"
                            >
                                <Icon type="cloud"></Icon>
                                {{item.title}}
                            </MenuItem>
                        </Menu>
                        <div class="nothing" v-if="!shareData.length">
                            目前还没有内容
                        </div>
                    </nav>
                </div>
                <div class="wall-right-column" v-if="shareData.length">
                    <div class="edit">
                        <span style="float:left" @click="editShare">
                            <Icon type="edit"></Icon>
                        </span>
                        <span style="float:right" @click="deleteShare(showObj._id)">
                            <Icon type="trash-a"></Icon>
                        </span>
                    </div>
                    <header class="head">
                        {{showObj.title}}
                    </header>
                    <div class="content">
                        {{showObj.content}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                shareTitle:'',
                shareContent:'',
                shareState: false,
                shareData:[],
                page:'0',
                showObj:{},
                changeObj:{},
                changeState:false
            }
        },
        methods:{
            editShare(){
                this.changeState = true
                this.changeObj = {...this.showObj}
            },
            confirmChangeShare(){
                this.http.postChangeShare({
                    id:this.changeObj._id,
                    title:this.changeObj.title,
                    content:this.changeObj.content
                }).then(({data})=>{
                    if(data.success){
                        this.showObj = {...this.changeObj}
                        this.shareData.forEach(item=>{
                            if(item._id == this.changeObj._id){
                                item.content = this.changeObj.content
                                item.title = this.changeObj.title
                            }
                        })
                        this.changeState = false
                        this.changeObj= {}
                    }else{
                        alert(data.code)
                    }
                })
            },
            cancelChangeShare(){
                this.changeState = false
                this.changeObj= {}
            },
            addShare(){
                this.shareState = !this.shareState
            },
            confirmCreateShare(){
                if(this.shareTitle == ''||this.shareContent == ''){
                    alert('标题和内容不能为空')
                    return
                }
                let pid = this.$route.query.id
                this.http.postCreateShare({pid,title:this.shareTitle,content:this.shareContent})
                .then(({data})=>{
                    if(data.success){
                        this.shareData.push(data.doc)
                        this.showObj = this.shareData[0]
                        this.shareTitle=''
                        this.shareContent=''
                    }else{
                        alert(data.code)
                    }
                })
                this.shareState = !this.shareState
            },
            cancelCreateShare(){
                this.shareState = !this.shareState
                this.shareTitle = ''
                this.shareContent = ''
            },
            selectMenu(name){
                this.$router.push({
                    query:{
                        ...this.$route.query,
                        page:name
                    }
                })
                this.showObj = this.shareData[name]
                this.page = name
            },
            deleteShare(id){
                this.http.postDeleteShare({id})
                .then(({data})=>{
                    if(data.success){
                        this.shareData = this.shareData.filter(item =>{
                           return id!= item._id
                        })
                        this.$router.push({
                            query:{
                                name:this.$route.query.name,
                                id:this.$route.query.id
                            }
                        })
                        this.page = "0"
                        this.showObj = this.shareData[0]||{}
                    }else{
                        alert(data.code)
                    }
                })
            }
        },
        created(){
            this.$store.commit('page',"2")
            this.page = this.$route.query.page||'0'
            let pid = this.$route.query.id
            this.http.getShare({pid})
            .then(({data})=>{
                if(data.success){
                    this.shareData = data.doc
                    this.showObj=this.shareData[this.page]
                }else{
                    alert(data.code)
                }
            })
        }
    }
</script>
<style>
    #share{
        position:fixed;
        top: 99px;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: #f1f1f1;
    }
    #share .wall-view{
        position: fixed;
        top: 120px;
        right: 0;
        bottom: 0;
        left: 0;
    }
    #share .wall-view .wall-wrap{
        position: relative;
        width: 1100px;
        max-width: 1260px;
        height: 100%;
        margin: 0 auto;
        overflow: hidden;
        background-color: #fff;
        border-radius: 3px 3px 0 0;
        box-shadow: 0 2px 3px rgba(0,0,0,.1);
    }
    .wall-view .wall-left-column {
        position: relative;
        float: left;
        width: 330px;
        height: 100%;
        border-right: 1px solid rgba(0,0,0,.1);
    }
    .wall-view .wall-left-column-header {
        padding: 14px 12px 10px;
        border-bottom: 1px solid rgba(0,0,0,.12);
        text-align:center;
    }
    .wall-left-column-header a{
        font: 16px/20px "微软雅黑";
        color: rgba(12,119,226,.8)
    }
    .wall-left-column-header a:hover{
        font: 16px/20px "微软雅黑";
        color: rgba(12,119,226,.6)
    }
    .wall-view .posts-navigator {
        position: absolute;
        top: 48px;
        bottom: 0;
        width: 100%;
        overflow-y: auto;
    }
    .wall-view .posts-navigator .nothing{
        width:100%;
        height: 100%;
        font: 16px/100px '微软雅黑';
        color: rgba(12,119,226,.8);
        text-align:center;
    }
    .wall-view .wall-right-column{
        margin-left: 330px;
        font: 16px/20px '微软雅黑';
        position:relative;
    }
    .wall-view .wall-right-column .head{
        padding: 30px 15px;
    }
    .wall-view .wall-right-column .content{
        padding: 0px 15px;
    }
    .wall-view .wall-right-column .edit{
        position:absolute;
        top: 20px;
        right: 15px;
        height:20px;
    }
    .wall-view .wall-right-column .edit span{
        margin-left:10px;
        font: 16px/20px '微软雅黑';
        cursor:pointer;
    }
    .wall-view .wall-right-column .edit span:hover{
        color:rgba(12,119,226,.8);
    }
    .share_box{
        position:fixed;
        left:0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color:#fff;
        z-index:9;
        display:flex;
    }
    .share_box_content{
        width: 965px;
        height: 600px;
        margin: auto;
    }
    .share_box_content .div{
        width: 200px;
        display:flex;
        justify-content:space-between;
        margin: 10px auto;
    }
    .share_box_content .div button{
        font: 16px/20px '微软雅黑';
        color: #fff;
        background-color:rgba(12,119,226,.8);
        border: none;
        padding:5px 10px;
        border-radius:3px;
        outline: none;
        cursor: pointer;
    }
    .share_box_content .div button:hover{
         background-color:rgba(12,119,226,.6)
    }
    .share_box_content input,
    .share_box_content textarea{
        width: 100%;
        padding:5px 0;
        font: 16px/20px '微软雅黑';
        border-radius:3px;
        border:none;
        margin-bottom: 15px;
    }
    .share_box_content textarea{
        height: 472px;
        resize:none;
    }
    .color{
        color:rgba(12,119,226,.8)
    }
</style>