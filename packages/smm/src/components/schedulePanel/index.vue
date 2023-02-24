<template>
  <div class="smallCalendar-box" :style="{ width }">
    <div class="schedule-header">
      <span class="smallCalendar-box-right-header-mid-lbtn" title="上个月" @click="lastMonth">
        <nw-icon name="icon-xiangzuojiantou" />
      </span>{{ format(newDate,
          "yyyy年MM月")
      }}<span class="smallCalendar-box-right-header-mid-rbtn" title="下个月" @click="nextMonth">
        <nw-icon name="icon-xiangzuojiantou" />
      </span>
    </div>
    <div class="schedule-table">
      <vxe-grid v-bind="gridOptions" :loading="tableLoading" :data="dateData" ref="gridComponent"
        class="mytable-scrollbar" v-on="gridEvent">
      </vxe-grid>
    </div>
    <div class="schedule-list">
      <span class="create-btn" v-show="!hideCreate" @click="() => showCreateTodo()">+新建日程</span>
      <div class="event-box" :style="{ 'height': boxHeight }">
        <div class="event-content">
          <h5 class="event-type">
            我负责的
          </h5>
          <div v-if="responsibleList.length != 0"
            :class="{ 'event-item': true, lv1: item.priority == 1, lv2: item.priority == 2, lv3: item.priority == 3, lv4: item.priority == 4, lv5: item.priority == 5 }"
            v-for="item in responsibleList">
            <span class="event-title">{{ item.taskName }}</span>
            <span class="event-time">{{ item.taskStartTime.substring(0, 16) }}~~{{ item.taskEndTime.substring(0, 16)
            }}</span>
            <span class="event-btn">
              <nw-icon name="icon-bianji1" @click="() => showCreateTodo(item)" color="#07C500" :size="20" />
              <nw-icon name="icon-lajitong" @click="() => deleteTodo(item)" color="rgba(0,0,0,0.64)" :size="20" />
              <nw-icon name="icon-tuichu2" @click="() => finishodo(item)" color="#F08301" :size="20" />
            </span>
          </div>
          <div v-else style="text-align: center;">
            <img src="./null.png" alt="" />
          </div>
        </div>
        <div class="event-content">
          <h5 class="event-type">
            我参与的
          </h5>
          <div v-if="participateList.length != 0"
            :class="{ 'event-item': true, lv1: item.priority == 1, lv2: item.priority == 2, lv3: item.priority == 3, lv4: item.priority == 4, lv5: item.priority == 5 }"
            v-for="item in participateList">
            <span class="event-title">{{ item.taskName }}</span>
            <span class="event-time">{{ item.taskStartTime.substring(0, 16) }}~~{{ item.taskEndTime.substring(0, 16)
            }}</span>
            <span class="event-btn">
              <nw-icon name="icon-bianji1" @click="() => showCreateTodo(item)" color="#07C500" :size="20" />
            </span>
          </div>
          <div v-else style="text-align: center;">
            <img src="./null.png" alt="" />
          </div>
        </div>
      </div>
    </div>
    <todoCreate ref="todoCreateRef" :type="type" :finish="finishodo" @saveSuccess="saveSuccess"></todoCreate>
    <memo ref="memoRef" @finishSuccess="finishSuccess"></memo>
  </div>
</template>

<script lang="jsx">
import { h, defineComponent, ref, reactive, onMounted, } from 'vue'
import { request } from '@platform/main'
import {
  NDrawer,
  NDrawerContent,
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NButton,
  NInputGroup,
  NInput,
  NForm,
  NFormItem,
  NSpace,
  useMessage,
  useDialog
} from 'naive-ui'
import { creatData, mapValues, memo, todoCreate } from '@platform/smm';
import { format } from "date-fns";
import { NwIcon } from '@platform/main'


