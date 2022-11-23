<template>
    <n-modal v-model:show="showModal" :mask-closable="false" preset="dialog" :title="'人员新增'" content="你确认"
        positive-text="确认" negative-text="取消" style="width:800px;">
        <n-spin :show="isLoading">
            <n-form :model="model" ref="formRef" :rules="rules">
                <n-grid x-gap="8" :cols="2">
                    <n-grid-item>
                        <n-form-item path="userName" label="账户名称">
                            <n-input v-model:value="model.userName" />
                        </n-form-item>
                    </n-grid-item>
                    <n-grid-item>
                        <n-form-item path="userNameCh" label="姓名">
                            <n-input v-model:value="model.userNameCh" />
                        </n-form-item>
                    </n-grid-item>

                    <n-grid-item>
                        <n-form-item path="passWord" label="密码">
                            <n-input v-model:value="model.passWord" @input="handlePasswordInput" type="password"
                                @keydown.enter.prevent />
                        </n-form-item>
                    </n-grid-item>
                    <n-grid-item>
                        <n-form-item first path="reenteredPassword" label="重复密码" ref="rPasswordFormItemRef">
                            <n-input :disabled="!model.passWord" v-model:value="model.reenteredPassword" type="password"
                                @keydown.enter.prevent />
                        </n-form-item>
                    </n-grid-item>

                    <n-grid-item>
                        <n-form-item path="nationality" label="国籍">
                            <n-select filterable v-model:value="model.nationality" placeholder="请选择国籍"
                                :options="dictionaries.AD" />
                        </n-form-item>
                    </n-grid-item>
                    <n-grid-item>
                        <n-form-item path="nation" label="民族">
                            <n-select filterable v-model:value="model.nation" placeholder="请选择国籍"
                                :options="dictionaries.AE" />
                        </n-form-item>
                    </n-grid-item>
                    <n-grid-item>
                        <n-form-item path="phoneNum" label="手机号">
                            <n-input v-model:value="model.phoneNum" />
                        </n-form-item>
                    </n-grid-item>
                    <n-grid-item>
                        <n-form-item path="cardType" label="证件类型">
                            <n-select v-model:value="model.cardType" placeholder="请选择证件类型" :options="cardTypes" />
                        </n-form-item>
                    </n-grid-item>
                    <n-grid-item>
                        <n-form-item path="idCard" label="证件号码">
                            <n-input v-model:value="model.idCard" />
                        </n-form-item>
                    </n-grid-item>
                    <n-grid-item>
                        <n-form-item path="sex" label="性别">
                            <n-select v-model:value="model.sex" placeholder="请选择证件类型" :options="sexList" />
                        </n-form-item>
                    </n-grid-item>

                    <n-grid-item>
                        <n-form-item path="parentDeptId" label="所属部门">
                            <n-tree-select @update:value="(p) => {
                                model.parentDeptId = p
                                model.parentDeptName = filterTableMater(p, tree.treeList).orgName
                                model.orgFullId = filterTableMater(p, tree.treeList).orgFullId
                                model.orgFullName = filterTableMater(p, tree.treeList).orgFullName
                                model.parentOrgId = filterTableMater(p, tree.treeList).parentOrgId
                                model.parentOrgName = filterTableMater(p, tree.treeList).parentOrgName
                                model.parentDeptFullName = filterTableMater(p, tree.treeList).parentDeptFullName
                                model.parentOrgFullName = filterTableMater(p, tree.treeList).parentOrgFullName
                            
                            }" filterable clearable :options="getStr(tree.treeList)" v-model="model.parentDeptId" />
                        </n-form-item>
                    </n-grid-item>
                    <n-grid-item>
                        <!-- <n-form-item path="" label="新岗位">
                      <n-select
                        v-model:value="model.postId"
                        placeholder="请选择证件类型"
                        :options="postList"
                        @update:value="(p)=>{
                            model.mdmPostUserDto= postList.filter((d)=>d.id==p)[0]
                        }"
                  /> -->
                        <n-form-item path="" label="新岗位">
                            <n-input class="my-search" placeholder="" disabled
                                :value="model.mdmPostUserDto ? model.mdmPostUserDto.postName : ''">
                                <template #suffix>
                                    <n-button type="info"
                                        @Click="(e) => { showPostPickModal({ parentDeptId: model.parentDeptId }) }">选择
                                    </n-button>
                                </template>
                            </n-input>
                        </n-form-item>

                    </n-grid-item>

                </n-grid>
            </n-form>
        </n-spin>
        <template #action>
            <div style="padding: 0 5px 5px 0;">
                <n-button size="small" type="default" style="margin-right: 5px" @click="showModal = false">取消</n-button>
                <n-button size="small" type="info" @click="handleValidateButtonClick">保存</n-button>

            </div>
        </template>
    </n-modal>
    <PostPickModal ref="postPickModal" :showSide="false" :multiple="false" @update:callback="
        (e) => {
            model.mdmPostUserDto = e
            //$refs.nwTable.commitQuery();
        }
    "></PostPickModal>
