<template>
    <div class="box">
        <header class="head">
            <div class="search_new">
                <input type="text" placeholder="输入搜索内容">
                <span>
                    <Icon type="plus-round"></Icon>
                </span>
            </div>
            <h3 class="title">
                Teambition
            </h3>
            <div class="tag">
                <span>我的</span>
                <span>帮助</span>
                <span>通知</span>
                <span>私信</span>
                <span>设置</span>
            </div>
        </header>
        <div class="content"></div>
        
    </div>
</template>
<script>
    export default {
        
    }
</script>
<style scoped>
    .box{
        background-color: pink;
        height: 100%;
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
    }
    .head .search_new span i{
        font-size: 14px;
        line-height: 20px;
        color: #fff;
        text-align: center;
        width: 20px;
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
    .content{
        padding-top: 48px;
        height: 480px;
        background-color: #dddddf;
    }
</style>
