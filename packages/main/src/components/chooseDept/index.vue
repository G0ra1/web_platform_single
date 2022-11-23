<template>
    <!-- <n-input  class="my-search" placeholder="" size='small' disabled :title="props.orgUserName"  :value="props.orgUserName || '未选择用户'" v-if="isShowSearch">
        <template #suffix>
            <n-button type="info"   @Click="(e)=>{sonFn()}">选择</n-button>
        </template>
  </n-input> -->
    <div style="width:100%;height:100%;line-height:1px;display:flex;border:1px solid rgb(118, 124, 130)">
        <div style="flex:1">
            <n-ellipsis style="max-width: 100%" :line-clamp="1">
                <n-tag v-for="item in (props.orgUserName ? props.orgUserName.split(',') : [])" :key="item" :value="item"
                    closable @close="handleClose(item)">{{ item }}</n-tag>
            </n-ellipsis>

        </div>
        <div style="width:20px;height:100%">
            <nw-icon name="icon-n-y-add" :size="14" style="height:25px" @Click="(e) => { sonFn() }" />
        </div>
    </div>
    <n-modal v-model:show="showModal" :mask-closable="false" preset="dialog" title="选择组织" content="你确认"
        positive-text="确认" @positive-click="onPositiveClick" @negative-click="onNegativeClick" negative-text="取消"
        style="width:500px;">
        <n-grid>
            <n-grid-item span="24" style="height: 800px;">
                <div class="sider">
                    <n-input v-model:value="pattern" placeholder="搜索" />
                    <n-spin :show="leftSpinShow">
                        <n-tree size="small" placeholder="请选择" :data="tree.treeList" style='height:750px;padding:5px 0'
                            block-line virtual-scroll :render-prefix="renderPrefix" checkable
                            :default-checked-keys="defaultCheckedKeys" :default-expanded-keys="defaultExpandedKeys"
                            @update:checked-keys="checkedKeys" />
                    </n-spin>
                </div>
            </n-grid-item>
        </n-grid>
    </n-modal>
</template>

<script>
import { defineComponent, ref, reactive, onMounted, h } from 'vue'
import {
    NModal,
    NInput,
    NForm,
    NFormItem,
    NGrid,
    NGridItem,
    NTreeSelect,
    NSelect,
    NTree,
    NSpin,
    NTag,
    NEllipsis
} from 'naive-ui'
import { rightList, } from '../../pages/page-linkman/api/index.js'
import { NwIcon } from '@platform/main'

export default defineComponent({
    components: {
        NModal,
        NInput,
        NForm,
        NFormItem,
        NGrid,
        NGridItem,
        NTreeSelect,
        NSelect,
        NTree,
        NSpin,
        NwIcon,
        NTag,
        NEllipsis
    },
    props: {
        model: {
            default: () => { },
            type: Object,
        },
        multiple: {
            type: Boolean,
            default: true
        },
        propTreeList: {
            type: Object,
            default: () => null
        },
        showSide: {
            type: Boolean,
            default: true
        },
        isShowSearch: {
            type: Boolean,
            default: false
        },
        value: {
            type: String,
            default: () => ''
        },
        orgUserName: {
            type: String,
            default: () => "",
        },
    },

    setup(props, context) {
        const showModalRef = ref(false)
        const leftSpinShow = ref(false)
        const spinShow = ref(false);
        const xTable = ref()
        const model = ref({})
        const defaultKey = ref()
        const tree = reactive({
            treeList: [], //原始数据

        })
        const renderPrefix = ({ option }) => {
            return h(
                NwIcon,
                { name: option.orgType == 1 ? "icon-n-y-fenjifenlei" : "icon-n-y-app" },
            )
        }
        const alreadyDept = ref([])
        const orgId = ref('')
        const selectRow = ref({})
        const pattern = ref('')
        const defaultCheckedKeys = ref([])
        const defaultExpandedKeys = ref(['0'])
        const sonFn = (arr) => {
            showModalRef.value = true

            if (props.isShowSearch) {
                defaultCheckedKeys.value = props.value ? props.value.split(',') : []
                console.log(defaultCheckedKeys.value, ' defaultCheckedKeys.value defaultCheckedKeys.value')
            }
        };

        const checkedKeys = (arr, e) => {
            alreadyDept.value = []
            console.log(e, '-=-=-=-=')
            alreadyDept.value = e.map(d => {
                d.orgId = d.id
                d.orgType = d.orgType
                d.orgName = d.label
                return d
            })
        }
        const onPositiveClick = (row) => {
            spinShow.value = true
            if (!props.multiple) {
                context.emit('update:callback', {});
                spinShow.value = false
            } else {

                context.emit('update:callback', alreadyDept.value);
                spinShow.value = false
            }
        }
        const handleClose = (v) => {

            alreadyDept.value = alreadyDept.value.filter(d => d.orgName != v)
            context.emit('update:callback', alreadyDept.value);
        }
        onMounted(async () => {
            leftSpinShow.value = true
            rightList({ isDefault: 0, status: 1, }).then((res) => {

                const getStr = (list) => {
                    list.forEach((row) => {
                        if (row.kids.length > 0) {
                            row.label = row.orgName
                            row.key = row.id
                            row.children = row.kids
                            row.disabled = row.orgType == 1 ? true : false
                            getStr(row.kids)
                        } else {
                            row.label = row.orgName
                            row.key = row.id
                            row.disabled = row.orgType == 1 ? true : false

                        }
                    })
                }
                getStr(res)
                leftSpinShow.value = false
                tree.treeList = res
                defaultExpandedKeys.value = ['0']
            })

        })
        return {
            sonFn,
            checkedKeys,
            spinShow,
            leftSpinShow,
            handleClose,
            orgId,
            defaultCheckedKeys,
            defaultExpandedKeys,
            defaultKey,
            xTable,
            renderPrefix,
            model, // 表单数据
            showModal: showModalRef,
            tree,
            pattern,
            selectRow,
            props,
            onPositiveClick,
            onNegativeClick() {
                showModalRef.value = false
            },

        }
    },
    methods: {

    }
})
</script>
<style lang="less">
.employeePickModal {
    .ivu-modal-body {
        padding: 0;
    }
}

.employeePick {
    height: 34px;

    .viewEmployeeColumnDel {
        padding: 2px;

        .ivu-table-cell {
            padding: 0 0 0 10px
        }
    }

    .table-title {
        font-size: 14px;
        font-weight: bold;
        text-indent: 10px;

        .table-title-btn {
            float: right;
            margin: 10px;
        }
    }

    .employeePickInput {
        .ivu-input {
            background-color: #fff;
            color: #333;
            cursor: help;
        }
    }

    .ivu-poptip {
        .ivu-poptip-rel {
            width: 100%;
            vertical-align: middle;
        }

        .ivu-poptip-body {
            padding: 0
        }
    }

    .table-left {
        border-top: 0;
        border-bottom: 0;
        border-right: 0;
    }

    .table-right {
        border: 0;
    }

    .ivu-modal-body {
        padding: 0;
    }

    .ivu-modal-footer {
        border-top: 0;
    }

    .sider {
        padding: 5px;
        border-bottom: 1px solid #dcdee2;
        height: 500px;

    }

    .ivu-poptip-popper {
        padding: 0
    }
}
</style>
