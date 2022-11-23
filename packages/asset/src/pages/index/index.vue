<template>
  <n-layout class="nw-layout-full">
    <n-grid
      x-gap="16"
      :cols="4"
      item-responsive
      class="index-content"
      style="display: flex"
    >
      <n-gi style="flex: 1">
        <n-grid x-gap="16" y-gap="16" :cols="4" item-responsive class="">
          <n-gi span="2">
            <div class="top manhour">
              <div class="t-inner">
                <img class="logo" src="/assets/image/manHour@2x.png" alt="" />
                <div class="i-right">
                  <p class="b-num">{{ workhourTodo }}</p>
                  <p>
                    <!-- <span class="s-num">23</span> -->
                    <span class="s-title">工时审核</span>
                  </p>
                </div>
              </div>
            </div>
          </n-gi>
          <n-gi span="2">
            <div class="top log">
              <div class="t-inner">
                <img class="logo" src="/assets/image/log@2x.png" alt="" />
                <div class="i-right">
                  <p class="b-num log-bnum">{{ workHourLogTodo }}</p>
                  <p>
                    <!-- <span class="s-num log-snum">23</span> -->
                    <span class="s-title">日志审核</span>
                  </p>
                </div>
              </div>
            </div>
          </n-gi>
          <n-gi span="4">
            <div style="height: 365px; background: #fff; padding: 0 24px">
              <h5 class="plate-title">我的日程</h5>
              <div
                style="
                  height: 300px;
                  background: #fff;
                  padding: 5px;
                  box-sizing: border-box;
                  display: flex;
                "
              >
                <n-calendar
                  style="width: 500px; height: 290px"
                  v-model:value="calendarValue"
                  #="{ year, month, date }"
                  @update:value="handleUpdateValue"
                >
                  <div
                    v-if="
                      workhourLog[
                        year +
                          '-' +
                          (month < 10 ? '0' + month : month) +
                          '-' +
                          (date < 10 ? '0' + date : date)
                      ]
                    "
                    class="green-circle"
                  ></div>
                </n-calendar>
                <div class="log-box mytable-scrollbar">
                  <h1>
                    {{ logTitle }}
                  </h1>
                  <div
                    class="log-content mytable-scrollbar"
                    v-html="logContent"
                  ></div>
                </div>
              </div>
            </div>
          </n-gi>
        </n-grid>
      </n-gi>
      <n-gi>
        <n-spin :show="msgSpinShow">
          <div class="my-message">
            <h5 class="plate-title">我的消息</h5>
            <n-list>
              <n-list-item v-for="i in msgList" :key="i">
                <img src="/assets/image/bell.png" alt="" />
                <p>
                  <span class="title">{{ i.msgTitle }}</span
                  ><br />
                  <span class="time">{{ i.sendTime }}</span>
                </p>
                <n-button text color="#1D7CED" @click="() => gotoMsg(i)"
                  >去处理
                </n-button>
              </n-list-item>
            </n-list>
            <div class="controller">
              <img @click="msgPrevious" src="/assets/image/left.png" alt="" />
              <img @click="msgNext" src="/assets/image/right.png" alt="" />
            </div>
          </div>
        </n-spin>
      </n-gi>
    </n-grid>
    <div class="bar-box">
      <h5 class="plate-title">我的工时统计</h5>
      <n-form
        inline
        label-align="left"
        label-placement="left"
        :show-feedback="false"
        class="bar-form"
      >
        <n-form-item label="工时日期" path="barDateTime">
          <n-date-picker
            style="width: 100%"
            placeholder="请选择工时日期"
            v-model:value="barDateTime"
            value-format="yyyy-MM"
            format="yyyy-MM"
            type="month"
            clearable
          />
        </n-form-item>
      </n-form>
      <div style="height: 250px" id="main"></div>
    </div>
  </n-layout>
</template>

<script lang="jsx">
import { defineComponent, ref, reactive, onMounted, h,watch } from 'vue'
import {
  NDrawer,
  NDrawerContent,
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NThemeEditor,
  NButton,
  NInputGroup,
  NInput,
  NForm,
  NFormItem,
  NTree,
  NSpace,
  useMessage,
  NPopconfirm,
  NSpin,
  NGrid,
  NGi,
  NDatePicker,
  NCalendar,
  NList,
  NListItem
} from 'naive-ui'
import {
  getDate,
  formatDate
} from "./store.js";
import {
  default as NwTable,
  NwTableFun,
} from "../../components/nw-table/index.vue";


import { NwIcon } from '@platform/main'

