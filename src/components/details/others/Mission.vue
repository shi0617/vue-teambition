<template>
    <div class="board-view">
        <div class="change-box" v-if="changeState">
            <div class="box">
                <header class="box-head">任务设置</header>
                <div>
                    <div>
                        <p>修改任务名称</p>
                        <input 
                            type="text" 
                            class="mission-text" 
                            placeholder="任务名称"
                            v-model="change.title"
                        >
                    </div>
                    <div>
                        <p>设置截止时间</p>
                        <Row style="margin-bottom: 20px;">
                            <Col span="12">
                                <DatePicker 
                                    type="date" 
                                    :options="options3" 
                                    placeholder="选择截止日期" 
                                    style="width: 125px;"
                                    v-model="change.date"
                                >
                                </DatePicker>
                            </Col>
                            <Col span="12">
                                <TimePicker 
                                    type="time" 
                                    placeholder="选择截止时间" 
                                    style="width: 125px;"
                                    v-model="change.time"
                                >
                                </TimePicker>
                            </Col>
                        </Row>
                    </div>
                    <div>
                        <button @click="confirmChangeTimeMission">确定</button>
                        <button @click="cancelChangeTimeMission">取消</button>
                    </div>
                </div>
            </div>
        </div>
        <ul class="list">
            <li 
                class="scrum-stage" 
                v-for="item in list"
            >
                <header class="head">
                    <div style="float: left">{{item.mission_name}}</div>
                    <div style="float: right;position:relative;">
                        <a 
                            class="hoverColor"
                            @click="editMission(item._id,item.edit,item.mission_name)"
                        >
                            <Icon type="edit"></Icon>
                        </a>
                        <a 
                            class="hoverColor"
                            @click="deleteMission(item._id)"
                        >
                            <Icon type="trash-a"></Icon>
                        </a>
                        <div class="edit" v-if="item.edit">
                            <div class="title">编辑列表</div>
                            <input 
                                type="text" 
                                v-focus="item.edit" 
                                v-model="item.mission_name"
                            >
                            <button 
                                style="margin-bottom: 10px;" 
                                @click="confirmEdit(item._id,item.edit,item.mission_name)"
                            >
                                保存
                            </button>
                            <button @click="cancelEdit(item._id,item.edit)">取消</button>
                        </div>
                    </div>
                </header>
                <div class="content">
                    <ul class="con_list">
                        <li v-for="i in item.mission_list" @click="changeTimeMission(item._id,i.id,i.title,i.date,i.time)">
                            <div class="mission-title">
                                <span class="span">{{i.title}}</span>
                                <span class="a" @click.stop="deleteThisMission(item._id,i.id)">
                                    <Icon 
                                        type="trash-a" 
                                        size="20" 
                                        style="line-height: 32px;"
                                    >
                                    </Icon>
                                </span>
                            </div>
                            <span class="time" v-if="i.date!=''">截止时间: {{i.date.slice(0,10)}} {{i.time}}</span>
                        </li>
                    </ul> 
                    <div class="add" @click="addMission(item._id,item._add)" v-if="!item.add">
                        <a>
                            <span style="font-size:20px;">
                                <Icon type="ios-plus"></Icon>
                            </span>
                            <span>添加任务</span>
                        </a>
                    </div>
                    <div class="add_con" v-if="item.add">
                        <textarea placeholder="任务内容" v-focus="item.add" v-model="item.title"></textarea>
                        <div style="margin-bottom: 10px;">设置截止日期时间</div>
                        <Row style="margin-bottom: 10px;">
                            <Col span="12">
                                <DatePicker 
                                    type="date" 
                                    :options="options3" 
                                    placeholder="选择截止日期" 
                                    style="width: 120px;"
                                    v-model="item.date"
                                >
                                </DatePicker>
                            </Col>
                            <Col span="12">
                                <TimePicker 
                                    type="time" 
                                    placeholder="选择截止时间" 
                                    style="width: 120px;"
                                    v-model="item.time"
                                >
                                </TimePicker>
                            </Col>
                        </Row>
                        <button 
                            style="margin-bottom: 10px" 
                            @click="confirmAdd(item._id,item.add,item.title,item.date,item.time)"
                        >
                            创建
                        </button>
                        <button @click="cancelAdd(item._id,item.add)">取消</button>
                    </div>
                </div>
            </li>
            <li class="scrum-stage" style="height: auto;">
                <div class="new" v-if="!missionState" @click="createNewMission">
                    +新建任务列表
                </div>
                <div class="new_box" v-if="missionState">
                    <input type="text" v-model="missionName" v-focus="missionState">
                    <div>
                        <button 
                            class="color"
                            @click="cancelCreateNewMission"
                        >
                            取消
                        </button>
                        <button 
                            class="bgc"
                            @click="confirmCreateNewMission"
                        >
                            保存
                        </button>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                list:[],
                missionState:false,
                missionName:'',
                editState:false,   
                editMissionName:'',
                addMissionName:'',
                changeState:false,
                change:{
                    pid:'',
                    id:'',
                    title:'',
                    date:'',
                    time:''
                },
                options3: {
                    disabledDate (date) {
                        return date && date.valueOf() < Date.now() - 86400000;
                    }
                },       
            }
        },
        methods:{
            createNewMission(){
                this.missionState = !this.missionState
            },
            cancelCreateNewMission(){
                this.missionState = !this.missionState
                this.missionName = ''
            },
            confirmCreateNewMission(){
                let pid = this.$route.query.id
                let name = this.missionName
                if(name == ''){
                    alert('请输入任务名称')
                    return
                }
                this.http.postCreateMission({pid,name})
                .then(({data})=>{
                    if(data.success){
                        this.list.push(data.doc)
                        this.missionState = !this.missionState
                        this.missionName = ''
                    }else(
                        alert(data.code)
                    )
                })
            },
            deleteMission(id){
                this.http.postDeleteMission({id})
                .then(({data})=>{
                    if(data.success){
                        this.list = this.list.filter(item =>{
                            return item._id != data.doc._id
                        })
                    }else{
                        alert(data.code)
                    }
                })
            },
            editMission(id,edit,name){
                if(!edit){
                    this.editMissionName = name
                }
                this.postEditMission(id,edit)
            },
            cancelEdit(id,edit){
                this.postEditMission(id,edit)
                this.list.forEach(item =>{
                    if(item._id == id){
                        item.mission_name = this.editMissionName
                        this.editMissionName = ''
                    }
                })
            },
            confirmEdit(id,edit,name){
                if(name ==""){
                    alert("请输入任务名称")
                    return
                }
                this.postEditMission(id,edit,name)
            },
            postEditMission(id,edit,name){
                this.http.postEditMission({id,edit,name})
                .then(({data})=>{
                    if(data.success){
                        this.list.forEach(item =>{
                            if(item._id == id){
                                item.edit = !item.edit
                            }
                        })
                    }else{
                        alert(data.code)
                    }
                })
            },
            addMission(id,add){
                this.http.postAddMission({id,add})
                .then(({data})=>{
                    if(data.success){
                        this.list.forEach(item =>{
                            if(item._id == id){
                                item.add = !item.add
                            }
                        })
                    }else{
                        alert(data.code)
                    }
                })
            },
            cancelAdd(id,add){
                this.http.postAddMission({id,add})
                .then(({data})=>{
                    if(data.success){
                        this.list.forEach(item =>{
                            if(item._id == id){
                                item.add = !item.add
                                item.title = ''
                            }
                        })
                    }else{
                        alert(data.code)
                    }
                })
            },
            confirmAdd(id,add,title,date,time){
                if(title==""){
                    alert("请输入添加任务的名称")
                    return
                }
                this.http.postAddMission({id,add,title,date,time})
                .then(({data})=>{
                    console.log(data)
                    if(data.success){
                        this.list.forEach(item =>{
                            if(item._id == id){
                                item.add = !item.add
                                item.title = ''
                                item.date = ''
                                item.time = ''
                            }
                        })
                        this.getMissionsByPid()
                    }else{
                        alert(data.code)
                    }
                })
            },
            deleteThisMission(paid,id){
                this.http.postDeleteThisMission({pid:paid,id})
                .then(({data})=>{
                    if(data.success){
                        this.getMissionsByPid()
                    }
                })
            },
            getMissionsByPid(){
                let pid = this.$route.query.id
                this.http.getMissionsByPid({pid})
                .then(({data})=>{
                    this.list= data
                })
            },
            changeTimeMission(pid,id,title,date,time){
                this.changeState = true
                this.change.pid = pid
                this.change.id = id
                this.change.title =title,
                this.change.date = date
                this.change.time = time
            },
            cancelChangeTimeMission(){
                this.changeState = false
            },
            confirmChangeTimeMission(){
                if(this.change.title==''){
                    alert(' 请输入修改内容')
                    return
                }
                this.changeState = false
                this.http.postChangeThisMission(this.change)
                .then(({data})=>{
                    if(data.success){
                        this.getMissionsByPid()
                    }
                })
            }
        },
        created(){
            this.$store.commit('page',"1")
            this.getMissionsByPid()
        }
    }
