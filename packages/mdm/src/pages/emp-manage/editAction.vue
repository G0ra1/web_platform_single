<template>
  <n-modal
    v-model:show="formVisible"
    preset="dialog"
    title="Dialog"
    style="width: 1400px; "
  >
    <template #header>
      <div>人员信息</div>
    </template>
  <n-spin :show="spinShow">
    <n-layout style="height: 800px">
      <n-layout
        has-sider
        position="absolute"
        style="
          top: 0px;
          bottom: 0px;
          padding-top: 10px;
          border-top: 1px solid rgba(0, 0, 0, 0.09);
        "
      >
        <n-layout-sider
          ref="sider"
          bordered
          collapse-mode="width"
          :width="305"
          style="
            margin-right: 10px;
            border-right: 1px solid rgba(0, 0, 0, 0.09);
          "
        >
          <n-menu
            :collapsed-width="70"
            :collapsed-icon-size="22"
            :default-value="1"
            :options="menuOptions"
            :on-update:value="menuSelect"
            style="width: 300px"
          />
        </n-layout-sider>
        <n-layout-content ref="content" :native-scrollbar="false">
          <n-form
            label-placement="left"
            style="padding-right: 15px; margin-bottom: 50px"
          >
            <n-divider title-placement="left" dashed ref="basic"><span style="color:#3f8fff;font-weight:bolder">|&nbsp</span>基本信息
              <n-button
                text
                type="info"
                style="position: absolute; right: 0px; background: #fff"
                @click="basicInfoEdit = !basicInfoEdit"
              >
                <template #icon>
                  <nw-icon name="icon-bianji" :size="20" />
                </template>
                {{ !basicInfoEdit ? "编辑" : "取消" }}
              </n-button></n-divider
            >
            <n-grid :cols="3" x-gap="12" style="width:90%;margin:0 auto">
             
              <n-gi>
                <n-form-item label="姓名" path="userNameCh">
                  <n-input
                    v-if="basicInfoEdit"
                    placeholder="请输入姓名"
                    size='small'
                    v-model:value="model.data.userNameCh"
                  />
                  <span v-if="!basicInfoEdit">{{ model.data.userNameCh }}</span>
                </n-form-item>
              </n-gi>
             
              <n-gi>
                <n-form-item label="国籍" path="nationality">
                   <n-select
                    size='small'
                    v-if="basicInfoEdit"
                    v-model:value="model.data.nationality"
                    placeholder="请选择国籍"
                    filterable
                    :options="dictionaries.AD"
                    
                  />
                  <span v-if="!basicInfoEdit">{{ model.data.nationality ? dictionaries.AD.filter(d=>d.value==model.data.nationality)[0].label : '' }}</span>
                </n-form-item>
              </n-gi>
              
              <n-gi>
                <n-form-item label="证件类型" path="cardType">
                  <n-select
                    size='small'
                    v-if="basicInfoEdit"
                    v-model:value="model.data.cardType"
                    placeholder="请选择证件类型"
                    :options="cardTypes"
                    
                  />
                  <span v-if="!basicInfoEdit">{{model.data.cardType ? cardTypes.filter(d=>d.value==model.data.cardType)[0].label : ''}}</span>
                </n-form-item>
              </n-gi>
              <n-gi>
                <n-form-item label="性别" path="sex">
                   <n-select
                    size='small'
                    v-if="basicInfoEdit"
                    v-model:value="model.data.sex"
                    placeholder="请选择性别"
                    :options="sexList"
                  />
                  <span v-if="!basicInfoEdit">{{model.data.sex ? sexList.filter(d=>d.value==model.data.sex)[0].label : ''}}</span>
                  
                </n-form-item>
              </n-gi>
              
              <n-gi>
                <n-form-item label="学历" path="education">
                   <n-input
                    size='small'
                    v-if="basicInfoEdit"
                    placeholder="请输入学历"
                    v-model:value="model.data.education"
                  />
                  <span v-if="!basicInfoEdit">{{model.data.education}}</span>
                </n-form-item>
              </n-gi>
              <n-gi>
                <n-form-item label="证件号" path="idCard">
                   <n-input
                    size='small'
                    v-if="basicInfoEdit"
                    placeholder="请输入证件号"
                    v-model:value="model.data.idCard"
                  />
                  <span v-if="!basicInfoEdit">{{model.data.idCard}}</span>
                </n-form-item>
              </n-gi>
              <n-gi>
                <n-form-item label="籍贯" path="nativePlace">
                   <n-input
                    size='small'
                    v-if="basicInfoEdit"
                    placeholder="请输入籍贯"
                    v-model:value="model.data.nativePlace"
                  />
                  <span v-if="!basicInfoEdit">{{
                    model.data.nativePlace
                  }}</span>
                </n-form-item>
              </n-gi>
              <n-gi>
                <n-form-item label="民族" path="nation">
                  
                   <n-select
                    size='small'
                    v-if="basicInfoEdit"
                    v-model:value="model.data.nation"
                    placeholder="请选择民族"
                    filterable
                    :options="dictionaries.AE"
                    
                  />
                  <span v-if="!basicInfoEdit">{{ model.data.nation ? dictionaries.AE.filter(d=>d.value==model.data.nation)[0].label : '' }}</span>

                </n-form-item>
              </n-gi>
              <n-gi>
                <n-form-item label="入职时间" path="gfEntryTime">
                   <n-date-picker 
                    v-if="basicInfoEdit"
                    type="date"
                     size='small'
                    format='yyyy-MM-dd'
                    style="width:100%"
                    :value="getTime(model.data.gfEntryTime)"
                    @update:value="(p)=>{
                      model.data.gfEntryTime = formatDate(p)
                    }"
                  />
                  <span v-if="!basicInfoEdit">{{model.data.gfEntryTime}}</span>
                </n-form-item>
              </n-gi>
              <n-gi>
                <n-form-item label="身高" path="height">
                   <n-input 
                      v-if="basicInfoEdit"
                      size="small"
                       placeholder="请输入" v-model:value="model.data.height" 
                    ><template #suffix>cm</template></n-input>
                  <span v-if="!basicInfoEdit">{{
                    model.data.height
                  }}</span>
                </n-form-item>
              </n-gi>
              <n-gi>
                <n-form-item label="体重" path="bodyWeight">
                   <n-input 
                    v-if="basicInfoEdit"
                      size="small"
                      placeholder="请输入" v-model:value="model.data.bodyWeight" 
                    ><template #suffix>kg</template></n-input>
                  <span v-if="!basicInfoEdit">{{
                    model.data.bodyWeight
                  }}</span>
                </n-form-item>
              </n-gi>
               <n-gi>
                <n-form-item label="离职时间" path="gfQuitTime">
                  <n-date-picker 
                    v-if="basicInfoEdit"
                    type="date"
                     size='small'
                    format='yyyy-MM-dd'
                    style="width:100%"
                    :value="getTime(model.data.gfQuitTime)"
                    @update:value="(p)=>{
                      model.data.gfQuitTime = formatDate(p)
                    }"
                  />
                  <span v-if="!basicInfoEdit">{{model.data.gfQuitTime}}</span>
                </n-form-item>
              </n-gi>
              <n-gi>
                <n-form-item label="血型" path="bloodType">
                   <n-input 
                    v-if="basicInfoEdit"
                      size="small"
                       placeholder="请输入" v-model:value="model.data.bloodType" 
                    />
                  <span v-if="!basicInfoEdit">{{
                    model.data.bloodType
                  }}</span>
                </n-form-item>
              </n-gi>
               
              
              <n-gi>
                <n-form-item label="出生日期" path="birthday">
                 <n-date-picker 
                    v-if="basicInfoEdit"
                    type="date"
                     size='small'
                     style="width:100%"
                    format='yyyy-MM-dd'
                    :value="getTime(model.data.birthday)"
                    @update:value="(p)=>{
                      model.data.birthday = formatDate(p)
                    }"
                  />
                  <span v-if="!basicInfoEdit">{{ model.data.birthday }}</span>
                </n-form-item>
              </n-gi>
              
              <n-gi >
                <n-form-item label="婚姻状况" path="marriageStatus">
                  <n-select
                    v-if="basicInfoEdit"
                     size='small'
                    v-model:value="model.data.marriageStatus"
                    placeholder="请选择婚姻状况"
                    :options="marriageStatusL"
                  />
                  <span v-if="!basicInfoEdit">{{model.data.marriageStatus ? marriageStatusL.filter(d=>d.value==model.data.marriageStatus)[0].label : ''}}</span>
                </n-form-item>
              </n-gi>
              <n-gi >
                <n-form-item label="政治面貌" path="politicsStatus">
                   <n-select
                    size='small'
                    v-if="basicInfoEdit"
                    v-model:value="model.data.politicsStatus"
                    placeholder="请选择政治面貌"
                    :options="politicsList"
                  />
                  <span v-if="!basicInfoEdit">{{model.data.politicsStatus? politicsList.filter(d=>d.value==model.data.politicsStatus)[0].label : ''}}</span>
                </n-form-item>
              </n-gi>
              <n-gi >
                <n-form-item label="生育状况" path="isFertility">
                   <n-select
                    size='small'
                    v-if="basicInfoEdit"
                    v-model:value="model.data.isFertility"
                    placeholder="请选择婚姻状况"
                    :options="whetherList"
                  />
                  <span v-if="!basicInfoEdit">{{model.data.isFertility ? whetherList.filter(d=>d.value==model.data.isFertility)[0].label : ''}}</span>
                </n-form-item>
              </n-gi>
              <n-gi >
                <n-form-item label="宗教信仰" path="religion">
                   <n-select
                    size='small'
                    v-if="basicInfoEdit"
                    v-model:value="model.data.religion"
                    placeholder="请选择政治面貌"
                    :options="religionList"
                  />
                  <span v-if="!basicInfoEdit">{{model.data.religion ? religionList.filter(d=>d.value==model.data.religion)[0].label : ''}}</span>
                </n-form-item>
              </n-gi>
              <n-gi >
                <n-form-item label="健康状况" path="healthCondition">
                  <n-select
                   size='small'
                    v-if="basicInfoEdit"
                    v-model:value="model.data.healthCondition"
                    placeholder="请选择健康状况"
                    :options="healthConditionList"
                  />
                  <span v-if="!basicInfoEdit">{{model.data.healthCondition ? healthConditionList.filter(d=>d.value==model.data.healthCondition)[0].label : ''}}</span>
                </n-form-item>
              </n-gi>
              <n-gi >
                <n-form-item label="个人专长" path="personalExpertise">
                   <n-input 
                      size='small'
                      v-if="basicInfoEdit"
                      
                      placeholder="请输入" v-model:value="model.data.personalExpertise" 
                    />
                  <span v-if="!basicInfoEdit">{{model.data.personalExpertise}}</span>
                </n-form-item>
              </n-gi>
              <n-gi >
                <n-form-item label="兴趣爱好" path="hobbies">
                   <n-input 
                      v-if="basicInfoEdit"
                      size="small"
                       placeholder="请输入" v-model:value="model.data.hobbies" 
                    />
                  <span v-if="!basicInfoEdit">{{
                    model.data.hobbies
                  }}</span>
                </n-form-item>
              </n-gi>
              

              <n-gi>
                <n-grid-item>
                  <n-form-item label="是否启用" path="status">
                    <n-select
                        v-if="basicInfoEdit"
                          v-model:value="model.data.status"
                          size="small"
                          placeholder="请选择是否启用"
                          :options="status"
                      />
                    <span v-if="!basicInfoEdit">{{model.data.status==1?'启用':'停用'}}</span>

                  </n-form-item>
              </n-grid-item>
            </n-gi>
            </n-grid>
                
            <n-divider title-placement="left" dashed ref="linkmanMessage"
              ><span style="color:#3f8fff;font-weight:bolder">|&nbsp</span>联系人信息
              <n-button
                text
                type="info"
                style="position: absolute; right: 0px; background: #fff"
                @click="linkmanMessageEdit = !linkmanMessageEdit"
              >
                <template #icon>
                  <nw-icon name="icon-bianji" :size="20" />
                </template>
                {{ !linkmanMessageEdit ? "编辑" : "取消" }}
              </n-button></n-divider
            >
            <n-grid :cols="3" x-gap="12" style="width:90%;margin:0 auto">
              <n-gi>
                <n-form-item label="手机号" path="phoneNum">
                  <n-input
                   size='small'
                    v-if="linkmanMessageEdit"
                    placeholder="请输入手机号"
                    v-model:value="model.data.phoneNum"
                  />
                  <span v-else>{{ model.data.phoneNum }}</span>
                </n-form-item>
              </n-gi>
              <n-gi>
                <n-form-item label="办公电话" path="officePhone">
                  <!-- <n-input
                   size='small'
                    v-if="linkmanMessageEdit"
                    placeholder="请输入办公电话"
                    v-model:value="model.data.officePhone"
                  /> -->
                  <span >{{ model.data.officePhone }}</span>
                </n-form-item>
              </n-gi>
              <n-gi>
                <n-form-item label="电子邮箱" path="email">
                  <n-input
                   size='small'
                    v-if="linkmanMessageEdit"
                    placeholder="请输入电子邮箱"
                    v-model:value="model.data.email"
                  />
                  <span v-if="!linkmanMessageEdit">{{ model.data.email }}</span>
                </n-form-item>
              </n-gi>
              <n-gi>
                <n-form-item label="QQ" path="qq">
                  <n-input
                   size='small'
                    v-if="linkmanMessageEdit"
                    placeholder="请输入QQ"
                    v-model:value="model.data.qq"
                  />
                  <span v-if="!linkmanMessageEdit">{{ model.data.qq }}</span>
                </n-form-item>
              </n-gi>
              <n-gi>
                <n-form-item label="微信" path="wechat">
                  <n-input
                   size='small'
                    v-if="linkmanMessageEdit"
                    placeholder="请输入微信"
                    v-model:value="model.data.wechat"
                  />
                  <span v-if="!linkmanMessageEdit">{{ model.data.wechat }}</span>
                </n-form-item>
              </n-gi>
              <n-gi>
                <n-form-item label="家庭住址" path="addr">
                  <n-input
                   size='small'
                    v-if="linkmanMessageEdit"
                    placeholder="请输入家庭住址"
                    v-model:value="model.data.addr"
                  />
                  <span v-if="!linkmanMessageEdit">{{ model.data.addr }}</span>
                </n-form-item>
              </n-gi>
              <n-gi>
                <n-form-item label="现居地址" path="nowAddr">
                  <n-input
                   size='small'
                    v-if="linkmanMessageEdit"
                    placeholder="请输入现居地址"
                    v-model:value="model.data.nowAddr"
                  />
                  <span v-if="!linkmanMessageEdit">{{ model.data.nowAddr }}</span>
                </n-form-item>
              </n-gi>
              <n-gi>
                <n-form-item label="现居地邮编" path="nowAddrZipcode">
                  <n-input
                   size='small'
                    v-if="linkmanMessageEdit"
                    placeholder="请输入现居地邮编"
                    v-model:value="model.data.nowAddrZipcode"
                  />
                  <span v-if="!linkmanMessageEdit">{{ model.data.nowAddrZipcode }}</span>
                </n-form-item>
              </n-gi>

            </n-grid>

            <n-divider title-placement="left" dashed ref="registered">
                <span style="color:#3f8fff;font-weight:bolder">|&nbsp</span>户口信息
                  <n-button
                    text
                    type="info"
                    style="position: absolute; right: 0px; background: #fff"
                    @click="registeredEdit = !registeredEdit"
                  >
                    <template #icon>
                      <nw-icon name="icon-bianji" :size="20" />
                    </template>
                    {{ !registeredEdit ? "编辑" : "取消" }}
                  </n-button>
              </n-divider>
              <n-grid :cols="3" x-gap="12" style="width:90%;margin:0 auto">
                <n-gi>
                  <n-form-item label="户口所在地" path="birthAddr">
                    <n-input
                     size='small'
                      v-if="registeredEdit"
                      placeholder="请输入户口所在地"
                      v-model:value="model.data.birthAddr"
                    />
                    <span v-if="!registeredEdit">{{ model.data.birthAddr }}</span>
                  </n-form-item>
                </n-gi>
                <n-gi>
                  <n-form-item label="户口性质" path="birthNature">
                    <n-select
                        size='small'
                        v-if="registeredEdit"
                        v-model:value="model.data.birthNature"
                        placeholder="请选择户口性质"
                        :options="birthNature"
                    />
                    <span >{{model.data.birthNature ? birthNature.filter(d=>d.value==model.data.birthNature)[0].label : ''}}</span>
                  </n-form-item>
                </n-gi>
                <n-gi>
                  <n-form-item label="出生地" path="birthPlace">
                    <n-input
                      v-if="registeredEdit"
                       size='small'
                      placeholder="请输入出生地"
                      v-model:value="model.data.birthPlace"
                    />
                    <span v-if="!registeredEdit">{{ model.data.birthPlace }}</span>
                  </n-form-item>
                </n-gi>
                <n-gi>
                  <n-form-item label="所属派出所" path="policeStation">
                    <n-input
                      v-if="registeredEdit"
                       size='small'
                      placeholder="请输入所属派出所"
                      v-model:value="model.data.policeStation"
                    />
                    <span v-if="!registeredEdit">{{ model.data.policeStation }}</span>
                  </n-form-item>
                </n-gi>
                <n-gi>
                  <n-form-item label="曾用名" path="formerName">
                    <n-input
                      v-if="registeredEdit"
                       size='small'
                      placeholder="请输入曾用名"
                      v-model:value="model.data.formerName"
                    />
                    <span v-if="!registeredEdit">{{ model.data.formerName }}</span>
                  </n-form-item>
                </n-gi>
              </n-grid>
              
              <n-divider title-placement="left" dashed ref="businessLicense"
                  ><span style="color:#3f8fff;font-weight:bolder">|&nbsp</span>岗位信息</n-divider>
                   <n-grid :cols="3" x-gap="12" style="width:90%;margin:0 auto">
                      <n-gi span="24">
                        <vxe-table
                          
                          :data="post.table"
                          style="width: 100%"
                          ref="postTable"
                          show-overflow
                        >
                      
                          <vxe-table-column
                            field="postName"
                            title="岗位名称"
                          >
                          </vxe-table-column>
                          <vxe-table-column
                            field="orgFullPostName"
                            title="所属单位"
                          >
                          </vxe-table-column>
                          <vxe-table-column
                            field="isMaster"
                            title="岗位性质"
                          >
                            <template v-slot="{ row }">{{row.isMaster==1? '主岗' :'兼岗' }}</template>
                          </vxe-table-column>
                        </vxe-table>
                      </n-gi>
                   </n-grid>
                <n-divider title-placement="left" dashed ref="businessLicense"
                  ><span style="color:#3f8fff;font-weight:bolder">|&nbsp</span>职位信息</n-divider>
                   <n-grid :cols="3" x-gap="12" style="width:90%;margin:0 auto">
                      <n-gi span="24">
                        <vxe-table
                          
                          :data="duty.table"
                          style="width: 100%"
                          
                          show-overflow
                        >
                      
                          <vxe-table-column
                            field="dutyName"
                            title="职位名称"
                          >
                          </vxe-table-column>
                          <vxe-table-column
                            field="orgFullDutyName"
                            title="所属单位"
                          >
                          </vxe-table-column>
                          <vxe-table-column
                            field="isMaster"
                            title="岗位性质"
                          >
                            <template v-slot="{ row }">{{row.isMaster==1? '主职' :'兼职' }}</template>
                          </vxe-table-column>
                        </vxe-table>
                      </n-gi>
                   </n-grid>
             

          </n-form>
        </n-layout-content>
      </n-layout>
    </n-layout>
   </n-spin>
   <template #action>
      <n-button size="small" @click="formVisible = false">取消</n-button>
      <n-button
        type="info"
        size="small"
        style="margin-right: 5px"
        @click="handleSave"
        >保存</n-button
      >
    </template>
  </n-modal>
