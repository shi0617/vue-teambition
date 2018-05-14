<template>
    <div>
        <h1>Teambition</h1>
        <input type="text" placeholder="请输入账号" class="text">
        <input type="password" placeholder="请输入密码" class="text">
        <input type="button" value="登录" class="btn_sub">
        <input type="submit" value="注册" class="btn_sub">
    </div>
</template>
<style>
    h1{ 
        padding-top: 100px;
        margin: 20px auto;
        text-align:center;
        font-size: 40px;
        line-height: 40px;
    }
    input{
        display: block;
        margin: 0 auto;
        outline: none;
    }
    .text{
        width: 320px;
        margin-bottom: 25px;
        padding: 12px;
        font-size: 16px;
        line-height: 20px;
        background-color: #fff;
        border: 1px solid #d9d9d9;
        border-radius: 3px;
    }
    .btn_sub{
        width: 346px;
        margin-bottom: 25px;
        padding: 12px;
        font-size: 20px;
        line-height: 20px;
        background-color: #3DA8F5;
        color: #fff;
        border: none;
        border-radius: 3px;
    }
</style>