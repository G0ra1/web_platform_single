
<template>
    <div style="padding: 10px 15px 0 10px" >
        <div  class="task-card todo" >
            <div class="task-card-header">
                    
                <div class="title">
                    {{props.title}}
                </div>
                <div class="extra">
                    
                </div>
            </div>

            <div class="task-card-content">
                {{props.content}}
            </div>
            <div class="task-card-footer">
                <div class="time">
                    {{props.time}}
                </div>
                <div class="action">
                    <n-button size="tiny" @click="handle">
                        查看已办
                    </n-button>
                </div>
            </div>
        </div>
    </div>
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

import { TaskData } from '../store'

export default defineComponent({
    props: {
        title: {
            type: String,
            default: ''
        },
        content: {
            type: String,
            default: ''
        },
        time: {
            type: String,
            default: ''
        },
        url: {
            type: String,
            default: ''
        }
    },
    components: {
        NButton,
        NPopover,
        NTabs,
        NTabPane,
        NwIcon,
        NScrollbar
    },
    setup (props) {
        return {
            props,
            handle () {
                window.open(
                    props.url,
                    '_blank',
                    'top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no'
                )
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
    border: 1px solid #c5e7d5;
    background-color: #edf7f2;

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
        display: flex;
        justify-content: space-between;
        padding: 5px;
        >.time {
            display: flex;
            align-items: end;
            font-size: 12px;
            color: var(--gray3)
        }
    }
}
</style>
