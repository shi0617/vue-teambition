<template>
    <div id="detail">
        <header class="head">
            <div class="nav-left">
                <router-link :to="{path:'/home'}" class="hover">首页</router-link>
                <span style="margin: 0 5px;">
                    <Icon type="chevron-right" size="16"></Icon>
                </span>
                <a>{{$route.query.name}}</a>
            </div>
            <Menu mode="horizontal"  active-name="1">
                <MenuItem name="1">
                    <router-link :to="{name:'Mission'}" style="color:#495060">任务</router-link>
                </MenuItem>
                <MenuItem name="2">
                    <router-link :to="{name:'Share'}" style="color:#495060">分享</router-link>
                </MenuItem>
                <MenuItem name="3">
                    <router-link :to="{name:'Mission'}" style="color:#495060">文件</router-link>
                </MenuItem>
                <MenuItem name="4">
                    <router-link :to="{name:'Mission'}" style="color:#495060">日程</router-link>
                </MenuItem>
                <MenuItem name="5">
                    <router-link :to="{name:'Chat'}" style="color:#495060">群聊</router-link>
                </MenuItem>
            </Menu>
            <div class="nav-right">
                <a class="hover">
                    <Icon type="ios-settings"></Icon>
                    菜单
                </a>
            </div>
        </header>
        <router-view/>
    </div>
</template>
<script>
    export default {
        data () {
            return {
            }
        },
        created(){
        }
    }
</script>
<style scoped>
    #detail {
        top: 48px;
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        overflow-y: auto;
    }
    #detail .head{
        height: 50px;
        background-color: #f1f1f1;
        display:flex;
        justify-content: space-between;
        padding: 0 10px;
    }
    #detail .head ul{
        height: 50px;
        background-color: rgba(255,255,255,0);
        width: 40%;
        display:flex;
        justify-content: center;
    }
    #detail .head ul li{
        font: 16px/50px '微软雅黑';
        color:#495060;
        cursor: pointer;
    }
    #detail .head .nav-left,#detail .head .nav-right{
        width: 30%;
    }
    #detail .head .nav-left a,
    #detail .head .nav-right a{
        font: 16px/50px '微软雅黑';
        color:#495060;
        cursor: pointer;
    }
    #detail .head .hover:hover{
        color: rgba(12,119,226,.8)
    }
    #detail .head .nav-right{
        display:flex;
        justify-content: flex-end;
    }
    #detail .head .nav-right a{
        margin-left:10px;
    }
    .starColor{
        color: yellow;
    }
</style>