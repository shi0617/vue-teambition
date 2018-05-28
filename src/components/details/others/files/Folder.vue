<template>
    <ul class="list">
        <li>
            <div class="li-left">
                <Checkbox size="large"></Checkbox>
                <span style="margin-left: 30px;" v-if="true">123</span>
                <input type="text" class="input" v-if="false">
                <span class="folder">
                    <Icon type="folder"></Icon>
                </span> 
            </div>
            <div class="li-right">
                <span>
                    <Icon type="arrow-move"></Icon>
                    <p>移动</p>
                </span>
                <span>
                    <Icon type="edit"></Icon>
                    <p>编辑</p>
                </span> 
                <span>
                    <Icon type="trash-a"></Icon>
                    <p>删除</p>
                </span> 
            </div>
        </li>
         <li v-if="$store.state.createFolderState">
            <div class="li-left">
                <Checkbox size="large"></Checkbox>
                <input 
                    type="text" 
                    class="input" 
                    v-focus="$store.state.createFolderState"
                    v-model="folderName"
                >
                <span class="folder">
                    <Icon type="folder"></Icon>
                </span> 
            </div>
            <div class="li-right">
                <a>
                    确定
                </a> 
                <a>
                    取消
                </a> 
            </div>
        </li>
    </ul>
</template>
<script>
    export default{
        data(){
            return{
                folderName:''
            }
        }
    }
</script>