</template>

<script>
import { NwIcon } from '@platform/main'
import { h, defineComponent, ref, reactive, getCurrentInstance, onMounted } from "vue";
import {
  NDrawer,
  NDrawerContent,
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NButton,
  NInputGroup,
  NInput,
  NSelect,
  NForm,
  NFormItem,
  NUpload,
  NImage,
  useMessage,
  NSpin,
  NRadio,
  NRadioGroup,
  NSpace,
  NDatePicker,
  NMenu,
  NGrid,
  NGi,
  NDivider,
  NLayoutSider,
  NModal,
} from "naive-ui";
import {
  default as NwTable,
  NwTableFun,
} from "../../components/nw-table/index.vue";
import { getPostByUserId } from '../post-manage/api' 
import { getDutyByUserId } from '../duty-manage/api'
import { editEmp, mdmCommDicts } from './api'
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
    NSelect,
    NwTableFun,
    NForm,
    NFormItem,
    NUpload,
    NwIcon,
    NImage,
    NSpin,
    NRadio,
    NRadioGroup,
    NSpace,
    NDatePicker,
    NMenu,
    NGrid,
    NGi,
    NDivider,
    NLayoutSider,
    
    NModal,
  },
  props: {
    model: {
      default: {},
      type: Object,
    },
  },
  setup(props) {
    const nwTable = ref(null);
    const formVisible = ref(false)
    const { proxy } = getCurrentInstance();
    const model = reactive({data:{}});
    const message = useMessage();
    const spinShow = ref(false);
    const basicInfoEdit = ref(false); // 判断基本信息编辑或取消
    const linkmanMessageEdit = ref(false);// 判断联系人信息编辑或取消
    const registeredEdit = ref(false);// 判断户口信息编辑或取消
   
    const basic = ref(null);
    const linkmanMessage = ref(null);
    const businessLicense = ref(null);
    const registered = ref(null);
    const dictionaries = reactive({
      AE:[], //民族
      AD:[], //国籍
    })
    const showOrgName = ref(true)
    const orgName = reactive('')
    const post = reactive({table:[]})
    const duty = reactive({table:[]})
    const cardTypes = reactive([
      { label: '居民身份证', value: 0 },
      { label: '港澳居民来往内地通信证', value: 1 },
      { label: '港澳居民居住证', value: 2 },
      { label: '台湾居民来往大陆通行证', value: 3 },
      { label: '台湾居民居住证', value: 4 },
      { label: '外国护照', value: 5 },
      { label: '外国人永久居留身份证', value: 6 },
      { label: '外国人居留证', value: 7 },
    ])
    const sexList = ref([
        { label: '男', value: 1},
        { label: '女', value: 2}
    ])
    const employmentTypes = ref([
        { label: '合同制(正式员工)', value: 0},
        { label: '派遣制', value: 1},
        { label: '外包制(外协员工)', value: 2},
        { label: '临时工', value: 3},
        { label: '实习生', value: 4}
    ])
    const whetherList = reactive([
        { label: '是', value: 1},
        { label: '否', value: 0}
    ])
    const marriageStatusL = reactive([
        { label: '无', value: 2},
        { label: '已婚', value: 1},
        { label: '未婚', value: 0}
    ])
    const religionList = reactive([
      { label: '无信仰', value: 0 },
      { label: '佛教', value: 1 },
      { label: '喇嘛教', value: 2 },
      { label: '道教', value: 3 },
      { label: '天主教', value: 4 },
      { label: '基督教', value: 5 },
      { label: '东正教', value: 6 },
      { label: '伊斯兰教', value: 7 },
      { label: '其他', value: 8 },
    ])
    const sonFn = (e) => {
      formVisible.value = true
      model.data = e 
      getPostByUserId({id:e.id}).then((res)=>{
            if(res){
              post.table = res
              
            }
      })
      getDutyByUserId({id:e.id}).then((res)=>{
            if(res){
              duty.table = res
              
            }
      })
    }
     const politicsList = reactive([
         { label: '中共党员', value: 0 },
         { label: '中共预备役党员', value: 1 },
         { label: '共青团员', value: 2 },
         { label: '民革会员', value: 3 },
         { label: '民盟盟员', value: 4 },
      ])
    const  healthConditionList = reactive([
         { label: '健康或良好', value: 0 },
         { label: '一般或较弱', value: 1 },
         { label: '有慢性病', value: 2 },
         { label: '残疾', value: 3 },
      ])
    const  birthNature = reactive([
         { label: '农业户口', value: 0 },
         { label: '农业户口-集体户', value: 1 },
         { label: '非农户口', value: 2 },
         { label: '非农户口集体户', value: 3 },
         { label: '未落常驻户口', value: 3 },
         { label: '其他户口', value: 3 },
      ])
    const  formatDate =(date) =>{
        var date = new Date(date);
        var YY = date.getFullYear() + '-';
        var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
        var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        return YY + MM + DD +" "+hh + mm + ss;//
      }
      const getTime=(e)=>{
        // var date = e ? new Date(e):null;
        return  e ? new Date(e).getTime() : null
      }
    
    const menuOptions = [
      { label: "基本信息", key: 1, value: "basic" },
      { label: "联系信息", key: 2, value: "linkmanMessage" },
      { label: "户口信息", key: 3, value: "registered" },
      { label: "岗位信息", key: 4, value: "businessLicense" },
    ];
    onMounted(async () => {
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
      formVisible, //模态框控制
      sonFn,
      politicsList,
      whetherList,
      marriageStatusL,
      healthConditionList,
      religionList,
      sexList,
      cardTypes,
      model,
      formatDate,
      getTime,
      message,
      spinShow,
      orgName,
      menuOptions,
      basic,
      linkmanMessage,
      birthNature,
      businessLicense,
      post,
      duty,
      basicInfoEdit,
      linkmanMessageEdit,
      registeredEdit,
      registered,
      employmentTypes,
      showOrgName,
      status: reactive([
        {
          label: "否",
          value: 0,
        },
        {
          label: "是",
          value: 1,
        },
      ]),
    };
  },
  created() {
    
  },
  methods: {
    handleSave() {
      this.spinShow = true
      
      editEmp(this.model.data).then((res) => {
        if (res === true) {
          this.message.success("操作成功");
          this.spinShow = false
          this.formVisible = false;
          this.$emit('update:callback');
        }
      }).catch(e=>{
        this.message.error(e);
        
      })
    },
 
    menuSelect(key, item) {
      let top = this[item.value].$el.offsetTop - 24;
      this.$refs.content.scrollTo({ top, behavior: "smooth" });
    },
  },
});
</script>