</template>

<script>
import { defineComponent, ref, reactive, onMounted } from 'vue'
import {
    NModal,
    NInput,
    NForm,
    NFormItem,
    NGrid,
    NGridItem,
    NTreeSelect,
    NSelect,
    NDatePicker,
    NButton,
    NSpin
} from 'naive-ui'
import { editEmp, creatEmp, mdmCommDicts } from './api'
import aes from '/@/utils/aes.js'
import { rightList, allPostList, checkOrg } from '../organization-manage/api'
import { getMdmPostByOrgId } from '../post-manage/api'
import PostPickModal from '../../components/postPickModal/postPickModal.vue'

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
        NDatePicker,
        PostPickModal,
        NButton,
        NSpin
    },
    props: {

    },

    setup(props, context) {
        const showModalRef = ref(false)
        const modelRef = ref({
            passWord: null,
            reenteredPassword: null
        })
        const tree = reactive({
            treeList: [], //原始数据

        })
        const isLoading = ref(false)
        const dictionaries = reactive({
            AE: [], //民族
            AD: [], //国籍
        })
        const sonFn = (e) => {
            showModalRef.value = true
            modelRef.value = { ...e, ...modelRef, passWord: '', sex: 1, nationality: '156', nation: '01', employmentType: 2, cardType: 0, }
        }
        const postPickModal = ref()
        const showPostPickModal = (row) => {
            postPickModal.value.sonFn(row);
        }
        const formRef = ref(null)
        const rPasswordFormItemRef = ref(null)
        const cardTypes = reactive([
            { label: '居民身份证', value: 0 },
            { label: '工作证号', value: 1 },
            { label: '人员编号', value: 2 },
        ])
        const sexList = ref([
            { label: '男', value: 1 },
            { label: '女', value: 2 }
        ])
        const employmentTypes = ref([
            { label: '合同制(正式员工)', value: 0 },
            { label: '派遣制', value: 1 },
            { label: '外包制(外协员工)', value: 2 },
            { label: '临时工', value: 3 },
            { label: '实习生', value: 4 }
        ])
        const getTime = (e) => {
            // var date = e ? new Date(e):null;
            return e ? new Date(e).getTime() : null
        }
        const formatDate = (date) => {
            var date = new Date(date);
            var YY = date.getFullYear() + '-';
            var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
            var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
            var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
            var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
            return YY + MM + DD + " " + hh + mm + ss;//
        }

        function validatePasswordStartWith(rule, value) {
            return (
                modelRef.value.passWord &&
                modelRef.value.passWord.startsWith(value) &&
                modelRef.value.passWord.length >= value.length
            )
        }
        function validatePasswordSame(rule, value) {
            return value === modelRef.value.passWord
        }
        onMounted(async () => {
            rightList({ isDefault: 0, status: 1, }).then((res) => {

                const getStr = (list) => {
                    list.forEach((row) => {
                        row.level = row.level + 1
                        if (row.kids.length > 0) {
                            row.label = row.orgName
                            row.key = row.id
                            row.children = row.kids
                            getStr(row.kids)
                        } else {
                            row.label = row.orgName
                            row.key = row.id
                        }
                    })
                }
                getStr(res)
                tree.treeList = res
            })
            mdmCommDicts({
                dictTypeId: 'AE'
            }).then((res) => {
                dictionaries.AE = res.map(d => {
                    d.label = d.dictName
                    d.value = d.dictCode
                    return d
                })
            })
            mdmCommDicts({
                dictTypeId: 'AD'
            }).then((res) => {
                dictionaries.AD = res.map(d => {
                    d.label = d.dictName
                    d.value = d.dictCode
                    return d
                })
            })
        })
        return {
            sonFn,
            dictionaries,
            postPickModal,
            tree,
            showPostPickModal,
            model: modelRef, // 表单数据
            showModal: showModalRef,
            cardTypes,
            isLoading,
            getTime,
            formatDate,
            sexList,
            employmentTypes,
            formRef,
            postList: reactive([]),
            rPasswordFormItemRef,
            rules: {
                userName: [
                    {
                        required: true,
                        message: '请输入账户名称',
                        trigger: ['input', 'blur']
                    }
                ],
                userNameCh: [
                    {
                        required: true,
                        message: '请输入姓名',
                        trigger: ['input', 'blur']
                    }
                ],
                email: [
                    {
                        required: true,
                        message: '请输入邮箱',
                        trigger: ['input', 'blur']
                    }
                ],
                nation: [
                    {
                        required: false,
                        message: '请选择民族',
                        trigger: ['input', 'blur']
                    }
                ],
                phoneNum: [
                    {
                        required: false,
                        message: '请输入手机号',
                        trigger: ['input', 'blur'],
                    }
                ],

                cardType: [
                    {
                        required: false,
                        type: 'number',
                        message: '请选择证件类型',
                        trigger: ['input', 'blur']
                    }
                ],

                idCard: [
                    {
                        required: false,
                        message: '请输入证件号码',
                        trigger: ['input', 'blur']
                    }
                ],

                sex: [
                    {
                        required: false,
                        type: 'number',
                        message: '请选择性别',
                        trigger: ['input', 'blur']
                    }
                ],
                birthday: [
                    {
                        required: true,
                        message: '请输入出生日期',
                        trigger: ['input', 'blur']
                    }
                ],
                parentDeptId: [
                    {
                        required: true,
                        validator(rule, value) {
                            if (!value) return new Error('请选择所属部门');
                            // return checkOrg(modelRef.value.parentDeptId);
                        },
                        trigger: ['input', 'blur']
                    }
                ],
                passWord: [
                    {
                        required: true,
                        message: '请输入密码',
                        trigger: ['input', 'blur']
                    }
                ],
                reenteredPassword: [
                    {
                        required: true,
                        message: '请再次输入密码',
                        trigger: ['input', 'blur']
                    },
                    {
                        validator: validatePasswordStartWith,
                        message: '两次密码输入不一致',
                        trigger: 'input'
                    },
                    {
                        validator: validatePasswordSame,
                        message: '两次密码输入不一致',
                        trigger: ['blur', 'password-input']
                    }
                ]
            },
            handlePasswordInput() {
                if (modelRef.value.reenteredPassword) {
                    rPasswordFormItemRef.value.validate({ trigger: 'password-input' })
                }
            },
            postUpParentChange(id) {
                if (!id) {
                    this.postList = []
                } else {
                    allPostList({ parentOrgId: id }).then((res) => {
                        this.postList = res ? res.map(d => {
                            d.label = d.postName
                            d.value = d.id
                            d.postId = d.id
                            return d
                        }) : []
                    })
                }
            },
            filterTableMater(id, arr) {
                for (const item of arr) {
                    if (item.id === id) return item
                    if (item.kids && item.kids.length) {
                        const _item = this.filterTableMater(id, item.kids)
                        if (_item) return _item
                    }
                }
            },
            getStr(list) {
                list.forEach((row) => {
                    if (row.kids.length > 0) {
                        if (row.orgType == 1) {
                            row.disabled = true
                        }
                        this.getStr(row.kids)
                    } else {
                        if (row.orgType == 1) {
                            row.disabled = true
                        }
                    }
                })
                return list
            },
            handleValidateButtonClick(e) {
                formRef.value.validate((errors) => {
                    if (!errors) {
                        isLoading.value = true
                        modelRef.value.passWord = aes.encrypt(modelRef.value.passWord)
                        modelRef.value.reenteredPassword = aes.encrypt(modelRef.value.reenteredPassword)
                        creatEmp(modelRef.value).then((res) => {
                            context.emit('update:callback');
                            showModalRef.value = false
                        }).finally(r => {

                            isLoading.value = false
                        })
                    } else {
                        console.log(errors)

                    }
                })
            },

        }
    },
    methods: {

    },

})
</script>