import {
  tododel,
  todofinish
} from "../../api/index.js"
export default defineComponent({
  props: {
    boxHeight: {
      type: String,
      default: '370px'
    },
    width: {
      type: String,
      default: 'auto'
    },
    hideCreate: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ''
    }
  },
  components: {
    NSpace,
    NDrawer,
    NDrawerContent,
    NButton,
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NInputGroup,
    NInput,
    NForm,
    NFormItem,
    NwIcon,
    todoCreate,
    memo
  },
  setup(props, context) {
    // 所属系统
    const msg = useMessage()
    const dialog = useDialog()
    const _format = format
    const sysBizCode = ref('')
    // const handelClick = (row) => {
    //   const token = cookies.get("token");
    //   const tokenType = cookies.get("tokenType");
    //   window.open(`${row.sysPcBizUrl}&token=${tokenType} ${token}`)
    // }
    const gridComponent = ref(null)
    const newDate = ref(new Date())
    const activeDate = ref(+new Date())
    const setValue = (d) => {
      if (format(newDate.value, 'yyyy-MM') !== format(d, 'yyyy-MM')) {
        // activeDate.value = d
        newDate.value = d
        getEvent(d)
      }
    }
    const setActiveDate = (d) => {
      activeDate.value = d
      getDayView()
    }
    const eventList = ref([])
    const eventHandel = (d) => {
      context.emit("editEvent", d);
    }
    const dateChange = () => {
      context.emit("dateChange", newDate.value);
    }
    const isHaveEvent = (date) => {
      return eventList.value.filter((d) => {
        return date >= +new Date(d.taskStartTime.substring(0, 10) + ' 00:00:00') && date <= +new Date(d.taskEndTime.substring(0, 10) + ' 23:59:59')
      }).length > 0
    }
    const getEventDate = (date) => {
      return eventList.value.filter((d) => {
        return date >= +new Date(d.taskStartTime.substring(0, 10) + ' 00:00:00') && date <= +new Date(d.taskEndTime.substring(0, 10) + ' 23:59:59')
      }).splice(0, 3)
    }
    const columnRender = (row, week) => {
      let dom = <span class={['c_days', isThatMonth(row[week]) ? '' : 'c_days_hide', format(row[week], 'MM-dd') == format(+new Date(), 'MM-dd') ? 'c_days_this' : '', format(row[week], 'MM-dd') == format(activeDate.value, 'MM-dd') ? 'c_days_active' : '']}> {format(row[week], 'd')}</span>
      if (isHaveEvent(row[week])) {

        dom = <div class="event_box" >
          <span class={['c_days', isThatMonth(row[week]) ? '' : 'c_days_hide', format(row[week], 'MM-dd') == format(+new Date(), 'MM-dd') ? 'c_days_this' : '', format(row[week], 'MM-dd') == format(activeDate.value, 'MM-dd') ? 'c_days_active' : '']}>{format(row[week], 'd')}</span>
          <div class="label-box">
            {getEventDate(row[week]).map(d => {
              let style = {
                "background": `var(--lv${d.priority})`,
              }
              return <div onClick={() => eventHandel(d)} class="event-label" style={style}></div>
            })}
          </div>
        </div >

      }
      return dom
    }
    const createColumns = () => {
      return [
        {
          title: '日',
          key: 'sun',
          align: 'center',
          slots: {
            default: ({ row }) => columnRender(row, 'sun')
          }
        },
        {
          title: '一',
          key: 'mon',
          align: 'center',
          slots: {
            default: ({ row }) => columnRender(row, 'mon')
          }
        },
        {
          title: '二',
          key: 'tue',
          align: 'center',
          slots: {
            default: ({ row }) => columnRender(row, 'tue')
          }
        },
        {
          title: '三',
          key: 'wed',
          align: 'center',
          slots: {
            default: ({ row }) => columnRender(row, 'wed')
          }
        },
        {
          title: '四',
          key: 'thu',
          align: 'center',
          slots: {
            default: ({ row }) => columnRender(row, 'thu')
          }
        },
        {
          title: '五',
          key: 'fri',
          align: 'center',
          slots: {
            default: ({ row }) => columnRender(row, 'fri')
          }
        },
        {
          title: '六',
          key: 'sat',
          align: 'center',
          slots: {
            default: ({ row }) => columnRender(row, 'sat')
          }
        },
      ]
    }
    const dateData = ref([])
    const gridOptions = reactive({
      size: "small",
      stripe: false,
      border: 'none',
      height: "auto",
      align: null,
      columns: createColumns(),
      rowClassName: "",
      columnConfig: {
        resizable: false,
      },
      rowConfig: {
        keyField: 'id',
        isCurrent: false,
        isHover: false,
      },

    });
    // 事件注册
    const gridEvent = reactive({
      cellClick: ({ columnIndex, row }) => {
        activeDate.value = mapValues(row).sort()[columnIndex]
        context.emit("activeDateChange", activeDate.value);
        if (format(activeDate.value, 'MM') !== format(newDate.value, 'MM')) {
          newDate.value = new Date(activeDate.value)
          getEvent(new Date(activeDate.value))
          dateChange(new Date(activeDate.value))
        }
        getDayView()
      }
    });
    const handel = (item) => {
      window.open(item.contentUrl, 'newwindow');
    }
    const tableLoading = ref(false)
    const getEvent = (_date = newDate.value) => {
      tableLoading.value = true
      let d1 = creatData(_date)
      let minDate, maxDate;
      minDate = d1[0].sun;
      maxDate = d1[d1.length - 1].sat
      request({
        url: `center/todo/list/view?taskStartTime=${format(minDate, 'yyyy-MM-dd')}&taskEndTime=${format(maxDate, 'yyyy-MM-dd')}`,
        method: 'get',
      }).then(res => {
        eventList.value = res
        dateData.value = d1
        tableLoading.value = false
        gridComponent.value.loadData(dateData.value)
      })
    }
    const participateList = ref([])
    const responsibleList = ref([])
    const getDayView = () => {
      request({
        url: `center/todo/day/view?taskTime=${format(activeDate.value, 'yyyy-MM-dd')}`,
        method: 'get',
      }).then(res => {
        participateList.value = res.participateList
        responsibleList.value = res.responsibleList
      })

    }

    const lastMonth = () => {
      newDate.value = new Date(newDate.value.getFullYear(), newDate.value.getMonth() - 1)
      getEvent()
      dateChange(newDate.value)
    }
    const nextMonth = () => {
      newDate.value = new Date(newDate.value.getFullYear(), newDate.value.getMonth() + 1)
      getEvent()
      dateChange(newDate.value)
    }
    const isThatMonth = (date) => {
      return format(date, 'MM') == format(dateData.value[3].sun, 'MM')
    }
    const todoCreateRef = ref(null)
    const showCreateTodo = (d = {}) => {
      if (d.id) {
        todoCreateRef.value.show(d)
      } else {
        todoCreateRef.value.show()
      }
    }
    const deleteTodo = (item) => {
      handleConfirm(item)
    }
    const memoRef = ref(null)
    const finishodo = (item) => {
      memoRef.value.show(item)
    }
    const handleConfirm = (item) => {
      dialog.warning({
        title: '警告',
        content: `确定要删除日程<<${item.taskName}>>么？`,
        positiveText: '确定',
        negativeText: '取消',
        class: 'padding20',
        onPositiveClick: () => {
          tododel(item.id).then(res => {
            msg.success('删除成功')
            getDayView()
            context.emit('saveSuccess')
          })
        },
        onNegativeClick: () => {

        }
      })
    }
    const finishSuccess = () => {
      getDayView()
      context.emit('saveSuccess')
    }
    const saveSuccess = () => {
      getDayView()
      getEvent()
      context.emit('saveSuccess')
    }
    onMounted(() => {
      getEvent()
      getDayView()
    })

    return {
      sysBizCode,
      handel,
      gridEvent,
      gridOptions,
      dateData,
      gridComponent,
      getEvent,
      tableLoading,
      newDate,
      lastMonth,
      nextMonth,
      format: _format,
      activeDate,
      isThatMonth,
      getDayView,
      participateList,
      responsibleList,
      todoCreateRef,
      showCreateTodo,
      deleteTodo,
      handleConfirm,
      finishodo,
      memoRef,
      finishSuccess,
      saveSuccess,
      dateChange,
      setValue,
      setActiveDate
    }
  }
})
</script>
<!-- <style lang='scss'>
$vxe-table-row-height-mini: 16px !default;
</style> -->
<style lang='less'>
.n-dialog.n-modal.padding20 {
  padding: 20px;
}

