<template>
    <n-modal v-model:show="showModal" class="todoCreate" preset="dialog" :title="title" :style="{width:'620px'}">
        <n-form :model="dataModel" :rules="rules" ref="formRef" label-placement="left" label-align="left"
            :label-width="80" size="small" :style="{
              maxHeight:'620px',
              overflowX: 'hidden',
              overflowY:'auto'
            }">
            <n-grid :cols="24" :x-gap="0">
                <n-form-item-gi :span="24" label="日期" path="taskTime">
                    <n-date-picker :disabled="dataModelDisabled" :style="{width:'100%'}"
                        v-model:value="dataModel.taskTime" type="datetimerange" />
                </n-form-item-gi>
                <n-form-item-gi :span="24" label="日程类型" path="scheduleType">
                    <n-select :disabled="dataModelDisabled||type == 'mySchedule'" placeholder="请选择日程类型"
                        v-model:value="dataModel.scheduleType" :default-value="1" :options="scheduleTypeOptions" />
                </n-form-item-gi>
                <n-form-item-gi :span="24" label="分类" path="taskClassifyDictCode">
                    <nwDictionary :disabled="dataModelDisabled" dictCode="TASK-CLASSIFY" placeholder="请选择分类"
                        v-model:value="dataModel.taskClassifyDictCode" v-model:label="dataModel.taskClassifyDictName">
                    </nwDictionary>
                </n-form-item-gi>
                <n-form-item-gi :span="24" label="优先级" path="priority">
                    <span v-for="i in [1,2,3,4,5]" :class="{'priority':true,'active':dataModel.priority==i}"
                        @click="()=>selectPriority(i)">{{i}}</span>
                </n-form-item-gi>
                <n-form-item-gi :span="24" label="标题" path="taskName">
                    <n-input :disabled="dataModelDisabled" placeholder="标题" v-model:value="dataModel.taskName" />
                </n-form-item-gi>
                <n-form-item-gi :span="24" label="内容" path="applyReason">
                    <n-input :disabled="dataModelDisabled" placeholder="内容" type="textarea"
                        v-model:value="dataModel.applyReason" />
                </n-form-item-gi>
                <n-form-item-gi :span="24" label="负责人" path="taskReceivePersonName" v-if="dataModel.scheduleType!=1">
                    <n-input :disabled="dataModelDisabled" placeholder="负责人" @click="()=>selectUser('taskReceive')"
                        v-model:value="dataModel.taskReceivePersonName" />
                </n-form-item-gi>
                <n-form-item-gi :span="24" label="创建人" path="taskStartUserName">
                    <n-input :disabled="dataModelDisabled" placeholder="创建人"
                        v-model:value="dataModel.taskStartUserName" />
                </n-form-item-gi>
                <n-form-item-gi v-if="dataModel.scheduleType=='2'" :span="24" label="参与人" path="participantPersonNames">
                    <n-input :disabled="dataModelDisabled" placeholder="参与人" @click="()=>selectUser('participant')"
                        v-model:value="dataModel.participantPersonNames" />
                </n-form-item-gi>
            </n-grid>

            <n-grid :cols="24" :x-gap="0" v-for="(item, i) in todoReminderList" v-if="dataModel.scheduleType==1">
                <n-form-item-gi :span="24" label="提醒时间" path="reminderTimeType">
                    <n-select placeholder="请选择提醒时间" v-model:value="item.reminderTimeType" @update:value="(v)=>{
                        reminderChange(v,i,'reminderTimeType')
                    }" :options="[
                        {label:'事件开始时',value:1},
                        {label:'10分钟之前',value:2},
                        {label:'一小时之前',value:3},
                        {label:'一天之前',value:4},
                        {label:'自定义',value:5},
                    
                    ]" />

                </n-form-item-gi>
                <n-form-item-gi :span="24" v-if="item.reminderTimeType==5" label="设置时间" path="reminderTime">
                    <n-date-picker :style="{width:'100%'}" v-model:value="item.reminderTime" @update:value="(v)=>{
                        reminderChange(v,i,'reminderTime')
                    }" type="datetime" />
                </n-form-item-gi>
                <n-form-item-gi :span="24" label="提醒方式" path="reminderMethod">
                    <n-select placeholder="请选择提醒方式" multiple v-model:value="item.reminderMethod" @update:value="(v)=>{
                        reminderChange(v,i,'reminderMethod')
                    }" :options="[
                        {label:'即时通',value:'1'},
                        {label:'短信',value:'2'},
                        
                    ]" />
                </n-form-item-gi>
            </n-grid>
            <div v-if="dataModel.scheduleType==1" class="addReminder">
                <span @click="todoReminderList.push({})">
                    新增提醒
                </span>
            </div>
        </n-form>
        <template #action>
            <div class="footer-active">
                <n-button @click="cancelModal">取消</n-button>
                <n-button type="primary" @click="save">保存</n-button>
                <n-button type="error" @click="finishTodo" v-if="!dataModelDisabled&&!!dataModel.id">
                    结束</n-button>
            </div>
        </template>
    </n-modal>
    <employeePick ref="employeePickRef" :multiple="userSelectMultiple" @update:callback="callbackUser"></employeePick>
