<template>
    <ul class="list">
        <li>
            <div class="li-left">
                <Checkbox size="large"></Checkbox>
                <span style="margin-left: 30px;" v-if="true">123</span>
                <input type="text" class="input">
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
    </ul>
</template>