import { myWorkhour,myWorkhourlog,workHourLogById,queryTodokNumByCondition,msgPage,editRead } from './api/index.js'
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  GridComponent,
  DataZoomComponent,
  TooltipComponent
} from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { addDays, format  } from "date-fns";
import { forEach } from 'lodash';
echarts.use([
  TitleComponent,
  GridComponent,
  DataZoomComponent,
  BarChart,
  CanvasRenderer,
  TooltipComponent
]);
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
    NwTableFun,
    NForm,
    NLayoutSider,
    NFormItem,
    NInput,
    NTree,
    NSpace,
    NPopconfirm,
    NSpin,
    NwIcon,
    NGrid,
    NGi,
    NDatePicker,
    NCalendar,
    NList,
    NListItem
  },
  setup() {
    const message = useMessage()
    const dataAxis = ref([])
    const dataSeries = ref([])
    const queryData = ref({})
    const option = ref({
    })
    const handleUpdateValue = (_, { year, month, date })=> {
      // message.success(`${year}-${month}-${date}`);
      let logId = workhourLog.value[`${year}-${month<10?'0'+month:month}-${date<10?'0'+date:date}`]
      getWorkHourLogById(logId)

    }
    const barDateTime = ref(+new Date())
    const setOption = ()=>{
      option.value = {
        title: {
        text: '',
      },
      tooltip: {
        trigger: 'axis'
      },
      grid:{
        left:20,
        top:20,
        bottom:20,
        right:20
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      xAxis: {
        data: dataAxis.value,
        axisLabel: {
          inside: false,
          color: "#010101"
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        z: 10
      },
      yAxis: {
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: '#999'
        }
      },
      dataZoom: [
        {
          type: 'inside'
        }
      ],
      series: [
        {
          type: 'bar',
          showBackground: true,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#83bff6' },
              { offset: 0.5, color: '#188df0' },
              { offset: 1, color: '#188df0' }
            ])
          },
          emphasis: {
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#2378f7' },
                { offset: 0.7, color: '#2378f7' },
                { offset: 1, color: '#83bff6' }
              ])
            }
          },
          data: dataSeries.value,
        }
      ]
      }
    }
    const loadCharts = ()=>{
      let myChart = echarts.init(document.getElementById('main'));
      console.log('111111')
      const zoomSize = 6;
      // myChart.on('click', function (params) {
      //   myChart.dispatchAction({
      //     type: 'dataZoom',
      //     startValue: Math.max(params.dataIndex - zoomSize / 2, 0),
      //     endValue:
      //       Math.min(params.dataIndex + zoomSize / 2, dataSeries.value.length - 1)
      //   });
      // });
      // 绘制图表
      myChart.setOption(option.value);
    }
    const loadData = async (dateTime="2022-04")=>{
      await myWorkhour({dateTime}).then(res=>{
        console.log(res,'dateTimedateTimedateTimedateTime')
        queryData.value = res
      })
    }
    const initDataAxis = (yy=new Date().getFullYear(),_mm=new Date().getMonth()+1)=>{
      let mm =parseInt(_mm)<10?'0'+parseInt(_mm):_mm+''
      let days = getDate(yy,mm)
      dataAxis.value = []
      dataSeries.value = []
      
      for (let day = 1; day <= days; day++) {
        let _day = day<10?'0'+day:day+''
        let dateTime = yy+'-'+mm+'-'+_day
        dataAxis.value.push(mm+'-'+_day)
        dataSeries.value.push(queryData.value[dateTime]||0)
      }
    }
    const workhourLog = ref({})
    const getMyWorkhourlog = (dateTime="2022-04")=>{
      myWorkhourlog({dateTime}).then(res=>{
        console.log(res,"resresres")
        workhourLog.value = res
        const now = new Date();
        const nowStr = format(now, 'yyyy-MM-dd');
        if(workhourLog.value[nowStr]&&workhourLog.value[nowStr].length>0){
          getWorkHourLogById(workhourLog.value[nowStr][0])
        }
        
      })
    }
    const logTitle = ref('今天没有日志记录')
    const logContent = ref("")
    const getWorkHourLogById = (id)=>{
      if(!id){
        logTitle.value = '今天没有日志记录'
        logContent.value = "<span></span>"
        return

      }
      workHourLogById(id).then(res=>{
        console.log(res,'resresres')
        logTitle.value = res.title
        logContent.value = res.content
      })
    }
    const workHourLogTodo = ref(0)
    const workhourTodo = ref(0)

    const daiban = ()=>{
      queryTodokNumByCondition('workHourLog').then(res=>{
        workHourLogTodo.value = res
      })
      queryTodokNumByCondition('workhour').then(res=>{
         workhourTodo.value = res
      })
    }
    const msgList = ref([])
    const msgCurrent = ref(1)
    const maxPage = ref(0)
    const msgSpinShow = ref(false)
    const msgPrevious = ()=>{
      if(msgCurrent.value<2){
        message.info('已经是第一页了')
        return
      }
      msgCurrent.value--
      getMsg()
    }
    const msgNext = ()=>{
      if(msgCurrent.value==maxPage.value){
        message.info('已经是最后一页了')
        return
      }
      msgCurrent.value++
      getMsg()
    }
    const getMsg = () =>{
      msgSpinShow.value = true
      msgPage({"page":{"current":msgCurrent.value,"size":7},"isRead":"0"}).then(res=>{
        console.log(res.records,'resresresresresres')
        maxPage.value = res.pages
        msgList.value = res.records
        msgSpinShow.value = false
      }).finally(()=>{
        msgSpinShow.value = false
      })
    }
    const gotoMsg = (msg)=>{
      editRead(msg.id).then(res=>{
        getMsg()
      })
      if(msg.msgPcUrl){
        window.open(
          msg.msgPcUrl,
          '_blank',
          'top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no'
        )
      }
      
    }
    watch(()=>barDateTime.value,async (nValue)=>{
      let dateTime = formatDate(nValue).slice(0,7)
      await loadData(dateTime)
      await initDataAxis(dateTime.split('-')[0],dateTime.split('-')[1])
      await setOption()
      await loadCharts()
    })
    onMounted(async () => {
      getMyWorkhourlog()
      await loadData()
      await initDataAxis()
      await setOption()
      await loadCharts()
      let benyueElements = document.getElementsByClassName('n-button__content')
      for (let index = 0; index < benyueElements.length; index++) {
        const element = benyueElements[index];
        if(element.innerHTML == "今天")  benyueElements[index].innerHTML = "本月"
      }
      daiban()
      getMsg()
    })
    return {
      loadCharts,
      option,
      dataAxis,
      dataSeries,
      loadData,
      initDataAxis,
      getDate,
      barDateTime,
      formatDate,
      calendarValue: ref(addDays(Date.now(), 1).valueOf()),
      handleUpdateValue,
      getMyWorkhourlog,
      workhourLog,
      getWorkHourLogById,
      logTitle,
      logContent,
      daiban,
      workHourLogTodo,
      workhourTodo,
      getMsg,
      msgList,
      msgPrevious,
      msgNext,
      msgCurrent,
      maxPage,
      msgSpinShow,
      gotoMsg
    }
  }
})
</script>
<style lang='less'>
.index-content {
  margin: 24px 0px 16px;
  padding: 0px 10px;
  box-sizing: border-box;
  .top {
    height: 140px;
    box-sizing: border-box;
    background: #fff;
    padding: 14px 16px;
    .t-inner {
      background: #f2f6fb;
      height: 112px;
      box-sizing: border-box;
      padding: 10px 24px;
      img.logo {
        height: 92px;
      }
      .i-right {
        float: right;
        .b-num {
          margin: 0;
          line-height: 55px;
          font-size: 40px;
          font-weight: bold;
          font-family: Yu Gothic;
          color: #6d97f8;
        }
        .s-num {
          font-size: 24px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          line-height: 0px;
          color: #f73332;
          opacity: 1;
          margin-right: 15px;
        }
        .s-title {
          font-size: 20px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          line-height: 0px;
          color: #999999;
          opacity: 1;
        }
        .log-bnum {
          color: #50c9e0;
        }
        .log-snum {
          color: #3dc876;
        }
      }
    }
  }
}
.bar-box {
  position: relative;
  background: #fff;
  padding: 10px 24px;
  margin: 16px 10px 16px;
  box-sizing: border-box;
  .bar-form {
    position: absolute;
    width: 350px;
    z-index: 999;
    top: 10px;
    right: 0;
  }
}
.n-calendar .n-calendar-header .n-calendar-header__title {
  font-size: 15px;
}
.n-calendar .n-calendar-cell {
  padding: 5px;
}
.n-calendar .n-calendar-header {
  padding-bottom: 25px;
}
.n-calendar .n-calendar-cell .n-calendar-date .n-calendar-date__day {
  position: absolute;
  top: -25px;
  left: 15px;
}
.green-circle {
  height: 4px;
  width: 4px;
  border-radius: 50%;
  background: #1d7ced;
}
.plate-title {
  padding: 10px 0 10px;
  font-size: 18px;
  border-bottom: 1px solid #ddd;
  margin: 0;
}
.my-message {
  height: 521px;
  padding: 0 24px;
  background: #fff;
  position: relative;
  .n-list {
    margin: 0;
    .n-list-item {
      .n-list-item__main {
        display: flex;
        p {
          margin: 0;
          font-size: 14px;
          line-height: 16px;
          margin-left: 16px;
          width: 180px;
          .title {
            color: #010101;
          }
          .time {
            font-size: 10px;
            color: #aaa;
          }
        }
        img {
          height: 32px;
        }
        .n-button {
          margin-left: 55px;
        }
      }
    }
    .n-list-item:last-child {
      .n-list-item__main {
        // opacity: 0.5;
      }
    }
  }
  .controller {
    display: flex;
    justify-content: center;
    padding-top: 10px;
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 15px;
    img {
      width: 32px;
      cursor: pointer;
      margin-left: 10px;
    }
  }
}
.log-box {
  width: 710px;
  padding: 10px;
  h1 {
    color: #010101;
    font-size: 16px;
  }
  .log-content {
    p {
      margin: 0;
    }
    width: 710px;
    padding: 10px;
    box-sizing: border-box;
    overflow: auto;
    height: 224px;
    background: #f2f6fb;
  }
}
</style>