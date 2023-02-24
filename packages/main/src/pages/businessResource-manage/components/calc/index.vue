<template>
  <div class="calc-body">
    <div class="calc-body-view">
      <express-view />
    </div>
    <div class="calc-body-btn">

      <n-config-provider :theme-overrides="btnTheme">
        <n-grid :cols="5" x-gap="5" y-gap="5">
          <!-- 第一行 -->
          <n-gi>
            <n-button type="warning" size="small" @click="handleBack">
              <nw-icon name="icon-n-n-tuige" :size="14" style="font-weight: bold" />
            </n-button>
          </n-gi>
          <n-gi>
            <n-button type="warning" size="small">
              C
            </n-button>
          </n-gi>

          <n-gi>
            <n-button type="info" size="small" @click="handleInput('And')">
              And
            </n-button>
          </n-gi>
          <n-gi>
            <n-button type="info" size="small" @click="handleInput('Or')">
              Or
            </n-button>
          </n-gi>
          <n-gi>
            <n-button type="info" size="small" @click="handleInput('In')">
              In
            </n-button>
          </n-gi>
          <n-gi>
            <n-button type="info" size="small" @click="handleInput('Not in')">
              Not in
            </n-button>
          </n-gi>


          <!-- 第二行 -->



          <!-- 第三行 -->
          <n-gi>
            <n-button class="btn-font-16" type="info" size="small" @click="handleInput('!')">
              !
            </n-button>
          </n-gi>
          <n-gi>
            <n-button class="btn-font-16" type="info" size="small" @click="handleInput('!=')">
              !=
            </n-button>
          </n-gi>
          <n-gi>
            <n-button class="btn-font-16" type="info" size="small" @click="handleInput('<')">
              &lt;
            </n-button>
          </n-gi>
          <n-gi>
            <n-button class="btn-font-16" type="info" size="small" @click="handleInput('<=')">
              &lt;=
            </n-button>
          </n-gi>
          <n-gi>
            <n-button class="btn-font-16" type="info" size="small" @click="handleInput('>')">
              &gt;
            </n-button>
          </n-gi>
          <n-gi>
            <n-button class="btn-font-16" type="info" size="small" @click="handleInput('>=')">
              &gt;=
            </n-button>
          </n-gi>


          <n-gi>
            <n-button type="success" size="small" @click="handleInput('( )')">
              ( )
            </n-button>
          </n-gi>

          <!-- 第四行 -->
          <n-gi>
            <n-button class="btn-font-16" type="info" size="small" @click="handleInput('+')">
              +
            </n-button>
          </n-gi>
          <n-gi>
            <n-button class="btn-font-16" type="info" size="small" @click="handleInput('-')">
              -
            </n-button>
          </n-gi>
          <n-gi>
            <n-button class="btn-font-16" type="info" size="small" @click="handleInput('x')">
              &times;
            </n-button>
          </n-gi>
          <n-gi>
            <n-button class="btn-font-16" type="info" size="small" @click="handleInput('/')">
              &divide;
            </n-button>
          </n-gi>
          <n-gi>
            <n-button class="btn-font-16" type="info" size="small" @click="handleInput('=')">
              =
            </n-button>
          </n-gi>
          <n-gi>
            <n-button type="info" size="small" @click="handleInput('String')">
              String
            </n-button>
          </n-gi>
          <n-gi>
            <n-button type="info" size="small" @click="handleInput('Number')">
              Number
            </n-button>
          </n-gi>
          <n-gi>
            <n-button type="info" size="small" @click="handleInput('@appUserId')">
              登陆人
            </n-button>
          </n-gi>
          <n-gi>
            <n-button type="info" size="small" @click="handleInput('@appUserDeptId')">
              登陆人部门
            </n-button>
          </n-gi>
          <n-gi>
            <n-button type="info" size="small" @click="handleInput('@appUserOrgId')">
              登陆人机构
            </n-button>
          </n-gi>
          <!-- <n-gi>
              <n-button type="info" size="small" @click="handleInput('Array')">
                Array
              </n-button>
            </n-gi> -->
          <n-gi>
            <n-button type="info" v-if="paramList.length == 0" color="#8a2be2" size="small"
              @click="handleInput('Field')">
              字段
            </n-button>
            <PickField rowKey="fieldName" ref="refPickField" v-if="paramList.length > 0" :data="paramList"
              :buttonOptions="{ color: '#8a2be2' }" button-label="字段" modal-title="选择字段" :width="1000" isSingle
              :height="600"
              @update:value="(d: any) => { handleInput('Field', { code: toLine(d.fieldName), text: d.description }) }">
            </PickField>
          </n-gi>
          <n-gi>
            <!-- <n-button type="info" color="#8a2be2" size="small" @click="handleInput('Array')">
              人员
            </n-button> -->
            <NwEmployeePick buttonLabel="人员" ref="refNwEmployeePick" :buttonOptions="{ color: '#8a2be2' }"
              :showSide="true" :multiple="true" :isShowSearch="true" @updateVAndT="
  (v: string, t: string) => {
    handleInput('User', { code: v, text: t })
  }"></NwEmployeePick>
          </n-gi>
          <n-gi>
            <!-- <n-button type="info" color="#8a2be2" size="small" @click="handleInput('Array')">
              组织机构
            </n-button> -->
            <chooseDept2 ref="refchooseDept2" selectOrgType="1,2" :buttonOptions="{
  type: 'info', color: '#8a2be2', size: 'small'
}" buttonLabel="组织结构" @update:callback="(e: any) => {
  handleInput('Org', { code: e.map((d: any) => d.id).join(','), text: e.map((d: any) => d.orgName).join(',') })
}
">
            </chooseDept2>
          </n-gi>
          <n-gi>
            <DictPick ref="refDictPick" buttonLabel="普通字典" :buttonOptions="{ color: '#8a2be2' }" :showSide="true"
              :multiple="true" :isShowSearch="true" @updateVAndT="
  (v: string, t: string) => {
    handleInput('Dict', { code: v, text: t })
  }"></DictPick>
          </n-gi>
          <n-gi>
            <DictTreePick ref="refDictTreePick" selectOrgType="1,2" :buttonOptions="{
  type: 'info', color: '#8a2be2', size: 'small'
}" buttonLabel="树形字典" @update:callback="(e: any) => {
  handleInput('TreeDict', { code: e.map((d: any) => d.dictItemCode).join(','), text: e.map((d: any) => d.dictItemName).join(',') },)
}
">
            </DictTreePick>
          </n-gi>
        </n-grid>
      </n-config-provider>
    </div>
  </div>
