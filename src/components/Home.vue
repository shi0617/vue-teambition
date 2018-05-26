<template>
    <div class="box">
        <div class= "shade" v-if="$store.state.addProjectState">
            <div class="shade_box">
                <header class="new_head">
                    <div class="title">创建项目</div> 
                    <div class="close" @click="closeShade">X</div>
                </header>
                <div class="pic"></div>
                <div class="tag">为不同的事物建立不同的项目</div>
                <input 
                    type="text" 
                    class="text" 
                    placeholder="项目名称（必填）" 
                    v-model="$store.state.createProjectName"
                    v-focus="$store.state.addProjectState"
                >
                <textarea 
                    placeholder="项目简介（选填）" 
                    class="area" 
                    v-model="$store.state.createProjectDesc"
                >
                </textarea>
                <input 
                    value="完成并创建" 
                    type="button" 
                    class="sub" 
                    @click="finishCreateProject"
                >
            </div>
        </div>
        <header class="head">
            <div class="search_new">
                <input type="text" placeholder="输入搜索内容">
                <span>
                    <i @click="addFile">+</i>
                    <ul class="menu" v-if="addState">
                        <li @click="newProject">项目</li>
                        <li>任务</li>
                        <li>文件</li>
                        <li>日程</li>
                        <li>分享</li>
                    </ul>
                </span>
            </div>
            <router-link 
                to="/home" 
                class="title"
                tag="h3"
            >
                Teambition
            </router-link>
            <div class="tag">
                <span>我的</span>
                <span>帮助</span>
                <span>通知</span>
                <span>私信</span>
                <span @click="quit">退出</span>
            </div>
        </header>
        <router-view/>
    </div>
</template>
<script>
    import cookies from "js-cookie"
    export default {
        data(){
            return{
                addState:false,
            }
        },
        methods:{
            quit(){
                this.$router.push({
                    path:"/login"
                })
                cookies.remove("loginId")
            },
            addFile(){
                this.addState = !this.addState
            },
            newProject(){
                this.$store.commit('newProject')
                this.addState = !this.addState
            },
            closeShade(){
                this.$store.commit('closeShade')
            },
            finishCreateProject(){
                if(this.$store.state.createProjectName.trim()==''){
                    alert("请输入项目名称")
                    return
                }
                this.http.postCreateFile({
                    user_id:cookies.get("loginId"),
                    filename:this.$store.state.createProjectName,
                    filedesc:this.$store.state.createProjectDesc
                }).then(({data})=>{
                    if(data.success){
                        let pid= data.doc._id
                        this.http.postCreateMission({pid,name:"待处理"})
                        this.http.postCreateMission({pid,name:"处理中"})
                        this.$store.commit('addNewFile',data.doc)
                    }else{
                        alert(data.code)
                    }
                })
            }
        },
        created(){
            if(!cookies.get("loginId")){
                this.$router.push({
                    path:"/login"
                })
            }
        }
    }
</script>
<style scoped>
    ul{
        margin: 0 ;
        padding: 0;
        list-style: none;
    }
    .box{
        height: 100%;
    }
    .box .shade{
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        background-color: rgba(0,0,0,.7);
        z-index:100;
    }
    .shade .shade_box{
        width: 400px;
        height: 480px;
        padding: 20px;
        background-color:#fff;
        margin: 50px auto;
        border-radius: 5px;
    }
    .shade .shade_box .new_head{
        border-bottom: 1px solid #e1e1e1; 
        position: relative
    }
    .shade .shade_box .new_head .title,
    .shade .shade_box .new_head .close{
        font: 20px/30px "微软雅黑";
        text-align: center;
    }
    .shade .shade_box .new_head .close{
        color:#ccc;
        width: 30px;
        position: absolute;
        right: 0;
        top: 0;
        cursor: pointer;
    }
    .shade .shade_box  .pic{
        width: 113px;
        height: 90px;
        background: url(https://dn-st.teambition.net/teambition/images/illustration@3x.2d8d2cc3.png) no-repeat;
        background-size: 100% 100%;
        margin: 30px auto;
    }
    .shade .shade_box  .tag{
        font: 14px/20px "微软雅黑";
        margin-bottom: 20px;
        text-align:center;
    }
    .shade .shade_box .text,
    .shade .shade_box .area,
    .shade .shade_box .sub{
        display: block;
        width: 100%;
        border-radius: 3px;
        outline: none;
    }
    .shade .shade_box .text,
    .shade .shade_box .area{
        border: 1px solid #e1e1e1;
        padding: 8px 12px;
        font: 14px/20px "微软雅黑";
        margin-bottom: 40px;
    }
    .shade .shade_box .area{
        height: 38px;
        resize: none;
        overflow: auto;
    }
    .shade .shade_box .sub{
        height: 40px;
        border: none;
        font: 14px/40px '微软雅黑';
        color: #fff;
        background-color: rgba(12,119,226,.7);
        cursor: pointer;
    }
    .shade .shade_box .mb25{
        margin-bottom: 25px;
    }
    .head{
        padding: 0 16px;
        height: 48px;
        background-color: #fff;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
    .head .title,.head .tag,.head .search_new{
        height: 100%;
        width: 30%;
    }
    .head .title{
        text-align: center;
        font: 32px/48px arial,'微软雅黑';
        cursor: pointer;
    }
    .head .search_new{
        display: flex;
    }
    .head .search_new input,.head .search_new span{
        margin: auto 0;
        cursor: pointer;
    }
    .head .search_new input{
        border: none;
        width: 280px;
        padding: 8px 12px;
        font: 14px/14px arial,"微软雅黑";
        outline: none;
        border-radius: 15px;
    }
    .head .search_new input:hover{
        background-color: #f4f4f4;
    }
    .head .search_new span{
        width: 20px;
        height: 20px;
        background-color: rgba(12,119,226,.5);
        border-radius: 10px;
        position: relative;
    }
    .head .search_new span i{
        display: block;
        font: 20px/20px arial;
        color: #fff;
        text-align: center;
        width: 20px;
    }
    .head .search_new span .menu{
        font: 16px/30px arial,'微软雅黑';
        color: #888;
        text-align: center;
        width: 20px;
        background-color: #fff;
        width: 80px;
        position: absolute;
        top: 40px;
        left: 0;
    }
    .head .search_new span .menu li:nth-child(1){
       border-bottom: 1px solid #e1e1e1;
    }
    .head .search_new span .menu li:hover{
       background-color:#e1e1e1;
    }
    .head .tag{
        display: flex;
        justify-content: flex-end;
    }
    .head .tag span{
        font: 14px/14px 'w微软雅黑';
        margin: auto 10px;
        cursor: pointer;
    }
    .head .tag span:hover{
        color: rgba(12,119,226,.7);
    }
</style>
