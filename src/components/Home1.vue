<template>
    <div class="box">
        <div class= "shade" v-if="addProjectState">
            <div class="shade_box">
                <header class="new_head">
                    <div class="title">创建项目</div> 
                    <div class="close" @click="closeShade">X</div>
                </header>
                <div class="pic"></div>
                <div class="tag">为不同的事物建立不同的项目</div>
                <input type="text" class="text" placeholder="项目名称（必填）" v-model="createProjectName">
                <textarea placeholder="项目简介（选填）" class="area" v-model="createProjectDesc"></textarea>
                <input value="完成并创建" type="button" class="sub" @click="finishCreateProject">
            </div>
        </div>
        <div class= "shade" v-if="setState">
            <div class="shade_box">
                <header class="new_head" style="margin-bottom: 10px;">
                    <div class="title">项目设置</div> 
                </header>
                <div style="font-size:16px;line-height:24px;margin-bottom: 10px;">项目名称</div>
                <input type="text" class="text mb25" v-model="changeFileName">
                <div style="font-size:16px;line-height:24px;margin-bottom: 10px;">项目简介</div>
                <textarea class="area mb25" v-model="changeFileDesc"></textarea>
                <input 
                    value="确认修改" 
                    type="button" 
                    class="sub mb25" 
                    @click="conformChange"
                >
                <input 
                    value="取消修改" 
                    type="button" class="sub mb25" 
                    @click="cancelChange">
                <input 
                    value="移动到回收站" 
                    type="button" class="sub mb25" 
                    @click="changeRecycle">
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
                :to="{name:'Home'}" 
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
        <div id="content">
            <div class="personal-portal-view">
                <div class="project" v-if="starData.length">
                    <h3>星标项目</h3>
                    <ul class="project-grid-group__component">
                        <li class="project-grid-group__item" v-for="item in starData">
                            <div class="project-grid-group__card">
                                <div class="project-name">{{item.filename}}</div>
                                <div class="project-desc">{{item.filedesc}}</div>
                            </div>
                            <div class="icon">
                                <span>
                                    <Icon type="edit" size="20"></Icon>
                                </span>
                                <span :class="{star:item.star}" @click="changeStar(item._id,item.star)">
                                    <Icon type="ios-star" size="22"></Icon>
                                </span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="project">
                    <h3>我的项目</h3>
                    <ul class="project-grid-group__component">
                        <li class="project-grid-group__item" v-for="item in userData">
                            <div class="project-grid-group__card">
                                <div class="project-name">{{item.filename}}</div>
                                <div class="project-desc">{{item.filedesc}}</div>
                            </div>
                            <div class="icon">
                                <span
                                    @click="setInfo(item.filename,item.filedesc,item._id,item.delete)"
                                    >
                                    <Icon type="edit" size="20"></Icon>
                                </span>
                                <span 
                                    :class="{star:item.star}" 
                                    @click="changeStar(item._id,item.star)"
                                >
                                    <Icon type="ios-star" size="22"></Icon>
                                </span>
                            </div>
                        </li>
                        <li 
                            class="project-grid-group__item addfile" 
                            @click="closeShade"
                        >
                            <div class="plus">+</div>
                            <div class="new">创建新项目</div>
                        </li>
                    </ul>
                </div>
                <div class="project" v-if="recycleData.length">
                    <h3>项目回收站</h3>
                    <ul class="project-grid-group__component">
                        <li class="project-grid-group__item" v-for="item in recycleData">
                            <div class="project-grid-group__card">
                                <div class="project-name">{{item.filename}}</div>
                                <div class="project-desc">{{item.filedesc}}</div>
                            </div>
                            <div class="icon">
                                <span @click="recycleBcck(item._id,item.delete)">
                                    <Icon type="ios-loop-strong" size="22"></Icon>
                                </span>
                                <span @click="deleteProject(item._id)">
                                    <Icon type="trash-a" size="22"></Icon>
                                </span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import cookies from "js-cookie"
    export default {
        data(){
            return{
                addState:false,
                addProjectState:false,
                setState:false,
                createProjectName:'',
                createProjectDesc:'',
                changeFileName:'',
                changeFileDesc:'',
                projectId:'',
                projectRecycle:false
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
                this.addProjectState = !this.addProjectState
                this.addState = !this.addState
            },
            closeShade(){
                this.addProjectState = !this.addProjectState
                this.createProjectName = ''
                this.createProjectDesc = ''
            },
            finishCreateProject(){
                if(this.createProjectName.trim()==''){
                    alert("请输入项目名称")
                    return
                }
                this.http.postCreateFile({
                    user_id:cookies.get("loginId"),
                    filename:this.createProjectName,
                    filedesc:this.createProjectDesc
                }).then(({data})=>{
                    if(data.success){
                        this.$store.commit('addNewFile',data.doc)
                        this.addProjectState = !this.addProjectState
                        this.createProjectName = ''
                        this.createProjectDesc = ''
                    }else{
                        alert(data.code)
                    }
                })
            },
            changeStar(id,s){
                this.http.postStar({
                    _id:id,
                    star:s
                }).then(({data})=>{
                    if(data.success){
                        this.$store.commit('isStar',id)
                    }else{
                        alert(data.code)
                    }
                })
            },
            setInfo(a,b,c,d){
                this.setState = !this.setState
                this.changeFileName = a
                this.changeFileDesc = b
                this.projectId = c
                this.projectRecycle = d
            },
            cancelChange(){
                this.setState = !this.setState
            },
            changeRecycle(){
                this.http.postRecycle({
                    _id:this.projectId,
                    delete:this.projectRecycle
                }).then(({data})=>{
                    if(data.success){
                        this.$store.commit('isRecycle',this.projectId)
                        this.setState = !this.setState
                    }else{
                        alert(data.code)
                    }
                })
            },
            recycleBcck(a,b){
                this.http.postRecycle({
                    _id:a,
                    delete:b
                }).then(({data})=>{
                    if(data.success){
                        this.$store.commit('isRecycle',a)
                    }else{
                        alert(data.code)
                    }
                })
            },
            deleteProject(id){
                this.http.postDelete({
                    _id:id
                }).then(({data})=>{
                    if(data.success){
                        this.$store.commit('isDelete',id)
                    }else{
                        alert(data.code)
                    }
                })
            },
            conformChange(){
                if(this.changeFileName.trim()==''){
                    alert('请输入项目名称')
                    return
                }
                this.http.postChangeName({
                    _id:this.projectId,
                    filename: this.changeFileName.trim(),
                    filedesc: this.changeFileDesc.trim()
                }).then(({data})=>{
                    if(data.success){
                        this.$store.commit('isChange',{
                            _id:this.projectId,
                            filename: this.changeFileName.trim(),
                            filedesc: this.changeFileDesc.trim()
                        })
                        this.setState = !this.setState
                    }else{
                        alert(data.code)
                    }
                })
            }
        },
        computed:{
            userData(){
                return this.$store.state.userData.filter(item=>{
                    return !item.delete
                })
            },
            starData(){
                return this.$store.state.userData.filter(item=>{
                    return item.star&&!item.delete
                })
            },
            recycleData(){
                return this.$store.state.userData.filter(item=>{
                    return item.delete
                })
            }
        },
        created(){
            if(!cookies.get("loginId")){
                this.$router.push({
                    path:"/login"
                })
                return
            }else{
                this.http.getUserFiles({
                    user_id:cookies.get("loginId")
                }).then((data)=>{
                    this.$store.commit('allUserFile',data.data)
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
        z-index: 99;
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
    #content {
        top: 48px;
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        overflow-y: auto;
        background-color: #f1f1f1;
    }
    #content .personal-portal-view{
        margin: 48px auto;
        width: 1100px;
    }
    #content .personal-portal-view .project{
        margin-bottom: 10px;
    }
    #content .personal-portal-view .project h3{
        font: 20px/20px '微软雅黑';
        margin-bottom: 10px;
    }
    .project-grid-group__component{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        margin: 0 -14px;
    }
    .project-grid-group__item {
        position: relative;
        cursor: pointer;
        margin: 14px;
        transition:  0.218s;
        cursor:pointer;
        width: 254px;
        height: 128px;
    }
    .project-grid-group__item .icon{
        position: absolute;
        top: 8px;
        right: 12px;
        
    }
    .project-grid-group__item .icon span{
        float:left;
        color:rgba(255,255,255,.8);
        margin-left:5px; 
        display: none;
    }
    .project-grid-group__item .icon .star{
        color: yellow;
        display: block;
    }
    .project-grid-group__item:hover{
        transform: translateY(-5px);
    }
    .project-grid-group__item:hover .icon span{
        display: block;
    }
    .project-grid-group__card{
        width: 254px;
        height: 128px;
        padding: 8px 16px;
        background:url(https://mailimg.teambition.com/logos/cover-media.jpg) no-repeat;
        background-size: 100% 100%;
        border-radius: 5px;
    }
    .project-grid-group__card .project-name{
        height: 24px;
        font: 16px/24px arial,"微软雅黑";
        margin-bottom: 8px;
        overflow: hidden;
        color: #fff;
    }
    .project-grid-group__card .project-desc{
        height: 80px;
        font: 14px/20px arial,"微软雅黑";
        overflow: hidden;
        color: #fff;
    }
    .addfile{
        background-color:#fff;
        border-radius: 5px;
    }
    .addfile .plus{
        background-color:rgb(166, 166, 166);
        color:#fff;
        font: 30px/30px '微软雅黑';
        width: 36px;
        height: 36px;
        margin: 30px auto 10px;
        text-align: center;
        border-radius: 18px;
    }
    .addfile .new{
        color:rgb(166, 166, 166);
        font: 18px/18px '微软雅黑';
        text-align: center;
    }
    .addfile:hover .new{
        color: rgba(12,119,226,.5)
    }
    .addfile:hover .plus{
        background-color: rgba(12,119,226,.5)
    }
</style>
