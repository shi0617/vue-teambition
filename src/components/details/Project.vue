<template>
    <div>
        <div class= "shade1" v-if="setState">
            <div class="shade_box">
                <header class="new_head" style="margin-bottom: 10px;">
                    <div class="title">项目设置</div> 
                </header>
                <div style="font-size:16px;line-height:24px;margin-bottom: 10px;">项目名称</div>
                <input type="text" class="text mb25" v-model="changeFileName" v-focus="setState">
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
        <div id="content">
            <div class="personal-portal-view">
                <div class="project" v-if="starData.length">
                    <h3>星标项目</h3>
                    <ul class="project-grid-group__component">
                        <li class="project-grid-group__item" 
                            v-for="item in starData"
                        >
                            <router-link
                                :to = "{path:'home/detail',query:{id:item._id,name:item.filename}}"
                                class="project-grid-group__card"
                                tag="div"
                            >
                                <div class="project-name">{{item.filename}}</div>
                                <div class="project-desc">{{item.filedesc}}</div>
                            </router-link>
                            <div class="icon">
                                <span
                                    @click="setInfo(item.filename,item.filedesc,item._id,item.delete)"
                                >
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
                        <li 
                            class="project-grid-group__item" 
                            v-for="item in userData"
                        >
                            <router-link 
                                :to = "{path:'home/detail',query:{id:item._id,name:item.filename,star:item.star}}"
                                class="project-grid-group__card"
                                tag="div"
                            >
                                <div class="project-name">{{item.filename}}</div>
                                <div class="project-desc">{{item.filedesc}}</div>
                            </router-link>
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
                setState:false,
                changeFileName:'',
                changeFileDesc:'',
                projectId:'',
                projectRecycle:false
            }
        },
        methods:{
            closeShade(){
                this.$store.commit('closeShade')
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
                this.http.postChangeName({
                    _id:this.projectId,
                    filename: this.changeFileName,
                    filedesc: this.changeFileDesc
                }).then(({data})=>{
                    if(data.success){
                        this.$store.commit('isChange',{
                            _id:this.projectId,
                            filename: this.changeFileName,
                            filedesc: this.changeFileDesc
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
            this.http.getUserFiles({
                user_id:cookies.get("loginId")
            }).then((data)=>{
                this.$store.commit('allUserFile',data.data)
            })
        }
    }
</script>
<style scoped>
    ul{
        margin: 0 ;
        padding: 0;
        list-style: none;
    }
    .shade1{
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        background-color: rgba(0,0,0,.7);
        z-index:100;
    }
    .shade1 .shade_box{
        width: 400px;
        height: 480px;
        padding: 20px;
        background-color:#fff;
        margin: 50px auto;
        border-radius: 5px;
    }
    .shade1 .shade_box .new_head{
        border-bottom: 1px solid #e1e1e1; 
        position: relative
    }
    .shade1 .shade_box .new_head .title,
    .shade1 .shade_box .new_head .close{
        font: 20px/30px "微软雅黑";
        text-align: center;
    }
    .shade1 .shade_box .new_head .close{
        color:#ccc;
        width: 30px;
        position: absolute;
        right: 0;
        top: 0;
        cursor: pointer;
    }
    .shade1 .shade_box  .pic{
        width: 113px;
        height: 90px;
        background: url(https://dn-st.teambition.net/teambition/images/illustration@3x.2d8d2cc3.png) no-repeat;
        background-size: 100% 100%;
        margin: 30px auto;
    }
    .shade1 .shade_box  .tag{
        font: 14px/20px "微软雅黑";
        margin-bottom: 20px;
        text-align:center;
    }
    .shade1 .shade_box .text,
    .shade1 .shade_box .area,
    .shade1 .shade_box .sub{
        display: block;
        width: 100%;
        border-radius: 3px;
        outline: none;
    }
    .shade1 .shade_box .text,
    .shade1 .shade_box .area{
        border: 1px solid #e1e1e1;
        padding: 8px 12px;
        font: 14px/20px "微软雅黑";
        margin-bottom: 40px;
    }
    .shade1 .shade_box .area{
        height: 38px;
        resize: none;
        overflow: auto;
    }
    .shade1 .shade_box .sub{
        height: 40px;
        border: none;
        font: 14px/40px '微软雅黑';
        color: #fff;
        background-color: rgba(12,119,226,.7);
        cursor: pointer;
    }
    .shade1 .shade_box .mb25{
        margin-bottom: 25px;
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
        background:url(../../assets/cover-media.jpg) no-repeat;
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
