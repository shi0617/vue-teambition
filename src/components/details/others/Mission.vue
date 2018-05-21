<template>
    <div class="board-view">
        <ul class="list">
            <li class="scrum-stage">
                <header class="head">
                    <div style="float: left">待处理</div>
                    <div style="float: right;position:relative;">
                        <a>
                            <Icon type="edit"></Icon>
                            
                        </a>
                        <a>
                            <Icon type="trash-a"></Icon>
                        </a>
                        <div class="edit">
                            <div class="title">编辑列表</div>
                            <input type="text" >
                            <button>保存</button>
                        </div>
                    </div>
                </header>
                <div class="content">
                    <ul class="con_list">
                        <li>
                            <span>1231244124</span>
                            <Icon type="trash-a" size="20" style="line-height: 32px;"></Icon>
                        </li>
                        <li>
                            <span>1231244124</span>
                            <Icon type="trash-a" size="20" style="line-height: 32px;"></Icon>
                        </li>
                    </ul>
                    <div class="add">
                        <a>
                            <span style="font-size: 20px;">
                                <Icon type="ios-plus"></Icon>
                            </span>
                            <span>添加任务</span>
                        </a>
                    </div>
                </div>
            </li>
            <li class="scrum-stage" style="height: auto;">
                <div class="new">
                    +新建任务列表
                </div>
                <div class="new_box">
                    <input type="text">
                    <div>
                        <button class="color">取消</button>
                        <button class="bgc">保存</button>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
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
    .scrum-stage .head div .edit{
        position: absolute;
        top:25px;
        left: -100px;
        width: 254px;
        height: 172px;
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
    .scrum-stage .content .con_list li{
        height: 52px;
        margin: 8px;
        margin-top: 0;
        background-color:#fff;
        border-radius: 3px;
        box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);
        cursor:pointer;
        font: 14px/32px "微软雅黑";
        padding: 10px;
        display:flex;
        justify-content: space-between;
    }
    .scrum-stage .content .con_list li span{
        width: 90%;
    }
    .scrum-stage .content .con_list li span:hover{
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
</style>