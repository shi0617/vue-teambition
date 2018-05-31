<template>
    <div id="file">
        <header class="library-header-wrapper">
            <div class="library-header">
                <div class="header-nav">
                    <span>文件库</span>
                    <div >
                        <a @click="createFolder">                      
                            创建文件夹
                        </a>
                        <a style="margin-left: 10px;">
                            上传
                        </a>
                    </div>
                </div>
            </div>
        </header>
        <div class="library-header-wrapper" style="top:176px;margin-top:0;">
            <div class="library-header" style="margin-top:0;border-radius:0;">
                <div class="header-nav" style="justify-content:flex-start;">
                    <Checkbox 
                        v-model="checkedAll" 
                        size="large" 
                        style="font-size:16px;"
                    >全选</Checkbox>
                    <div class="func">
                        <a v-if="false">
                            <Icon type="arrow-move"></Icon>
                            <span>移动选中</span>
                        </a>
                        <a v-if="$store.getters.len" @click="deleteChecked($store.getters.checkedIdArray)">
                            <Icon type="trash-a"></Icon>
                            <span>删除选中</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="library-content">
            <router-view></router-view>
        </div>  
    </div>
</template>
<script>
    export default{
        data(){
            return{

            }
        },
        methods:{
            createFolder(){
                this.$store.commit('createFolder')
            },
            deleteChecked(arr){
                this.http.postDeleteCheckedFolder({arr})
                .then(({data})=>{
                    if(data.success){
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
                    }else{
                        alert(data.code)
                    }
                })
            }
        },
        computed:{
            checkedAll:{
                get(){
                    return this.$store.getters.checkedAll
                },
                set(){
                    this.$store.commit('changeChecked',!this.$store.getters.checkedAll)
                }
            }
        },
        created(){
            this.$store.commit('page',"3")
        }
    }
</script>
<style>
    ul{
        padding: 0;
        margin: 0;
        list-style:none;
    }
    #file{
        position:fixed;
        top: 99px;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: #f1f1f1;
    }
    .library-header-wrapper{
        position:fixed;
        top: 99px;
        z-index: 3;
        width:100%;
    }
    .library-header{
        width:1100px;
        margin: 20px auto 0;
        padding: 18px 20px 0;
        background-color: #fff;
        border-radius: 3px 3px 0 0;
        font: 16px/20px "微软雅黑";
    }
    .library-header div a{
        display: inline-block;
        font:14px/14px "微软雅黑";
        color: #fff;
        padding: 3px 5px;
        background-color: rgba(12,119,226,.8);
        border-radius: 3px;
    }
    .library-header div a:hover{
        background-color: rgba(12,119,226,.6)
    }
    .library-header .header-nav{
        padding-bottom: 17px;
        border-bottom: 1px solid rgba(0,0,0,.2);
        display:flex;
        justify-content: space-between;
    }
    .library-header .header-nav .func{
        margin-left: 10px;
    }
    #file .library-content{ 
        width: 100%;
        position:fixed;
        top:233px;
        bottom: 0;
        margin: 0 auto;
    }
    #file .library-content .list{
        width: 1100px;
        height: 100%;
        margin: 0 auto;
        padding: 0 20px;
        overflow-y:auto;
        background-color:#fff;
    }
    #file .library-content .list li{
        padding: 18px 0 17px;
        font: 14px/20px "微软雅黑";
        border-bottom: 1px solid rgba(0,0,0,.2);
        position:relative;
        cursor:pointer;
    }
    #file .library-content .list li:hover{
        background-color:#f1f1f1;
    }
    #file .library-content .list li .li-left .folder{
        position:absolute;
        top: 7px;
        left: 20px;
        height: 40px;
        width:40px;
        font: 40px/40px "微软雅黑";
        color:rgba(12,119,226,.8);
    }
    #file .library-content .list li .li-left .input{
        position: absolute;
        top: 18px;
        left: 55px;
        height: 20px;
        padding-left:5px;
        border-radius: 3px;
        border: 1px solid rgba(0,0,0,.2);
    }
    #file .library-content .list li .li-right{
        position: absolute;
        top: 20px;
        right: 10px;
        display: none;
    }
    #file .library-content .list li:hover .li-right{
        display: block;
    }
    #file .library-content .list li .li-right span{
        font: 20px/20px "微软雅黑";
        margin-left: 10px;
        position:relative;
    }
    #file .library-content .list li .li-right span p{
        position:absolute;
        text-align:center;
        width:40px;
        top: -16px;
        left: -10px;
        padding: 3px;
        border-radius: 3px;
        font: 14px/14px '微软雅黑';
        background-color:rgba(0,0,0,.6);
        color:#fff;
        display: none;
    }
    #file .library-content .list li .li-right span:hover{
        color:rgba(12,119,226,.8);
    }
    #file .library-content .list li .li-right span:hover p{
        display:block;
    }
</style>