</template>
<script lang="tsx">
import { ref, reactive, nextTick, h, watch } from 'vue'
import {
  NConfigProvider,
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NLayoutFooter,
  NGrid,
  NGi,
  NInputGroup,
  NInput,
  NButton,
  NSpin,
  NModal,
  NAlert
} from 'naive-ui'
import { cloneDeep } from 'lodash'
import { NwIcon, NwEmployeePick, chooseDept2, DictPick, DictTreePick, } from '@platform/main'

import {
  editingExp,
  Exp,
  calcInst,
  refPickField,
  refNwEmployeePick,
  refchooseDept2,
  refDictPick,
  refDictTreePick
} from './store'
import { paramList } from '../../store'
import ExpressView from './express-view.vue'
import PickField from './PickField.vue'



export default {
  components: {
    NConfigProvider,
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NLayoutFooter,
    NGrid,
    NGi,
    NInputGroup,
    NInput,
    NSpin,
    NModal,
    NButton,
    NwIcon,
    ExpressView,
    NAlert,
    PickField,
    NwEmployeePick,
    chooseDept2,
    DictPick,
    DictTreePick

  },
  props: ['value'],
  emits: ['update:value'],
  setup(props: any, context: any) {
    nextTick().then(() => {
      console.log(paramList.value)
    })
    const {
      ExpData
    } = calcInst
    watch(() => ExpData.value, (d: Array<Exp>) => {
      console.log(d, 'calcInst.ExpData.valuecalcInst.ExpData.value')
      context.emit('update:value', d)
    })
    watch(() => props.value, (d: Array<Exp>) => {
      calcInst.setExp(d)
    })
    const getExpData = () => {
      return ExpData.value
    }
    const toLine = (name: string) => {
      return name.replace(/([A-Z])/g, "_$1").toLowerCase();
    }
    return {
      editingExp,
      paramList,
      ExpData,
      getExpData,
      toLine,
      refPickField,
      refNwEmployeePick,
      refchooseDept2,
      refDictPick,
      refDictTreePick,
      btnTheme: {
        Button: {
          heightSmall: '28px',
          fontSizeSmall: '12px',
          iconSizeSmall: '14px',
          iconMarginSmall: '2px'
          // 蓝色按钮
          // colorInfo: '#0E639C',
          // borderInfo: '#0E639C',
          // // 灰色默认
          // textColor: '#b9b9b9',
          // textColorText: '#b9b9b9',
          // border: '#0000000',
          // borderHover: '1px solid #0000000',
          // textColorHover: '#ccc',
        }
      },
      handleClear() {
        // 清空

      },
      handleBack() {
        calcInst.removeExp()
      },
      // 点击按钮输入
      handleInput(key: string, data?: any) {
        console.log(data, 'handleInput')
        if (key === "( )") {
          calcInst.pushExp({ key: '(' })
          calcInst.pushExp({ key: ')' })
        } else {
          calcInst.pushExp({ key, ...data })
        }
      },
    }
  }
}
</script>

<style lang='less' scoped>
.calc-body {
  position: relative;

  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

  &-view {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    height: 200px;
    overflow: auto;
    border: 1px solid #ccc;
    padding: 5px;
    box-sizing: border-box;
  }

  &-btn {
    padding: 5px 5px 5px 5px;

    // height: 135px;
    :deep(.n-grid) {
      .n-button {
        width: 100%;

        .n-button__content {
          font-weight: bold;
        }
      }
    }


    .btn-font-16 {
      font-size: 14px
    }
  }

  &-express {
    flex: 1;
    padding: 0 5px 5px 5px;
  }
}
</style>