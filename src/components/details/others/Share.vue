<template>
    <div id="share">
        <div class="wall-view">
            <div class="wall-wrap">
                <div class="wall-left-column">
                    <header class="wall-left-column-header">
                        <a>
                            <span style="font-size: 20px;">
                                <Icon type="ios-plus"></Icon>
                            </span>
                            <span>添加分享</span>
                        </a>
                    </header>
                    <nav class="posts-navigator">
                        <div class="nothing">
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
        background-color:red;
    }
</style>