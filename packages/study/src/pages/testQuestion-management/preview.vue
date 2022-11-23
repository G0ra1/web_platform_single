<template>
  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    :title="`预览`"
    content="你确认"
    positive-text="确认"
    
    negative-text="取消"
    style="width:800px;"
  >
  <div style="with:600px;height:400px;border-top:10px solid black;border-radius:25px;padding:10px;border-bottom:10px solid black;border-right:5px solid black;border-left:5px solid black;">
    <n-list>
        <template #header>
         <p> <span style="display:inline-block;font-size:18px;font-weight:bolder"> 1、 {{modelRef.question}} </span>    
         <span style="display:inline-block;    
            margin-left: 5px;
            height: 20px;
            width: 50px;
            border-radius: 20px;
            border: 1px solid #ccc;
            text-align: center;
            background-color: #ccc;">{{questionCodes.filter(d=>d.value == modelRef.questionCode)[0].label}}</span> </p>
        </template>
         <template #footer>
            解析：{{modelRef.parse}}
        </template>
        <n-list-item v-if="modelRef.questionCode==0 || modelRef.questionCode==1" v-for="item in modelRef.answers" :key="item" >
           <p  :style="`color:${item.isTrue ? '#1060c9' : '#606266'};width:100%`"> 
               <span :style="`display: inline-block;
                    height: 25px;
                    width: 25px;
                    border:${item.isTrue ? '1px solid #fff' : '1px solid #606266'} ;
                    border-radius: 50px;
                    text-align: center;
                    line-height: 25px;
                    background-color:${item.isTrue ? '#1060c9' : 'white'};
                    color: ${item.isTrue ? 'white' : '#606266'} ;`"
                >{{letters.filter(d=>d.value == item.sort)[0].label }} 
                </span><span style="padding-left:4px"> {{item.answer}}</span>
            </p>
        </n-list-item>
         <n-list-item  v-if="modelRef.questionCode==2" v-for="item in modelRef.answers" :key="item" >
              <span style="padding-left:4px">{{item.sort + 1}}、{{item.answer}}</span>
        </n-list-item>
         <n-list-item style="padding:6px 0;" v-if="modelRef.questionCode==3" v-for="item in options" :key="item" >
          
             <span  :style="`color:${modelRef.answers[0].isTrue == item.value ? '#1060c9' : '#606266'};width:100%`">
                {{ item.label }}
            </span>
        </n-list-item>
         <n-list-item  v-if="modelRef.questionCode==4" v-for="item in modelRef.answers" :key="item" >
              <span >{{item.answer}}</span>
        </n-list-item>
    </n-list>
  </div>
     
   <template #action>
        <div style="padding: 0 5px 5px 0;">
          <n-button size="small" type="default"  style="margin-right: 5px" @click="showModal = false" >关闭</n-button>
            
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
    NCard,
    NList,
    NListItem,
     NRadio,
      NSpace,
  NRadioGroup,
} from 'naive-ui'
import {   } from './api'
import { cloneDeep } from 'lodash'
import { Aes } from '@platform/main'

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
        NCard,
        NList,
        NListItem,
         NRadio,
        NSpace,
    NRadioGroup,
    },
    props: {
        
     },

  setup (props,context) {
    const showModalRef = ref(false)
    const defaultSelecteRow = ref('')
    const modelRef = ref({
       
    })
  
    const sonFn = (row={}) => {
      showModalRef.value = true
      modelRef.value=cloneDeep(row)
      console.log(row,'00-0-00-')
     
    };
   
    onMounted(async () => {
       
    })
    return {
      sonFn,
      showModal: showModalRef,
      modelRef,
       defaultSelecteRow,
        letters:reactive([
        {label:'A',value:0},{label:'B',value:1},{label:'C',value:2},{label:'D',value:3},{label:'E',value:4},{label:'F',value:5},{label:'G',value:6},{label:'H',value:7},
        {label:'I',value:8},{label:'J',value:9},{label:'K',value:10},{label:'L',value:11},{label:'M',value:12},{label:'N',value:13},{label:'O',value:14},{label:'P',value:15},
        {label:'Q',value:16},{label:'R',value:17},{label:'S',value:18},{label:'T',value:19},{label:'U',value:20},{label:'V',value:21},{label:'W',value:22},
        {label:'X',value:23},{label:'Y',value:24},{label:'Z',value:25},

      ]),
      num:reactive([
        "一","二","三","四","五","六","七","八","九","十"
      ]),
      questionCodes:reactive([
        {label:'单选题',value:0},
        {label:'多选题',value:1},
        {label:'填空题',value:2},
        {label:'判断题',value:3},
        {label:'简答题',value:4},
      ]),
      grades:reactive([
        {label:'易',value:0},
        {label:'中',value:1},
        {label:'难',value:2},
       
      ]),
      options:reactive([
        {label:'错误',value:0},
        {label:'正确',value:1},
      ]),
    }
  },
  methods: {
   
  }
})
</script>
<style lang="less" scoped>
 /deep/ .n-list .n-list-item{
     padding:0px
 }
 /deep/ .n-list .n-list-item:not(:last-child){
     border-bottom: none;
 }
</style>