</template>
<script lang="jsx">
import { ref, reactive, defineComponent, nextTick, h, onMounted } from 'vue'
import {
    NModal,
    NForm,
    NGrid,
    NFormItemGi,
    NDatePicker,
    NInput,
    NButton,
    NSelect,
    useMessage,
    useDialog
} from 'naive-ui'
import { nwDictionary, employeePick } from '@platform/smm';
import { createManual, todoUpdata, todoDetail } from "../../api/index.js"
import { cloneDeep } from 'lodash'
import { Db } from '@platform/main'
import { format } from "date-fns";
export default defineComponent({
    props: ['finish', 'type'],
    components: {
        NModal,
        NForm,
        NGrid,
        NFormItemGi,
        NDatePicker,
        NInput,
        NButton,
        NSelect,
        nwDictionary,
        employeePick,
    },
    setup(props, context) {
        const msg = useMessage()
        const dialog = useDialog()
        const title = ref("新建")
        const formRef = ref(null)
        const showModal = ref(false)
        const dataModel = ref({})
        const employeePickRef = ref(null)
        const dataModelDisabled = ref(false)
        const scheduleTypeOptions = ref([
            {
                label: '我的日程',
                value: 1
            },
            {
                label: '他人日程',
                value: 2
            }
        ])
        const userType = ref('')
        const userSelectMultiple = ref(false)
        const todoReminderList = ref([{

        }])
        const taskStartUserId = ref('')
        Db.get('userInfo').then((res) => {
            taskStartUserId.value = res.id
        })
        const rules = ref({

            taskTime: {
                required: true,
                message: '请选择日期',
                trigger: ['blur', 'input'],
                type: 'array'
            },
            scheduleType: {
                required: true,
                message: '请选择日程类型',
                trigger: ['blur', 'input'],
                type: 'number'
            },
            taskClassifyDictCode: {
                required: true,
                message: '请选择分类',
                trigger: ['blur', 'input'],
            },
            taskName: {
                required: true,
                message: '请输入标题',
                trigger: ['blur', 'input'],
            },
            applyReason: {
                required: true,
                message: '请输入内容',
                trigger: ['blur', 'input'],
            },
            taskReceivePersonName: {
                required: true,
                message: '请选择负责人',
                trigger: ['blur', 'input'],
            },
        })
        const show = (data = {}) => {
            showModal.value = true
            dataModel.value = data

            title.value = data.id ? "编辑" : "新建";
            if (!data.id) {
                dataModelDisabled.value = false
                dataModel.value.priority = 1;
                dataModel.value.scheduleType = 1;
                Db.get('userInfo').then((res) => {
                    dataModel.value.taskStartUserId = res.id
                    dataModel.value.taskStartUserName = res.userNameCh
                })
            } else {
                todoDetail(data.id).then(res => {
                    dataModel.value = res
                    dataModelDisabled.value = !(res.taskStartUserid == taskStartUserId.value || taskStartUserId.value == res.taskReceivePersonId)
                    dataModel.value.taskTime = [+new Date(res.taskStartTime), +new Date(res.taskEndTime)];
                    todoReminderList.value = res.todoReminderList.map(d => {
                        if (d.reminderTime) d.reminderTime = +new Date(d.reminderTime)
                        if (d.reminderMethod) d.reminderMethod = d.reminderMethod.split(',')
                        return d
                    })
                })


            }

        }
        const cancelModal = () => {
            showModal.value = false
        }
        const selectPriority = (i) => {
            if (dataModel.id) return false
            dataModel.value.priority = i
        }
        const selectUser = (t) => {
            userType.value = t
            userSelectMultiple.value = t == "participant"
            let dafaultData = []
            if (t == 'participant') {
                if (!dataModel.value.participantPersonNames) {

                } else {
                    let nameList = dataModel.value.participantPersonNames.split(','),
                        idList = dataModel.value.participantPersonIds.split(',');
                    nameList.forEach((d, i) => {
                        dafaultData.push({
                            empId: idList[i],
                            userNameCh: d
                        })
                    })
                }

            } else {
                let d = {}
                d.empId = dataModel.value.taskReceivePersonId
                d.userNameCh = dataModel.value.taskReceivePersonName
                dafaultData.push(d)
            }
            nextTick(() => {
                employeePickRef.value.sonFn(dafaultData)
            })

        }
        const callbackUser = (userList) => {
            if (userType.value == "taskReceive") {
                dataModel.value.taskReceivePersonName = userList[0].userNameCh
                dataModel.value.taskReceivePersonId = userList[0].id
            }
            if (userType.value == "participant") {
                if (userList.length > 0) {
                    dataModel.value.participantPersonNames = userList.map(d => d.userNameCh).toString()
                    dataModel.value.participantPersonIds = userList.map(d => d.id).toString()
                } else {
                    dataModel.value.participantPersonNames = ""
                    dataModel.value.participantPersonIds = ""
                }

            }
        }
        const save = () => {
            let _validate = true
            formRef.value?.validate((errors) => {
                if (!errors) {
                } else {
                    msg.error("请完善表单");
                    _validate = false

                }
            });
            if (!_validate) return
            let data = cloneDeep(dataModel.value)
            data.todoReminderList = cloneDeep(todoReminderList.value).map(d => {
                d.reminderMethod ? d.reminderMethod = d.reminderMethod.toString() : ''
                if (d.reminderTime) d.reminderTime = format(new Date(d.reminderTime), 'yyyy-MM-dd HH:mm:ss')
                d.reminderUserName = data.taskStartUserName
                d.reminderUserid = data.reminderUserid
                return d
            })
            if (data.scheduleType == 1) {
                data.taskReceivePersonId = data.taskStartUserId
                data.taskReceivePersonName = data.taskStartUserName
            }

            if (data.taskTime) {
                data.taskEndTime = format(data.taskTime[1], 'yyyy-MM-dd HH:mm:ss')
                data.taskStartTime = format(data.taskTime[0], 'yyyy-MM-dd HH:mm:ss')
            }
            data.taskTime = null
            if (!data.id) {
                createManual(data).then(res => {
                    msg.info('保存成功')
                    cancelModal();
                    context.emit('saveSuccess')
                })
            } else {
                todoUpdata(data).then(res => {
                    msg.info('修改成功')
                    cancelModal();
                    context.emit('saveSuccess')
                })
            }
        }
        const finishTodo = () => {

            props.finish(dataModel.value)
        }
        const reminderChange = (v, i, t) => {
            console.log(v, i)
            todoReminderList.value[i][t] = v
        }
        onMounted(() => {
        })
        return {
            title,
            showModal,
            dataModel,
            show,
            scheduleTypeOptions,
            selectPriority,
            employeePickRef,
            selectUser,
            callbackUser,
            userSelectMultiple,
            userType,
            rules,
            save,
            todoReminderList,
            reminderChange,
            cancelModal,
            finishTodo,
            taskStartUserId,
            dataModelDisabled,
            formRef
        }
    }
})
</script>
<style lang="less" scoped>
.todoCreate {
    .n-grid {
        padding: 10px;
        border: 1px rgba(0, 0, 0, 0.1412) dashed;
        margin-bottom: 15px;
        width: auto !important;
    }

    .priority {
        display: inline-block;
        margin-left: 24px;
        height: 36px;
        width: 36px;
        border-radius: 50%;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        transition: all 0.5s;
    }

    .priorityColor(@i, @color: @primary-color) {
        .priority:nth-child(@{i}) {
            color: @color;
            border: 2px solid @color;
        }

        .priority:nth-child(@{i}).active {
            color: #fff;
            border: 2px solid @color;
            background-color: @color;
        }
    }

    .priorityColor(1, var(--lv1));
    .priorityColor(2, var(--lv2));
    .priorityColor(3, var(--lv3));
    .priorityColor(4, var(--lv4));
    .priorityColor(5, var(--lv5));

    .footer-active {
        width: 100%;
        display: flex;
        justify-content: flex-end;

        .n-button {
            margin-left: 10px;
        }
    }

    .addReminder {
        text-align: center;

        span {
            display: inline-block;
            width: 120px;
            height: 30px;
            border: 1px solid #ccc;
            line-height: 30px;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.3s;
        }

        span:hover {
            background: var(--n-red1);
            color: #fff;
        }
    }

}
</style>