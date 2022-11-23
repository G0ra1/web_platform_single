<template>
  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    :title="`历史版本管理`"
    content="你确认"
    positive-text="确认"
    
    negative-text="取消"
    style="width:1200px;"
  >
  <n-spin :show="isLoading">
       <n-card style="height:600px">
            <vxe-toolbar style="height:40px">
            <template v-slot:buttons>
                <vxe-button status="danger" :disabled="select.length==0" size='small' @click="removeEvent(select)">删除</vxe-button>
                <vxe-input v-model="filterName1" type="search" placeholder="全表搜索" size='small' @keyup="searchEvent" style="height: 37px;margin-left: 10px"></vxe-input>

            </template>
            </vxe-toolbar>
            <vxe-table
                ref="xTable"
                border
                height="500px"
                size='small'
                :data="arr.studyExamQuestionDefList"
                :checkbox-config="{checkField: 'checked', trigger: 'row',}"
                highlight-current-row
                @checkbox-change="selectChangeEvent"
            >
                <vxe-column type="checkbox" width="60"></vxe-column>

                <vxe-column field="userNameCh" title="人员名称" ></vxe-column>
                <vxe-column field="parentOrgName" title="所属单位" ></vxe-column>
                <vxe-column field="version" title="版本号" ></vxe-column>
                <vxe-column field="isMainVersion" title="是否主版本" >
                    <template v-slot="{ row }">
                    <span :style="row.isMainVersion == 1 ? 'color:#2080f0' : 'color:red'">{{row.isMainVersion == 1 ?'是':'否'}}</span>
                    </template>
                </vxe-column>
                <vxe-table-column field="" title="操作">
                    <template v-slot="{ row }">
                        <a style="color:#2080f0;cursor:pointer " @click="setVersion(row)" v-if="row.isMainVersion !== 1">设置主版本</a>
                        <a style="color:red;cursor:pointer;margin-left:10px " @click="removeEvent([row])">删除</a>
                    </template>
                </vxe-table-column>
            </vxe-table>
        </n-card>
    </n-spin>
    <template #action>
        <div style="padding: 0 5px 5px 0;">
          <n-button size="small" type="info" @click="onPositiveClick" >关闭</n-button>
            
        </div>
    </template>
  </n-modal>
   
</template>

<script>
import { defineComponent, ref,reactive,onMounted  } from 'vue'
import { 
    NModal,
    NInput,
    NForm,
    NFormItem,
    NGrid,
    NGridItem,
    NTreeSelect,
    NSelect,
    NButton,
    NSpin,
    useMessage,
    NUpload,
    NImage,
    NRadioGroup,
    NSpace,
    NRadio,
    NCard
} from 'naive-ui'
import {mdmDutyVersionList, settingMainVersion, mdmDutyVersionDel } from './api'
import XEUtils from 'xe-utils'
import { NwIcon } from '@platform/main';
import NwDictionary from '/@/components/nw-dictionary/index.vue'
import { VXETable,  } from 'vxe-table'

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
        NButton,
        NSpin,
        NwIcon,
        NUpload,
        NImage,
        NRadio,
        NwDictionary,
        NRadioGroup,
        NSpace,
        NCard,
        
    },
    props: {
         model: {
          default: {},
          type: Object,
        },
     },

  setup (props,context) {
    const showModalRef = ref(false)
    const modelRef = ref({})
    const isLoading = ref(false)
    const arr = reactive({
      studyExamQuestionDefList:[],
      studyExamQuestionDefData:[]
    })
    const filterName1 = ref('')
    const message = useMessage();
    const xTable = ref()
    const select = ref([])
    const sonFn = (e={}) => {
      showModalRef.value = true
      getData(e)
    };
    const selectChangeEvent = ({ checked, records })=> {
        select.value=records
    }
    const setVersion = (e) =>{
       isLoading.value=true
       settingMainVersion(e.id).then((res)=>{
            isLoading.value=false
            getData(modelRef.value)
       })
    }
    const getData = (e) =>{
        isLoading.value = true
        modelRef.value = {...e}
        mdmDutyVersionList(e.id).then((res)=>{
            isLoading.value = false
            arr.studyExamQuestionDefList = res
            arr.studyExamQuestionDefData = res
        })
    }
    const searchEvent = () =>{
        const filterName = XEUtils.toValueString(filterName1.value).trim().toLowerCase()
        if (filterName) {
            const filterRE = new RegExp(filterName, 'gi')
            const searchProps = ['userNameCh', 'parentOrgName','version']
            const rest = arr.studyExamQuestionDefData.filter(item => searchProps.some(key => XEUtils.toValueString(item[key]).toLowerCase().indexOf(filterName) > -1))
           arr.studyExamQuestionDefList = rest.map(row => {
                const item = Object.assign({}, row)
                searchProps.forEach(key => {
                item[key] = XEUtils.toValueString(item[key]).replace(filterRE, match => `${match}`)
                })
                return item
            })
        } else {
             arr.studyExamQuestionDefList = arr.studyExamQuestionDefData
        }
    }
     // 删除
    const removeEvent = (selected) => {
          let id = selected.map(d=>d.id).join(',')
        mdmDutyVersionDel(id).then(res=>{
            window.$message.success("删除成功");
            getData(modelRef.value)
        })
    }
  
    onMounted(async () => {
       
    })
    return {
      sonFn,
      xTable,
      arr,
      filterName1,
      searchEvent,
      removeEvent,
      showModal: showModalRef,
      model:modelRef, // 表单数据
      isLoading,
      message,
      getData,
      setVersion,
      select,
      selectChangeEvent,
      rules: {
      },
    
      onPositiveClick (){
          context.emit('update:callback');
              showModalRef.value = false
        
        
      },
      onNegativeClick () {
        
        showModalRef.value = false
      },
     
    }
  },
 created() {
    

  },
  methods: {
    // 数组合并去重方法
    uniqueArr(arr1,arr2){
        arr1.push(...arr2)
        let arr3 = Array.from(new Set(arr1))
        return arr3
    },
  }
})
</script>