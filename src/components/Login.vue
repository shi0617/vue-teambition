<template>
    <div>
        <h1>Teambition</h1>
        <input type="text" placeholder="请输入账号" class="text" v-model="username" v-focus="loginState">
        <input type="password" placeholder="请输入密码" class="text" v-model="password">
        <input type="button" value="登录" class="btn_sub" @click="userLogin">
        <input type="submit" value="注册" class="btn_sub" @click="userSignin">
    </div>
</template>
<script>
    import cookies from "js-cookie"
    export default{
        data(){
            return{
                username:'',
                password:'',
                loginState:flase
            }
        },
        methods:{
            userLogin(){
                if(this.username.trim() == ''){
                    alert("请输入用户名")
                    return
                }else if(this.password.trim() == ''){
                    alert("请输入密码")
                    return
                }else{
                    this.http.postLogin({
                        username: this.username.trim(),
                        password: this.password.trim()
                    }).then(({data})=>{
                        if(data.success){
                            this.username =''
                            this.password =''
                            this.$router.push({
                                path:'/Home'
                            })
                            cookies.set('loginId',data.user_id)
                        }else{
                            alert(data.code)
                        }
                    })
                }
            },
            userSignin(){
                if(this.username == ''){
                    alert("请输入用户名")
                    return
                }else if(this.password == ''){
                    alert("请输入密码")
                    return
                }else{
                    this.http.postSignin({
                        username: this.username,
                        password: this.password
                    }).then(({data})=>{
                        this.username =''
                        this.password =''
                        alert(data.code)
                    })
                }
            }
        },
        created(){
            this.loginState = true
        }
    }
    
</script>
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
    }
    .text{
        width: 346px;
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
        cursor: pointer;
    }
</style>