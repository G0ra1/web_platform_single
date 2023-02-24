<template>
    <n-layout-header class="grid-search" :style="{
        maxHeight: visible ? '350px' : '0px'
    }">
        <div class="search-box" style="height: 350px;">
            <h5>筛选条件</h5>
            <nullDataContent v-if="searchGroup <= 0"></nullDataContent>
            <div v-else style="overflow: auto;height: 320px; padding-bottom: 35px;box-sizing: border-box;">
                <div v-for="(searchList, index) in searchGroup" :key="index">
                    <n-space v-for="(search, i) in searchList" :key="i" :align="'end'" style="margin-top:10px">
                        <n-button text @click="() => delFilter(index, i)">
                            <NwIcon name="icon-n-n-cut" :size="14"></NwIcon>
                        </n-button>
                        <n-select v-model:value="search.keyWord" :options="filedOptions"
                            @update:value="(v) => keyWordChange(v, index, i)" style="width:150px" placeholder="请选择查询条件">
                        </n-select>
                        <n-select v-model:value="search.operationType" :fallback-option="() => ({ label: '等于' })"
                            :options="operation[search.isIncludeRang ? 'rang' : 'normal']" style="width:150px"
                            placeholder="请选择查询条件" @update:value="(v) => operationTypeChange(v, index, i)"></n-select>
                        <div v-if="search.vType == 'string'">
                            <n-input v-model:value="search.value" style="width:200px" placeholder="请输入"></n-input>
                        </div>
                        <div v-if="search.vType == 'number'">
                            <n-input-number v-model:value="search.value" style="width:200px" placeholder="请输入">
                            </n-input-number>
                        </div>
                        <div v-if="search.vType == 'date'">
                            <n-date-picker v-model:formatted-value="search.value" value-format="yyyy-MM-dd" type="date"
                                clearable />
                        </div>
                        <div v-if="search.vType == 'dateRange'">
                            <n-date-picker v-model:value="search.value" type="daterange" clearable />
                        </div>
                        <div v-if="search.vType == 'dept'">
                            <n-input-group>
                                <n-input v-model:value="search.valueText" style="width:200px"
                                    placeholder="输入部门"></n-input>
                                <chooseDept2 :isShowSearch="true" :orgUserName="''" :value="search.receiverDeptIds"
                                    @update:callback="
                                        (e: any) => {
                                            search.value = e.map((d: any) => d.id).join(',')
                                            search.valueText = e.map((d: any) => d.orgName).join(',')
                                        }
                                    "></chooseDept2>
                            </n-input-group>
                        </div>
                        <div v-if="search.vType == 'user'">
                            <n-input v-model:value="search.valueText" style="width:200px" placeholder="输入人员"></n-input>
                            <NwEmployeePick :value="search.value" @updateValue="(d: string) => { search.value = d }"
                                @updateExpreParamValueText="(d: string) => { search.valueText = d }"></NwEmployeePick>
                        </div>
                        <div v-if="search.vType == 'dic'">
                            <NwDic v-if="dictOptions[search.keyWord].dictCode"
                                :dictCode="dictOptions[search.keyWord].dictCode" placeholder="请选择" style="width:200px"
                                v-model:value="search.value"></NwDic>
                            <NwDic v-if="dictOptions[search.keyWord].dictUrl"
                                :request="{ url: dictOptions[search.keyWord].dictUrl, method: dictOptions[search.keyWord].method }"
                                :response="{
                                    dataMethod: (res: []) => {
                                        res.map((d: any) => {
                                            d.value = d[dictOptions[search.keyWord].codeFiled]
                                            d.label = d[dictOptions[search.keyWord].nameFiled]
                                        })
                                        return res
                                    }
                                }" placeholder="请选择" style="width:200px" v-model:value="search.value"></NwDic>
                        </div>
                    </n-space>
                    <n-space style="margin-top:10px" v-if="searchList.length < filedOptions.length">
                        <n-button text @click="() => addFilter(index)">
                            <NwIcon name="icon-n-n-add" :size="14"></NwIcon>
                            <span style="margin-left:10px">
                                添加条件
                            </span>
                        </n-button>
                    </n-space>
                    <n-divider dashed v-if="index != (searchGroup.length - 1)">
                        或
                    </n-divider>
                </div>
                <n-button text @click="test">
                    <span style="margin-left:10px">
                        submit
                    </span>
                </n-button>
            </div>
            <div class="bottom-box">
                <n-button @click="addGroup">添加条件组</n-button>
            </div>
        </div>

    </n-layout-header>
</template>
<script setup lang="ts">
import { ref, reactive, computed, defineComponent, nextTick, h } from "vue";
import {
    NButton,
    NModal,
    NLayoutHeader,
    NSpace,
    NSelect,
    NInput,
    NInputNumber,
    NDivider,
    NDatePicker,
    NInputGroup
} from 'naive-ui'
import { NwIcon } from '@platform/main'
import nullDataContent from './nullDataContent.vue'
import type { SearchNS } from './type.d'
import { searchGroup, filedOptions, dictOptions, newSearchModel, addGroup, keyWordChange, test, addFilter, delFilter, operationTypeChange } from './index.ts'
import operation from './operation'
import {
    NwDic,
    NwEmployeePick,
    NwEmployee,
    chooseDept2
} from '@platform/main';


const props = withDefaults(defineProps<{
    maxHeight: string,
    options: Array<SearchNS.option>
}>(), {
    maxHeight: '200px',
    options: () => ([])
})


const visible = ref<boolean>(false)

// 初始化 搜索条件
newSearchModel(props.options)

const toggle = () => {
    visible.value = !visible.value
}
defineExpose({
    toggle,
    visible
})
/**
请求参数示例
{
    param1: 
}
 */
</script>
<style lang="less">
.nw-layout-full.n-layout .n-layout-header.grid-search {
    transition: .3s;
    background-color: #fff;
    height: auto;
    display: block;
    position: relative;

    .search-box {
        position: relative;

        h5 {
            padding: 0;
            margin: 0;
            font-weight: 500;
            font-size: 14px;
        }

        .bottom-box {
            position: absolute;
            width: 100%;
            bottom: 0;
            background-color: #fff;

            .n-button {
                width: 100%;
            }
        }
    }
}
</style>
