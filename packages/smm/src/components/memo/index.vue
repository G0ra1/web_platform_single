<template>
    <n-modal v-model:show="showModal" class="todoCreate" preset="dialog" :title="title" :style="{width:'650px'}">
        <n-form :model="dataModel" ref="formRef" label-placement="left" label-align="left" :label-width="80"
            size="small" :style="{
              padding: '10px',
              maxHeight:'620px',
              overflowX: 'hidden',
              overflowY:'auto'
            }">
            <n-grid :cols="24" :x-gap="24">
                <n-form-item-gi :span="24" label="日程标题" path="taskName">
                    {{dataModel.taskName}}
                </n-form-item-gi>
                <n-form-item-gi :span="24" label="日程内容" path="applyReason">
                    {{dataModel.applyReason}}
                </n-form-item-gi>
                <n-form-item-gi :span="24" label="备忘" path="finishExplain">
                    <n-input v-model:value="dataModel.finishExplain" type="textarea" clearable />
                </n-form-item-gi>
            </n-grid>
        </n-form>
        <template #action>
            <div class="footer-active">
                <n-button @click="cancelModal">取消</n-button>
                <n-button type="primary" @click="save">完成</n-button>
            </div>
        </template>
    </n-modal>
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
import {
    todofinish
} from "../../api/index.js"
import { cloneDeep } from 'lodash'

export default defineComponent({
    components: {
        NModal,
        NForm,
        NGrid,
        NFormItemGi,
        NDatePicker,
        NInput,
        NButton,
        NSelect,
    },
    setup(props, context) {
        const msg = useMessage()
        const title = ref("日程完成")
        const showModal = ref(false)
        const dataModel = ref({})
        const show = (data = {}) => {
            dataModel.value = data
            showModal.value = true
        }
        const cancelModal = () => {
            showModal.value = false
        }



        const save = () => {
            let data = cloneDeep(dataModel.value)
            todofinish(data.id, { finishExplain: data.finishExplain }).then(res => {
                msg.info('修改成功')
                cancelModal();
                context.emit('finishSuccess')
            })
        }
        onMounted(() => {

        })
        return {
            title,
            showModal,
            dataModel,
            show,
            save,
            cancelModal,
        }
    }
})
</script>
<style lang="less" scoped>
.todoCreate {
    .footer-active {
        width: 100%;
        padding: 14px 24px;
        display: flex;
        justify-content: flex-end;

        .n-button {
            margin-left: 10px;
        }
    }

}
</style>