.smallCalendar-box {
  --n-red1: #8E292C;
  --n-red2: #AC2F33;
  --n-red3: #CD4246;
  --n-red4: #E76A6E;
  --n-red5: #FA999C;
  --n-red6: #C91019;
  display: flex;
  flex-direction: column;

  .schedule-header {
    font-size: 16px;
    font-family: PingFangSC-Medium;
    line-height: 22px;
    color: rgba(0, 0, 0, 0.64);
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    margin-top: 20px;

    .smallCalendar-box-right-header-mid-lbtn,
    .smallCalendar-box-right-header-mid-rbtn {
      cursor: pointer;
      width: 25px;
      height: 25px;
      line-height: 25px;
      transition: all 0.3s;
      text-align: center;
    }

    .smallCalendar-box-right-header-mid-rbtn {
      transform: rotate(180deg);
    }

    .smallCalendar-box-right-header-mid-lbtn:hover,
    .smallCalendar-box-right-header-mid-rbtn:hover {
      background: #eee;
    }

  }

  .schedule-table {
    width: 100%;
    height: 365px;


    .event_box {
      position: relative;

      .label-box {
        position: absolute;
        display: flex;
        justify-content: space-evenly;
        flex-direction: row;
        width: 100%;

        .event-label {
          width: 6px;
          height: 6px;
          border-radius: 3px;
        }
      }
    }




    .c_days {
      height: 28px;
      width: 28px;
      border-radius: 50%;
      display: inline-block;
      line-height: 28px;
      text-align: center;
      transition: all 0.3s;
    }

    .c_days:hover {
      background-color: #eee;
    }

    .c_days.c_days_active {
      background-color: var(--n-red5);
    }

    .c_days.c_days_this {
      border: 1px solid var(--n-red5)
    }

    .c_days_hide {
      color: #ccc
    }



  }

  .schedule-list {
    .event-box {
      height: 370px;
      overflow: auto;


    }
  }


  .create-btn {
    width: 100%;
    text-align: right;
    display: inline-block;
    font-size: 16px;
    font-weight: normal;
    line-height: 0px;
    color: var(--n-red6);
    cursor: pointer;
  }

  .event-content {
    .event-type {
      font-size: 16px;
      height: 30px;
      line-height: 30px;
      margin: 0;
      margin-top: 12px;
      font-size: 14px;
      font-weight: 400;
      height: 36px;
      background: rgba(247, 247, 247, 1);
      line-height: 36px;
      padding-left: 16px;
      border-radius: 4px;
      margin-bottom: 12px;
    }

    .event-item.lv1 {
      border-left: 3px solid var(--lv1);
    }

    .event-item.lv2 {
      border-left: 3px solid var(--lv2);
    }

    .event-item.lv3 {
      border-left: 3px solid var(--lv3);
    }

    .event-item.lv4 {
      border-left: 3px solid var(--lv4);
    }

    .event-item.lv5 {
      border-left: 3px solid var(--lv5);
    }

    .event-item {
      height: 120px;
      border-left: 3px solid var(--lv3);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 20px 12px;
      box-sizing: border-box;
      margin-bottom: 15px;
      position: relative;
      background-color: #f8f8f8;

      .event-title {
        font-size: 16px;
        font-family: Alibaba PuHuiTi 2.0;
        font-weight: normal;
        line-height: 30px;
        color: rgba(0, 0, 0, 0.94);
      }

      .event-time {
        font-size: 12px;
        font-family: Alibaba PuHuiTi 2.0;
        font-weight: normal;
        line-height: 30px;
        color: rgba(0, 0, 0, 0.64);
      }

      .event-btn {
        position: absolute;
        right: 24px;
        bottom: 20px;
        width: 100px;
        display: flex;
        justify-content: space-around;

        .icon {
          cursor: pointer;
        }

        .icon:hover {
          box-shadow: 5px 5px 15px 0px #ccc;
        }
      }
    }
  }
}

.vxe-body--column {
  cursor: pointer;
}
</style>