</script>
<style >
    ul{
        padding: 0;
        margin: 0;
        list-style: none;
    }
    .board-view {
        position: fixed;
        top: 98px;
        right: 0;
        bottom: 0;
        left: 0;
        padding: 0;
    }
    .list{
        padding: 10px;
        white-space: nowrap;
        overflow-x: auto;
        overflow-y: hidden;
        height: 100%;
    }
    .scrum-stage {
        height: 100%;
        width: 288px;
        margin-right: 10px;
        background-color: #f1f1f1;
        border-radius: 3px;
        display: inline-block;
        vertical-align: top;
    }
    .scrum-stage .new{
        font: 16px/20px "微软雅黑";
        padding: 14px;
        cursor: pointer;
        text-align: center;
    }
    .scrum-stage .new_box{
        padding: 14px;
    }
    .scrum-stage .new_box input{
        padding: 10px;
        font: 14px/14px "微软雅黑";
        border: 1px solid rgba(0,0,0,.2);
        border-radius: 5px;
        display: block;
        width: 100%;
        outline: none;
    }
    .scrum-stage .new_box div{
        text-align: right;
    }
    .scrum-stage .new_box div button{
        width: 50px;
        font: 16px/28px "微软雅黑";
        margin-top: 10px;
        border-radius: 3px;
        border: none;
        margin-left: 10px;
        outline: none;
        color: rgba(0,0,0,.4);
        background-color: #f1f1f1;
        cursor: pointer;
    }
    .scrum-stage .new_box div .color:hover{
        color: rgba(12,119,226,.8);
    }
    .scrum-stage .new_box div .bgc{
        color: #fff;
        background-color: rgba(12,119,226,0.8);
    }
    .scrum-stage .new_box div .bgc:hover{
        background-color: rgba(12,119,226,0.6);
    }
    .scrum-stage .new:hover{
        color: rgba(12,119,226,.8)
    }
    .scrum-stage .head{
        padding: 14px 18px;
        font: 16px/20px "微软雅黑";
        height: 48px;
    }
    .scrum-stage .head div a{
        margin-left: 5px;
        color: #495060;
        font: 20px/20px "微软雅黑";
        opacity:.8;
    }
    .scrum-stage .head div .hoverColor:hover{
        color:rgba(12,119,226,.8);
    }
    .scrum-stage .head div .edit{
        position: absolute;
        top:25px;
        left: -100px;
        width: 254px;
        height: 230px;
        background-color: #fff;
        border-radius: 3px;
        box-shadow: 0 2px 2px 0 rgba(0,0,0,.3);
    }
    .scrum-stage .head div .edit .title{
        text-align: center;
        width: 222px;
        margin: 0 auto 15px;
        padding: 10px 0;
        border-bottom: 1px solid rgba(0,0,0,.2);
    }
    .scrum-stage .head div .edit input{
        display: block;
        outline:none;
        border-radius: 6px;
        width: 222px;
        margin: 0 auto 15px;
        padding: 10px;
        border: 1px solid rgba(0,0,0,.2);
    }
    .scrum-stage .head div .edit button{
        display: block;
        outline:none;
        border-radius: 6px;
        width: 222px;
        margin: 0 auto;
        padding: 10px;
        border:none;
        background-color:#3da8f5;
        color:#fff;
    }
    .scrum-stage .head div .edit button:hover{
        background-color:#5ab5f7;
    }
    .scrum-stage .content{
        background-color: #f1f1f1;
        height: 85%;
        overflow:auto;
    }
    .scrum-stage .content .add{
        background-color: #f1f1f1;
    }
    .scrum-stage .content .add a{
        display: block;
        padding: 14px 18px;
        font: 16px/20px "微软雅黑";
    }
    .scrum-stage .content .add_con {
        padding:14px 10px;
        margin: 8px;
        margin-top: 0;
        background-color:#fff;
        border-radius: 3px;
        box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);
    }
    .scrum-stage .content .add_con textarea{
        display: block;
        resize: none;
        outline: none;
        padding: 5px;
        border-radius: 3px;
        width:100%;
        height: 80px;
        margin-bottom: 10px;
    }
    .scrum-stage .content .add_con button{
        display: block;
        background-color: rgba(12,119,226,.8);
        border: none;
        border-radius: 3px;
        width:100%;
        height: 30px;
        font: 16px/30px "微软雅黑";
        color: #fff;
    }
    .scrum-stage .content .add_con button:hover{
        background-color: rgba(12,119,226,.6)
    }
    .scrum-stage .content .con_list li{
        margin: 8px;
        margin-top: 0;
        background-color:#fff;
        border-radius: 3px;
        box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);
        cursor:pointer;
        font: 14px/32px "微软雅黑";
        padding: 10px;
    }
    .scrum-stage .content .con_list li .mission-title{
        display:flex;
        justify-content:space-between;
    }
    .scrum-stage .content .con_list li .time{
        font: 12px/14px "微软雅黑";
        background-color:orange;
        color: #fff;
        padding: 2px 5px; 
        border-radius: 3px;
    }
    .scrum-stage .content .con_list li .mission-title .span{
        width: 90%;
    }
    .scrum-stage .content .con_list li .mission-title .span:hover{
        color: rgba(12,119,226,.8)
    }
    .scrum-stage .content .con_list li i{
        display:none;
    }
    .scrum-stage .content .con_list li i:hover{
        color: rgba(12,119,226,.8);
    }
    .scrum-stage .content .con_list li:hover i{
        display: block;
    }
    .change-box{
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        background-color:rgba(0,0,0,.5);
        display:flex;
        z-index:9999;
    }
    .change-box .box{
         width: 300px;
         background-color: #fff;
         margin: auto;
         padding: 10px;
         border-radius: 5px;
    }
    .change-box .box .box-head{
        border-bottom: 1px solid rgba(0,0,0,.3);
        padding-bottom: 10px;
        font: 16px/20px "微软雅黑";
        text-align: center;
    }
    .change-box .box p{
        font: 14px/20px "微软雅黑";
        padding: 10px 0 15px;
    }
    .change-box .box .mission-text{
        width: 100%;
        padding: 5px;
        margin-bottom: 5px;
        border-radius: 3px;
        border:1px solid rgba(0,0,0,.3);
        font: 14px/20px "微软雅黑";
    }
    .change-box .box button{
        display: block;
        font: 16px/30px "微软雅黑";
        border:none;
        color:#fff;
        width: 100%;
        background-color:rgba(12,119,226,.8);
        cursor:pointer;
        border-radius: 3px;
        margin-bottom: 15px;
    }
    .change-box .box button:hover{
        background-color:rgba(12,119,226,.6);
    }
</style>