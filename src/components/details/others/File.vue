<template>
    <div id="file">
        <header class="library-header-wrapper">
            <div class="library-header">
                <span>文件库</span>
                <div >
                    <a>                      
                        创建文件夹
                    </a>
                    <a style="margin-left: 10px;">
                        上传
                    </a>
                </div>
            </div>
        </header>
    </div>
</template>
<script>
    export default{
        created(){
            this.$store.commit('page',"3")
        }
    }
</script>
<style>
    #file{
        position:fixed;
        top: 99px;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: #f1f1f1;
    }
    .library-header-wrapper{
        position:fixed;
        top: 99px;
        z-index: 3;
        width:100%;
        background-color: pink;
    }
    .library-header{
        width:1100px;
        margin: 20px auto 0;
        padding: 18px 20px;
        background-color: #fff;
        border-radius: 3px 3px 0 0;
        font: 16px/20px "微软雅黑";
        display:flex;
        justify-content: space-between;
    }
    .library-header div a{
        display: inline-block;
        font:14px/14px "微软雅黑";
        color: #fff;
        padding: 3px 5px;
        background-color: rgba(12,119,226,.8);
        border-radius: 3px;
    }
    .library-header div a:hover{
        background-color: rgba(12,119,226,.6)
    }
</style>