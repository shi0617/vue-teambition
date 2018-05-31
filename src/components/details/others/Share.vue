<template>
    <div id="share">
        <div class='share_box' v-if="shareState">
            <div class='share_box_content'>
                <input type="text" placeholder="点击输入标题" v-model="shareTitle">
                <textarea placeholder="点击输入正文" v-model="shareContent"></textarea>
                <div class="div">
                    <button @click="confirmCreateShare">保存</button>
                    <button @click="cancelCreateShare">取消</button>
                </div>
            </div>
        </div>
        <div class="wall-view">
            <div class="wall-wrap">
                <div class="wall-left-column">
                    <header class="wall-left-column-header">
                        <a @click="addShare">
                            <span style="font-size: 20px;">
                                <Icon type="ios-plus"></Icon>
                            </span>
                            <span>添加分享</span>
                        </a>
                    </header>
                    <nav class="posts-navigator">
                        <Menu theme="light" active-name="1" style="width:100%">
                            <MenuItem name="1">
                                <Icon type="document-text"></Icon>
                                文章管理
                            </MenuItem>
                        </Menu>
                        <div class="nothing" v-if="false">
                            目前还没有内容
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                shareTitle:'',
                shareContent:'',
                shareState: false
            }
        },
        methods:{
            addShare(){
                this.shareState = !this.shareState
            },
            confirmCreateShare(){
                this.shareState = !this.shareState
            },
            cancelCreateShare(){
                this.shareState = !this.shareState
                this.shareTitle = ''
                this.shareContent = ''
            }
        },
        created(){
            this.$store.commit('page',"2")
        }
    }
</script>
<style>
    #share{
        position:fixed;
        top: 99px;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: #f1f1f1;
    }
    #share .wall-view{
        position: fixed;
        top: 120px;
        right: 0;
        bottom: 0;
        left: 0;
    }
    #share .wall-view .wall-wrap{
        position: relative;
        width: 1100px;
        max-width: 1260px;
        height: 100%;
        margin: 0 auto;
        overflow: hidden;
        background-color: #fff;
        border-radius: 3px 3px 0 0;
        box-shadow: 0 2px 3px rgba(0,0,0,.1);
    }
    .wall-view .wall-left-column {
        position: relative;
        float: left;
        width: 330px;
        height: 100%;
        border-right: 1px solid rgba(0,0,0,.1);
    }
    .wall-view .wall-left-column-header {
        padding: 14px 12px 10px;
        border-bottom: 1px solid rgba(0,0,0,.12);
        text-align:center;
    }
    .wall-left-column-header a{
        font: 16px/20px "微软雅黑";
        color: rgba(12,119,226,.8)
    }
    .wall-left-column-header a:hover{
        font: 16px/20px "微软雅黑";
        color: rgba(12,119,226,.6)
    }
    .wall-view .posts-navigator {
        position: absolute;
        top: 48px;
        bottom: 0;
        width: 100%;
        overflow-y: auto;
    }
    .wall-view .posts-navigator .nothing{
        width:100%;
        height: 100%;
        font: 16px/100px '微软雅黑';
        color: rgba(12,119,226,.8);
        text-align:center;
    }
    .share_box{
        position:fixed;
        left:0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color:#fff;
        z-index:9;
        display:flex;
    }
    .share_box_content{
        width: 965px;
        height: 600px;
        margin: auto;
    }
    .share_box_content .div{
        width: 200px;
        display:flex;
        justify-content:space-between;
        margin: 10px auto;
    }
    .share_box_content .div button{
        font: 16px/20px '微软雅黑';
        color: #fff;
        background-color:rgba(12,119,226,.8);
        border: none;
        padding:5px 10px;
        border-radius:3px;
        outline: none;
        cursor: pointer;
    }
    .share_box_content .div button:hover{
         background-color:rgba(12,119,226,.6)
    }
    .share_box_content input,
    .share_box_content textarea{
        width: 100%;
        padding:5px 0;
        font: 16px/20px '微软雅黑';
        border-radius:3px;
        border:none;
        margin-bottom: 15px;
    }
    .share_box_content textarea{
        height: 472px;
        resize:none;
    }
</style>