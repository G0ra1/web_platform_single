
<template>
    <n-popover :theme-overrides="{ padding: 0}" placement="bottom-end" trigger="hover" :show-arrow="false">
        <template #trigger>
        <n-button> {{ActiveMenuData.label}}</n-button>
        </template>
        <div>
            <div style="padding: 5px;">
                <n-input size="small"></n-input>
            </div>
            <div style="padding: 5px 0 5px 5px;background:var(--light-gray5);border-top: 1px solid #ccc;border-bottom: 1px solid #ccc;">
                
                <n-scrollbar
                ref="scrollRef"
                style="max-height: 140px;"
                trigger="none"
                class="datalist"
                >
                    <div
                        v-for="item in list"
                        :key="item.value"
                        @click="handle(item)"
                        class="dataitem"
                    >
                    {{item.label}}
                    </div>
                    <div class="datamore">
                        <InfiniteLoading
                        
                        @infinite="loadData" >
                            <template #complete>
                                <div class="complete" style="">没有更多数据了</div>
                            </template>
                        </InfiniteLoading>
                    </div>
                </n-scrollbar>
            </div>
            <div style="padding: 5px;">
                <a href="javascript:void()" @click="handleParentMenu">查看所有</a>
            </div>
        </div>
    </n-popover>
</template>
<script lang="ts">

import { h, ref, toRefs, reactive, defineComponent, watch, nextTick } from 'vue'

import { NwIcon, RequestPaging, VxeHelper, request, Page } from '@platform/main'

import {
    ActiveMenuData,
    ActiveMenuDataRequest,
    handleParentMenu
} from '../store'

export default defineComponent({
    // props: {
    // },
    components: {
    },
    setup (props) {
        const scrollRef = ref<any>(null)
        const list = ref<Array<any>>([])
        const pageNum = ref(1)
        const pages = ref(1)
        const isComplete = ref<boolean>(false)
        const load = async () => {
            if (isComplete.value) {
                return true
            }
            return request({
                url: ActiveMenuDataRequest.value, // '/main/page/list'
                method: 'POST',
                data: {
                    page: {
                        current: pageNum.value,
                        size: 10
                    }
                }
            }).then((res) => {
                list.value.push(...res.records.map((d: any) => ({
                    valueKey: ActiveMenuData.value.valueKey,
                    value: d[ActiveMenuData.value.valueKey],
                    labelKey: ActiveMenuData.value.labelKey,
                    label: d[ActiveMenuData.value.labelKey],
                    row: d
                })))
                console.log('-=-=list.value====', list.value)
                pages.value = res.pages
                if (res.current < res.pages) {
                    pageNum.value = pageNum.value + 1
                }
                return res.current === res.pages
            })
        }
        return {
            scrollRef,
            ActiveMenuData,
            list,
            loadData (p: any) {
                console.log(p)
                load().then((r) => {
                    if (r) {
                        isComplete.value = true
                        p.complete()
                    } else {
                        p.loaded()
                    }
                })
            },
            handle (item: any) {
                Page.toLevel2Menu(item.valueKey, item.value, item.labelKey, item.label, item.row)
            },
            handleParentMenu
        }
    }
})

</script>

<style scoped lang="less">
.header {
    display: flex;

    height: 100%;
    &-menulevel2 {
        display: flex;
        align-items: center;
        >.title {
            padding: 0 10px;
            font-size: 18px;
            border-right: 1px solid var(--gray5);
            margin-right: 10px;
        }
    }
}
.datalist {
    .dataitem {
        cursor: pointer;
        padding: 2px 0 2px 10px;
        &:hover {
            background-color: var(--light-gray3);
        }
    }
    .datamore {
        height: 22px;
        align-items: center;
        justify-content: center;
        .complete {
            padding-top: 5px;
            text-align: center;
            font-size:12px;
            color: #888;
        }
    }
}
</style>
