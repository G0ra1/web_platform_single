<template>
    <n-drawer
      v-model:show="showModal"
      width="100%"
      :height="200"
      placement="right"
      style="z-index:1001"
      :to="$refs.page && $refs.page.$el"
    >
    <n-drawer-content
      :title="`新设用户信息`"
      :header-style="{
      'padding': '10px',
      'font-size': '16px',
      'font-weight': 'bold'
    } "
      :footer-style="{
        'padding': '10px',
      }"
    >
        <n-card style="height:100%">
            <vxe-table 
              border
              resizable
              keep-source
              show-overflow
              ref="xTable"
              size="small"
              :edit-config="{trigger: 'click', mode: 'row',  showStatus: true, autoClear: false,}"
              :data="model"
             height="90%"
            >
             <vxe-table-column
                field="userName"
                title="账户名称"
                width="150"
                :edit-render="{name: 'input', defaultValue: '',
                 events: { change: userNameChange },
                }"
              ></vxe-table-column>
              <vxe-table-column
                field="userNameCh"
                title="姓名"
                width="150"
                :edit-render="{name: 'input', defaultValue: '',
                 events: { change: userNameChChange },
                }"
              ></vxe-table-column>
               <vxe-table-column
                field="email"
                title="邮箱"
                width="150"
                 :edit-render="{name: 'input', defaultValue: '',
                 events: { change: emailChange },
                 }"
              ></vxe-table-column>
              <vxe-table-column
                field="phoneNum"
                title="手机号"
                width="150"
                 :edit-render="{name: 'input', defaultValue: '',
                 events: { change: phoneNumChange },
                 }"
              ></vxe-table-column>
               <vxe-table-column
                field="cardType"
                title="证件类型"
                width="200"
                 :edit-render="{}"
              >
                <template v-slot:edit="row">
                  <vxe-select  @change="cardTypeChange(row)" v-model="row.row.cardType" placeholder="小型尺寸" size="small">
                    <vxe-option v-for="item in cardTypes" :key="item.value" :value="item.value" :label="item.label"></vxe-option>
                  </vxe-select>
                </template>
                 <template v-slot="{ row }">{{row.cardType ? cardTypes.filter(d=>d.value==row.cardType)[0].label : '' }}</template>

              </vxe-table-column>
             <vxe-table-column
                field="idCard"
                title="证件号码"
                width="150"
                 :edit-render="{name: 'input', defaultValue: '',
                 events: { change: idCardChange },
                 }"
              ></vxe-table-column>
              <vxe-table-column
                field="sex"
                title="性别"
                width="100"
                 :edit-render="{}"
              >
                <template v-slot:edit="row">
                  <vxe-select  @change="sexChange(row)" v-model="row.row.sex" placeholder="小型尺寸" size="small">
                    <vxe-option v-for="item in sexList" :key="item.value" :value="item.value" :label="item.label"></vxe-option>
                  </vxe-select>
                </template>
                 <template v-slot="{ row }">{{row.sex ? (row.sex==1?'男':'女') :''}}</template>

              </vxe-table-column>
              <vxe-table-column
                field="birthday"
                title="出生年月"
                width="150"
                 :edit-render="{name: 'input'}"
              >
                <template v-slot:edit="row">
                
                 <NDatePicker 
                    type="date"
                    format='yyyy-MM-dd'
                    :value="row.row.birthday" 
                    size="small"
                    @update:value="(p)=>{
                      row.row.birthday=(p) 
                      model[row._rowIndex].birthday=formatDate(p)
                      $refs.xTable.clearActived()
                    }"
                
                 />
                </template>
                <template v-slot="{ row }">{{row.birthday && formatDate(row.birthday)}}</template>

              </vxe-table-column>
              <vxe-table-column
                field="parentId"
                title="所属部门"
                width="320"
                :edit-render="{name: 'input'}"
              >
                <template v-slot:edit="row">
                
                    <n-tree-select 
                      :value="row.row.parentDeptId"
                      @update:value="(p)=>{
                        row.row.parentDeptId=p 
                        row.row.parentDeptName=filterTableMater(p,tree.treeList).orgName
                        row.row.orgFullId=filterTableMater(p,tree.treeList).orgFullId
                        row.row.orgFullName=filterTableMater(p,tree.treeList).orgFullName 
                        row.row.parentOrgName=filterTableMater(p,tree.treeList).parentOrgName 
                        row.row.parentOrgId=filterTableMater(p,tree.treeList).parentOrgId 

                        model[row._rowIndex].parentDeptId=p
                        model[row._rowIndex].parentDeptName=filterTableMater(p,tree.treeList).orgName
                        model[row._rowIndex].orgFullId=filterTableMater(p,tree.treeList).orgFullId
                        model[row._rowIndex].orgFullName=filterTableMater(p,tree.treeList).orgFullName
                        model[row._rowIndex].parentOrgId=filterTableMater(p,tree.treeList).parentOrgId  
                        model[row._rowIndex].parentOrgName=filterTableMater(p,tree.treeList).parentOrgName  
                        model[row._rowIndex].parentDeptFullName=filterTableMater(p,tree.treeList).parentDeptFullName 
                        model[row._rowIndex].parentOrgFullName =filterTableMater(p,tree.treeList).parentOrgFullName 
                        $refs.xTable.clearActived()
                      }"
                      filterable
                      clearable
                       :options="getStr(tree.treeList)" 
                       size="small" 
                       v-model="row.row.parentDeptId" 
                    />

                 </template>
                 <template v-slot="{ row }">{{row.parentName }}</template>

              </vxe-table-column>

              <vxe-table-column
                field="ce"
                width="200"
                title="所属主岗"
                 :edit-render="{name: 'input', defaultValue: '',
                  events: { change: parentIdChange },
                 }"
              ></vxe-table-column>
             
             
              <vxe-table-column
                title="操作"
                width="5%"
                align="center"
              >
                <template v-slot="{ row }">
                
                  <a style="color:red;cursor:pointer " @click="removeEvent(row)">删除</a>
                </template>

              </vxe-table-column>
            </vxe-table>
            <template #action> 
              <div style="text-align: center;display:table;width:100%;height:100%;cursor: pointer;" @click="insertEvent">
                <a style="display:table-cell;vertical-align:middle;" >添加</a>
              </div>
             </template>
        </n-card>
    
      <template #footer>
        <n-button
            type="info"
            size="small"
            style="margin-right: 5px;"
            @click="handleCreat"
          >保存</n-button>
          <n-button
            size="small"
            @click="close"
          >取消</n-button>
      </template>
    </n-drawer-content>
  </n-drawer>
  
