<template>
    <div class="express-view">
        <div v-if="!showSql" :class="{
            cursor: true,
            active: CursorIndex === -1
        }" @click="setCursorIndex(-1)">
        </div>
        <template v-for="item, key in ExpData" v-if="!showSql">
            <div :contenteditable="editableExpType.indexOf(item.type) >= 0"
                :class="{ 'default-style': true, 'file-style': item.type === 'field', 'param-style': item.type !== 'field' && item.type !== 'logic' && item.type !== 'operation' && item.type !== '(' && item.type !== ')' }"
                @click="() => clickHandel(item, key)" @blur="(e) => divBlur(e, key, item)">
                {{ item.text }}
            </div>
            <div :class="{
                cursor: true,
                active: CursorIndex === key
            }" @click="setCursorIndex(key)">
            </div>
        </template>
        <div class="sql-style" v-show="showSql">
            {{ ExpData.map((d: any) => {
                    return d.type == 'string' ? `"${d.code}"` : d.code
                }).join(' ')
            }}
        </div>
        <div class="button-style">
            <n-button size="small" type="info" @click="showSql = true">sql</n-button> <n-button size="small" type="info"
                @click="showSql = false">样式</n-button>
        </div>
    </div>
</template>
<script lang="tsx">
import { ref, reactive, nextTick, h } from 'vue'
import {
    NConfigProvider,
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NLayoutFooter,
    NGrid,
    NGi,
    NInputGroup,
    NInput,
    NButton,
    NSpin,
    NModal,
    NAlert
} from 'naive-ui'
import { cloneDeep } from 'lodash'
import { NwIcon } from '@platform/main'
import { calcInst, editableExpType, clickHandel } from './store'
export default {
    components: {
        NConfigProvider,
        NLayout,
        NLayoutHeader,
        NLayoutSider,
        NLayoutContent,
        NLayoutFooter,
        NGrid,
        NGi,
        NInputGroup,
        NInput,
        NSpin,
        NModal,
        NButton,
        NwIcon,
        NAlert
    },
    setup() {
        const {
            ExpData,
            CursorIndex
        } = calcInst
        const divBlur = (e: any, key: number, item: any) => {
            calcInst.editKey.value = key
            calcInst.pushExp({ key: item.type == 'string' ? "String" : 'Number', code: e.target.outerText, text: e.target.outerText })
        }
        const showSql = ref<Boolean>(false)
        return {
            ExpData,
            CursorIndex,
            editableExpType,
            divBlur,
            showSql,
            clickHandel,
            setCursorIndex(n: number) {
                calcInst.setCursorIndex(n)
            }
        }
    }
}
</script>

<style lang='less' scoped>
@keyframes animate {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 1;
    }

    50% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

.express-view {
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;
    height: 200px;
    overflow: auto;

    div {
        display: inline-block;
    }

    .default-style {
        height: 30px;
        line-height: 30px;
        max-width: 100%;
        box-sizing: border-box;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

    }

    .file-style,
    .param-style {
        min-width: 120px;
        width: auto;
        padding: 0 10px;
        border: 1px solid #ccc;
        background-color: brown;
        text-align: center;
        color: #fff;
        font-weight: 500;
        cursor: pointer;
    }

    .param-style {
        background-color: darkcyan;
    }

    .button-style {
        position: absolute;
        top: 0px;
        height: 200px;
        right: -45px;
        display: flex;
        align-content: space-around;
        flex-direction: column;
        flex-wrap: wrap;
    }

    .cursor {
        // visibility: hidden;
        margin-top: 4px;
        height: 22px;
        width: 2px;
        position: relative;
        top: -4px;
        background: #fff;
        border-left: 3px solid #fff;
        border-right: 3px solid #fff;
        cursor: text;

        &.active {
            background: var(--n-red4);
            // visibility: visible;
            opacity: 1;
            animation: animate 1s 1s infinite;
        }
    }

    // .exp-cursor {
    //     &.active {
    //         opacity: 1;
    //         .exp-cursor-l {
    //         animation: animate 2s 2s infinite;
    //         }
    //     }
    //     opacity: 0;
    //     display: inline-flex;
    //     border-left: 2px solid #fff;
    //     border-right: 2px solid #fff;
    //     width: 2px;
    //     height: 25px;
    //     cursor: text;
    //     position: relative;
    //     .icon {
    //         position: absolute;
    //         bottom: -10px;
    //         left: -4px;
    //     }
    //     &-l {
    //         display: inline-flex;
    //         width: 2px;
    //         height: 25px;
    //         cursor: text;
    //         background: red;
    //     }
    // }
}
</style>