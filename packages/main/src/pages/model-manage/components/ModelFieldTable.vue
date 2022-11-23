<script lang="ts" setup>
import { NButton, useDialog, useMessage, NIcon, NSwitch } from "naive-ui"
import { CaretUpOutline, CaretDownOutline, ArrowUpOutline, ArrowDownOutline, TrashOutline } from '@vicons/ionicons5';
import { tableData, formatConfirm, vxeTableRef, typeList, moveRowEvent, removeRowEvent, toTop, toButtom, initDialog, fkFieldNameList, handleFkField, handleFieldName } from "./ModelFieldTable.ts"
//当前vue对象的引用，引入后再赋值一下，要不不好用
const vxeTableRefLocal = vxeTableRef;
//因为使用了inject，所以只能在setup请求中使用，所以里传递一下；
initDialog(useDialog(), useMessage());
</script>
<template>
    <vxe-table border round show-overflow :data="tableData" :column-config="{resizable: true}" ref="vxeTableRefLocal"
        :edit-config="{trigger: 'click', mode: 'row',autoClear: false, showIcon: false}" size="mini" highlight-hover-row
        height="100%">
        <vxe-column field="sort" width="4%" title="序号">
            <template #edit="{ row }">
                <vxe-input v-model="row.sort" type="text"></vxe-input>
            </template>
        </vxe-column>
        <vxe-column field="fieldName" width="17%" title="字段" :edit-render="{autofocus: '.vxe-input--inner'}">
            <template #edit="{ row }">
                <vxe-input v-model="row.fieldName" type="text" placeholder="下划线连接字段名"
                    @change="(value:any) => handleFieldName(row,value)" />
            </template>
        </vxe-column>
        <vxe-column field="fieldNameCh" width="13%" title="中文名" :edit-render="{}">
            <template #edit="{ row }">
                <vxe-input v-model="row.fieldNameCh" type="text" placeholder="中文名"></vxe-input>
            </template>
        </vxe-column>
        <vxe-column field="dbType" width="8%" title="数据库类型" :edit-render="{}">
            <template #edit="{ row }">
                <vxe-select v-model="row.dbType" transfer>
                    <vxe-option v-for="item in typeList" :key="item.value" :value="item.value" :label="item.label">
                    </vxe-option>
                </vxe-select>
            </template>
        </vxe-column>
        <vxe-column field="length" width="6%" title="长度" :edit-render="{}">
            <template #edit="{ row }">
                <vxe-input v-model="row.length" type="number" placeholder="长度"></vxe-input>
            </template>
        </vxe-column>
        <vxe-column field="precision" width="6%" title="精度" :edit-render="{}">
            <template #edit="{ row }">
                <vxe-input v-model="row.precision" type="number" placeholder="精度"></vxe-input>
            </template>
        </vxe-column>
        <vxe-column field="isNotNull" width="6%" title="不为空" :edit-render="{}" align="left">
            <template #default="{ row }">
                <span>{{ formatConfirm(row.isNotNull) }}</span>
            </template>
            <template #edit="{ row }">
                <n-switch :round="false" v-model:value="row.isNotNull" :checked-value=1 :unchecked-value=0>
                    <template #checked> 是 </template>
                    <template #unchecked> 否 </template>
                </n-switch>
            </template>
        </vxe-column>
        <vxe-column field="isKey" width="5%" title="主键" :edit-render="{}">
            <template #default="{ row }">
                <span>{{ formatConfirm(row.isKey) }}</span>
            </template>
            <template #edit="{ row }">
                <n-switch :round="false" v-model:value="row.isKey" :checked-value=1 :unchecked-value=0>
                    <template #checked> 是 </template>
                    <template #unchecked> 否 </template>
                </n-switch>
            </template>
        </vxe-column>
        <vxe-column field="isUnique" width="5%" title="唯一" :edit-render="{}">
            <template #default="{ row }">
                <span>{{ formatConfirm(row.isUnique) }}</span>
            </template>
            <template #edit="{ row }">
                <n-switch :round="false" v-model:value="row.isUnique" :checked-value=1 :unchecked-value=0>
                    <template #checked> 是 </template>
                    <template #unchecked> 否 </template>
                </n-switch>
            </template>
        </vxe-column>
        <vxe-column field="fkFieldId" width="15%" title="关联键" :edit-render="{}">
            <template #default="{ row }">
                {{row.fkFieldName}}
            </template>
            <template #edit="{ row }">
                <vxe-select v-model="row.fkFieldId" transfer @change="(value:any) => handleFkField(row,value)">
                    <vxe-option v-for="item in fkFieldNameList" :key="item.value" :value="item.value"
                        :label="item.label" />
                </vxe-select>
            </template>
        </vxe-column>
        <vxe-column title="置顶&nbsp;/置底&nbsp;/上移&nbsp;/下移&nbsp;/删除" width="15%" fixed="right" align="center">
            <template #default="{ row }">
                <n-button size="small" @click="toTop(row)" style="margin-right: 3px;">
                    <n-icon :size="12" :component="CaretUpOutline" />
                </n-button>
                <n-button size="small" @click="toButtom(row)" style="margin-right: 3px;">
                    <n-icon :size="12" :component="CaretDownOutline" />
                </n-button>
                <n-button size="small" @click="moveRowEvent(row,'up')" style="margin-right: 3px;">
                    <n-icon :size="12" :component="ArrowUpOutline" />
                </n-button>
                <n-button size="small" @click="moveRowEvent(row,'down')" style="margin-right: 3px;">
                    <n-icon :size="12" :component="ArrowDownOutline" />
                </n-button>
                <n-button size="small" @click="removeRowEvent(row)">
                    <n-icon :size="13" :component="TrashOutline" />
                </n-button>
            </template>
        </vxe-column>
    </vxe-table>
</template>