</template>

<script lang="jsx">
  // import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-grids';
  // console.log('===ej2btn===', GridComponent);
  import { defineComponent, ref, reactive,onMounted,  } from 'vue'
  import {
    NDrawer,
    NDrawerContent,
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NThemeEditor,
    NButton,
    NInputGroup,
    NInput,
    NForm,
    NFormItem,
    NGrid,
    NGridItem,
    NTreeSelect,
    NSelect,
    NCard,
    NDatePicker
  } from 'naive-ui'
  import { default as NwTable, NwTableFun } from '../../components/nw-table/index.vue'
  import { VXETable,  } from 'vxe-table'
  import {  creatEmp } from './api'
  import { rightList, checkOrg } from '../organization-manage/api'

  export default defineComponent({
    components: {
      NDrawer,
      NDrawerContent,
      NwTable,
      NButton,
      NLayout,
      NLayoutHeader,
      NLayoutContent,
      NInputGroup,
      NInput,
      NwTableFun,
      NForm,
      NFormItem,
      NGrid,
      NGridItem,
      NTreeSelect,
      NSelect,
      NCard,
      NDatePicker
    },
     props: {
     
     },
    setup (props,context) {
      const formVisible = ref(false)
      const model = reactive([])
      const tableV = reactive({})
      const xTable = ref()
      const sonFn = (e) => {
        tableV.value = e
        formVisible.value = true
        
      };
      const tree = reactive({
        treeList:[], //原始数据
       
      })
      const sexList = ref([
        { label: '男', value: 1},
        { label: '女', value: 2}
      ])
     
       const cardTypes = reactive([
        { label: '居民身份证', value: '0' },
        { label: '港澳居民来往内地通信证', value: '1' },
        { label: '港澳居民居住证', value: '2' },
        { label: '台湾居民来往大陆通行证', value: '3' },
        { label: '台湾居民居住证', value: '4' },
        { label: '外国护照', value: '5' },
        { label: '外国人永久居留身份证', value: '6' },
        { label: '外国人居留证', value: '7' },
      ])
     
       // 新增
       const insertEvent = async (row) => {
              const $table = xTable.value
              const record = {
              // mdmPostUserDto:{},
               orgType:2,
              //  cardType:0
              }
              const num = model.length
              model[num]={...record}
              const { row: newRow } = await $table.insertAt(record, -1)
            //   await $table.setActiveCell(newRow, 'sex')
        }
        //删除
         const removeEvent = (row) => {
              const $table = xTable.value
              
              VXETable.modal.confirm('您确定要删除该数据?').then(type => {
                if (type === 'confirm') {
                  $table.remove(row)
                }
              })
      }
      onMounted(async () => {
         rightList({isDefault:0,status:1,}).then((res) => {
         
             const getStr = (list)=>{
                list.forEach((row)=>{
                  row.level = row.level +1
                    if(row.kids.length>0){
                       row.label = row.orgName
                        row.key = row.id 
                        row.children = row.kids
                        getStr(row.kids)
                    }else {
                        row.label = row.orgName
                        row.key = row.id
                    }
                })
            }
            getStr(res)
             tree.treeList = res
          })
          mdmCommDicts({
            dictTypeId:'AE'
          }).then((res)=>{
            dictionaries.AE = res.map(d=>{
              d.label = d.dictName
              d.value = d.dictCode
              return d
            })
          })
          mdmCommDicts({
            dictTypeId:'AD'
          }).then((res)=>{
            dictionaries.AD = res.map(d=>{
              d.label = d.dictName
              d.value = d.dictCode
              return d
            })
          })
      })
      return {
        dictionaries,
        xTable,
        insertEvent,
        sonFn,
        tree,
        model, // 表单数据
        showModal: formVisible,
        tableV,
        sexList,
        
        cardTypes,
        
        removeEvent,
        handleCreat(e){
            creatEmp(model).then((res)=>{
                if(res){
                     context.emit('update:callback');
                    formVisible.value = false
                }

            })
          
         
        },
        close(){
          formVisible.value = false
        }
      }
    },
    methods: {
      formatDate(date) {
        var date = new Date(date);
        var YY = date.getFullYear() + '-';
        var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
        var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        return YY + MM + DD +" "+hh + mm + ss;//
      },
      userNameChange(row){
        this.$refs.xTable.clearActived(); //清除单元格激活状态
        this.$refs.xTable.setActiveCell(row.row, row.column.property); //设置单元格为激活状态
        this.model[row._rowIndex].userName=row.row.userName
        
      },
      userNameChChange(row){
        this.$refs.xTable.clearActived(); //清除单元格激活状态
        this.$refs.xTable.setActiveCell(row.row, row.column.property); //设置单元格为激活状态
        this.model[row._rowIndex].userNameCh=row.row.userNameCh
        
      },
       emailChange(row){
        this.$refs.xTable.clearActived(); //清除单元格激活状态
        this.$refs.xTable.setActiveCell(row.row, row.column.property); //设置单元格为激活状态
        this.model[row._rowIndex].email=row.row.email
        
      },
      phoneNumChange(row){
        this.$refs.xTable.clearActived(); //清除单元格激活状态
        this.$refs.xTable.setActiveCell(row.row, row.column.property); //设置单元格为激活状态
        this.model[row._rowIndex].phoneNum=row.row.phoneNum
        
      },
      cardTypeChange(row){
        this.$refs.xTable.clearActived(); //清除单元格激活状态
        this.$refs.xTable.setActiveCell(row.row, row.column.property); //设置单元格为激活状态
        this.model[row._rowIndex].cardType=row.row.cardType
        
      },
       idCardChange(row){
        this.$refs.xTable.clearActived(); //清除单元格激活状态
        this.$refs.xTable.setActiveCell(row.row, row.column.property); //设置单元格为激活状态
        this.model[row._rowIndex].idCard=row.row.idCard
        
      },
      sexChange(row){
        this.$refs.xTable.clearActived(); //清除单元格激活状态
        this.$refs.xTable.setActiveCell(row.row, row.column.property); //设置单元格为激活状态
        this.model[row._rowIndex].sex=row.row.sex
        
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
        getStr(list){
                list.forEach((row)=>{
                    if(row.kids.length>0){
                       if(row.orgType==1){
                          row.disabled = true
                        }
                        this.getStr(row.kids)
                    }else {
                        if(row.orgType==1){
                          row.disabled = true
                        }
                    }
                })
                return list
          }
     
    }
  })
</script>
<style lang='less'>
  
  .n-drawer-container{
      z-index:1001 !important;
  }
</style>