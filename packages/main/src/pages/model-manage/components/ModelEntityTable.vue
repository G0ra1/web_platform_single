<script lang="ts" setup>
import { NButton, NModal, NForm, NInput, NFormItem, NSwitch, NDescriptions, NDescriptionsItem, NIcon, NMention, useDialog, useMessage } from "naive-ui";
import { formRef, formValueRef, rules, showModalRef, show, tableNameOptions, switchCreateTypeHandle, showAddRef, tableNameChangeHandle, entitySaveEvent, transferAppInfo, initDialog } from "./ModelEntityTable";
import { NwIcon } from "@platform/main";
import { AddCircleSharp } from '@vicons/ionicons5';
import { inject } from 'vue';
// 引入组件库全局样式资源
import 'tdesign-vue-next/es/style/index.css';
import { AutoComplete as TAutoComplete, HighlightOption as THighlightOption } from "tdesign-vue-next";
//暴露到外部可以访问的属性
defineExpose({ show });
const formRefLocal = formRef;
//由于inject限定只能使用于setup中，所以，只能这样传递一下，不能直接在ts中使用；
const appInfo = inject('appInfo')
initDialog(useDialog(), useMessage());
transferAppInfo(appInfo);
</script>

<template>
    <n-modal v-model:show="showModalRef" preset="dialog" :mask-closable="true" :closable="true"
        style="width: 800px; padding: 0">
        <template #icon>
            <nw-icon name="icon-biaodan" :size="20" color="rgb(103, 194, 58)" />
        </template>
        <template #header>
            <div>添加表</div>
        </template>
        <n-form ref="formRefLocal" :model="formValueRef" :rules="(rules as any)" size="medium" label-placement="left"
            label-width="auto" require-mark-placement="right-hanging" style="padding:20px 30px">
            <!-- <n-form-item label="选择数据源" path="dbSource">
                <n-select v-model:value="formValueRef.dbSource" placeholder="选择数据源" :options="generalOptions"
                    @update:value="handleUpdateDs" />
            </n-form-item> -->
            <n-form-item label="表创建类型">
                <n-switch v-model:value="formValueRef.createType" :round="false" :checked-value=1 :unchecked-value=0
                    @update:value="switchCreateTypeHandle" />
                <n-descriptions style="margin-left: 1em;">
                    <n-descriptions-item>
                        <template #label>
                            {{ formValueRef.createTypeView }}
                        </template>
                    </n-descriptions-item>
                </n-descriptions>
                <n-button quaternary style="font-size: 24px" v-if="showAddRef" onclick="alert('选择表暂没时间做，可以使用#联想录入先！')">
                    <n-icon>
                        <AddCircleSharp />
                    </n-icon>
                </n-button>
            </n-form-item>
            <!-- <n-form-item label="表名" path="tableName">
                <n-mention :options="tableNameOptions" :prefix="['#']" placeholder="输入#试试看！"
                    v-model:value="formValueRef.tableName" v-on:blur="tableNameChangeHandle" />
            </n-form-item> -->
            <n-form-item label="表名" path="tableName">
                <t-auto-complete v-model="formValueRef.tableName" :options="tableNameOptions" highlight-keyword
                    filterable placeholder="直接输入表名，支持联想输入！" @select="tableNameChangeHandle" style="width: 650px"
                    clearable autoFocus :popup-props="{ overlayClassName: 't-demo-autocomplete-option-list' }">
                    <template #option="{ option }">
                        <div class="custom-option">
                            <img :src="option.avatar" />
                            <div class="custom-option__main">
                                <t-highlight-option :content="option.text" :keyword="formValueRef.tableName" />
                                <small class="description">{{ option.description }}</small>
                            </div>
                        </div>
                    </template>

                </t-auto-complete>
            </n-form-item>
            <n-form-item label="中文名称" path="tableNameCh">
                <n-input placeholder="测试表" v-model:value="formValueRef.tableNameCh" />
            </n-form-item>
            <n-form-item label="表前缀" path="tablePrefix">
                <n-input placeholder="incloud_base_" v-model:value="formValueRef.tablePrefix" />
            </n-form-item>
            <n-form-item label="包名" path="packageName">
                <n-input placeholder="com.netwisd.base" v-model:value="formValueRef.packageName" />
            </n-form-item>
            <n-form-item label="模块名" path="moduleName">
                <n-input placeholder="模块名" v-model:value="formValueRef.moduleName" />
            </n-form-item>
            <n-form-item label="二级模块名" path="subModuleName">
                <n-input placeholder="二级模块名" v-model:value="formValueRef.subModuleName" />
            </n-form-item>
            <n-form-item label="作者" path="author">
                <n-input placeholder="incloud@netwisd.com" v-model:value="formValueRef.author" />
            </n-form-item>
        </n-form>
        <!-- 调试信息
        <pre>{{ JSON.stringify(formValueRef, null, 2) }}
        </pre> -->
        <template #action>
            <div style="padding: 5px">
                <n-button size="small" @click="showModalRef = false">取消</n-button>
                <n-button type="primary" size="small" style="margin-right: 5px" @click="entitySaveEvent">
                    提交
                </n-button>
            </div>
        </template>
    </n-modal>
</template>
<style>
body {
    --td-brand-color: rgb(189, 31, 31);
    --td-brand-color-focus: #fff;
}

.t-demo-autocomplete-option-list .t-select-option {
    height: 50px;
}

.t-demo-autocomplete-option-list .custom-option {
    display: flex;
    align-items: center;
}

.t-demo-autocomplete-option-list .custom-option>img {
    max-height: 40px;
    border-radius: 50%;
}

.t-demo-autocomplete-option-list .custom-option__main {
    margin-left: 8px;
}

.t-demo-autocomplete-option-list .custom-option .description {
    color: var(--td-gray-color-9);
}
</style>