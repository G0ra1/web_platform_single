
<template>
    <n-scrollbar style="height: 100%;">
        <template
            v-for="item in TaskData"
            :key="item.id"
        >
            <todo-card
                v-if="item.tmpCode === 'todoTask'"
                :title="item.msgTitle"
                :content="item.msgContent"
                :time="item.updateTime"
                :url="item.msgPcUrl"
            />
            
            <done-card
                v-else-if="item.tmpCode === 'applyTask'"
                :title="item.msgTitle"
                :content="item.msgContent"
                :time="item.updateTime"
                :url="item.msgPcUrl"
            />
        </template>
        
        <!-- <div style="padding: 10px 15px 0 10px" v-for="item in TaskData" :key="item.id">
            <div  class="task-card todo" >
                <div class="task-card-header">
                        
                    <div class="title">
                        {{item.msgTitle}}
                    </div>
                    <div class="extra">
                        
                    </div>
                </div>

                <div class="task-card-content">
                    {{item.msgContent}}
                </div>
                <div class="task-card-footer">
                    
                </div>
            </div>
        </div> -->
        <div style="height: 10px;"></div>
    </n-scrollbar>
</template>
<script lang="ts">

import { h, ref, toRefs, reactive, defineComponent, watch, nextTick } from 'vue'
import {
    NButton,
    NPopover,
    NTabs,
    NTabPane,
    NScrollbar
} from "naive-ui";

import { NwIcon, RequestPaging, VxeHelper } from '@platform/main'

import TodoCard from './todo.vue'
import DoneCard from './done.vue'

import { TaskData } from '../store'

export default defineComponent({
    // props: {
    // },
    components: {
        NButton,
        NPopover,
        NTabs,
        NTabPane,
        NwIcon,
        NScrollbar,
        TodoCard,
        DoneCard
    },
    setup (props) {
        const visible = ref<boolean>(false)
        return {
            TaskData,
            visible,
            theme: {
                padding: '5px'
            },
            // handle () {
            //     ChatRef.value.show()
            // },
            handleShow () {
                visible.value = true
            }
        }
    }
})

</script>

<style scoped lang="less">
.task-card {
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    height: 100px;
    box-shadow: 1px 1px 2px 0px var(--gray4);

    &.todo {
        // border: 1px solid #ccc;
        background-color: #edf7f2;
    }
    &.done {

    }
    &-header {
        flex: 0 1 22px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        >.title {
            font-weight: bold;
            color: var(--gray2);
            text-indent: 5px;
        }
        >.extra {

        }
    }
    &-content {
        flex: 1;
        padding: 0 5px;
        color: var(--gray1);
    }
    &-footer {

    }
}
</style>
