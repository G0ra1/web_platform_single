<template>
  <n-layout class="nw-layout-full">
    <n-layout-content>
      <div class="schedule-box">
        <!-- <div class="schedule-box-left">
          <h5 class="schedule-box-left-title">
            日程管理
          </h5>
          <div class="schedule-box-left-menu">
            <n-menu :collapsed-width="64" :collapsed-icon-size="22" :options="menuOptions" :on-update:value="menuChange"
              default-value="calendar-view" />
          </div>
        </div> -->
        <div class="schedule-box-right">
          <div class="schedule-box-right-header">
            <div class="schedule-box-right-header-left">
              <span
                @click="viewChange('m')"
                :class="{ active: viewActiveType == 'm' }"
                >月</span
              >
              <span class="red-split"></span>
              <!-- <span @click="viewChange('w')" :class="{ 'active': viewActiveType == 'w' }">周</span>
              <span class="red-split"></span> -->
              <span
                @click="viewChange('d')"
                :class="{ active: viewActiveType == 'd' }"
                >日</span
              >
            </div>
            <div
              class="schedule-box-right-header-mid"
              onselectstart="return false"
            >
              <span
                class="schedule-box-right-header-mid-lbtn"
                @click="lastMonth"
              >
                <nw-icon name="icon-xiangzuojiantou" /> </span
              >{{
                viewActiveType == "d"
                  ? format(activeValue, "yyyy年MM月dd日")
                  : format(date, "yyyy年MM月")
              }}<span
                class="schedule-box-right-header-mid-rbtn"
                @click="nextMonth"
              >
                <nw-icon name="icon-xiangyoujiantou" />
              </span>
            </div>
            <div class="schedule-box-right-header-right">
              <span @click="showCreateTodo" style="float: right">
                <n-button type="primary">新增日程</n-button>
                <!-- <nw-icon name="icon-n-y-thinadd" color="rgb(103, 194, 58)" :size="15" /> -->
              </span>
              <!-- <n-input style="width: 208px; margin-left: 16px" placeholder="根据名称搜索日历日程">
                <template #suffix>
                  <NwIcon name="icon-n-y-edit" :size="15" style="color: #828282; cursor: pointer" />
                </template>
              </n-input> -->
            </div>
          </div>
          <div class="schedule-box-right-content">
            <div class="left-calendar">
              <schedulePanel
                @dateChange="dateChange"
                @saveSuccess="saveSuccess"
                @activeDateChange="activeDateChange"
                boxHeight="440px"
                width="400px"
                :hideCreate="true"
                ref="schedulePanelRef"
              >
              </schedulePanel>
            </div>
            <calendarMonthView
              @dateChange="dateChange"
              @activeDateChange="activeDateChange"
              v-if="viewActiveType == 'm'"
              ref="monthView"
              :date="date"
              @editEvent="showCreateTodo"
              @saveCallback="saveSuccess"
              :todoListView="todoListView"
            >
            </calendarMonthView>
            <calendarWeekView
              v-if="viewActiveType == 'w'"
              ref="weekView"
              :date="date"
              :todoListView="todoListView"
            >
            </calendarWeekView>
            <calendarDayView
              v-if="viewActiveType == 'd'"
              ref="daykView"
              :activeValue="activeValue"
              @editEvent="showCreateTodo"
              :date="date"
            >
            </calendarDayView>
          </div>
        </div>
      </div>
    </n-layout-content>
  </n-layout>
  <todoCreate
    ref="todoCreateRef"
    :finish="todoFinish"
    @saveSuccess="saveSuccess"
  ></todoCreate>
  <memo ref="memoRef" @finishSuccess="finishSuccess"></memo>
</template>

<script lang="jsx">
import { ref, reactive, defineComponent, nextTick, h, onMounted } from "vue";
import {
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NButton,
  NSpace,
  NTag,
  NInput,
  NInputGroup,
  NDrawer,
  NDrawerContent,
  NMenu,
} from "naive-ui";
import { NwIcon, RequestPaging, VxeHelper } from "@platform/main";
import { todoCreate, memo, schedulePanel } from "@platform/smm";
import calendarMonthView from "../../components/calendarMonthView/index.vue";
import calendarWeekView from "../../components/calendarWeekView/index.vue";
import calendarDayView from "../../components/calendarDayView/index.vue";
import { format } from "date-fns";
import { todoListView, todofinish } from "../../api/index.js";

export default defineComponent({
  components: {
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NButton,
    NSpace,
    NwIcon,
    NTag,
    NInput,
    NInputGroup,
    NDrawer,
    NDrawerContent,
    calendarMonthView,
    calendarWeekView,
    calendarDayView,
    NMenu,
    todoCreate,
    memo,
    schedulePanel,
  },
  setup() {
    const _format = format;
    const date = ref(new Date());
    const monthView = ref(null);
    const weekView = ref(null);
    const daykView = ref(null);
    const memoRef = ref(null);
    const schedulePanelRef = ref(null);
    const menuOptions = ref([
      {
        label: "日历视图",
        key: "calendar-view",
      },
      // {
      //   label: '任务查看',
      //   key: 'task-view',
      // },
    ]);

    const todoCreateRef = ref(null);
    const showCreateTodo = (d = {}) => {
      if (d.id) {
        todoCreateRef.value.show(d);
      } else {
        todoCreateRef.value.show();
      }
    };
    const loadData = () => {
      if (monthView.value) monthView.value.setValue(date.value);
      if (weekView.value) weekView.value.setValue(date.value);
      if (daykView.value) daykView.value.setValue(activeValue.value);
    };
    const lastMonth = () => {
      let d_m = 24 * 60 * 60 * 1000;
      if (viewActiveType.value == "d") {
        activeValue.value = new Date(
          +new Date(_format(activeValue.value, "yyyy-MM-dd") + " 00:00:00") -
            d_m
        );
        date.value = new Date(
          activeValue.value.getFullYear(),
          activeValue.value.getMonth()
        );
        daykView.value.setValue(activeValue.value);
        schedulePanelRef.value.setActiveDate(activeValue.value);
      } else {
        date.value = new Date(
          date.value.getFullYear(),
          date.value.getMonth() - 1
        );
        loadData();
        dateChange(date.value);
      }
    };
    const nextMonth = () => {
      let d_m = 24 * 60 * 60 * 1000;
      if (viewActiveType.value == "d") {
        activeValue.value = new Date(
          +new Date(_format(activeValue.value, "yyyy-MM-dd") + " 00:00:00") +
            d_m
        );
        date.value = new Date(
          activeValue.value.getFullYear(),
          activeValue.value.getMonth()
        );
        daykView.value.setValue(activeValue.value);
        schedulePanelRef.value.setActiveDate(activeValue.value);
      } else {
        date.value = new Date(
          date.value.getFullYear(),
          date.value.getMonth() + 1
        );
        loadData();
        dateChange(date.value);
      }
    };
    const viewActiveType = ref("m");
    const menuChange = (key, item) => {
      console.log(key, item);
    };
    const viewChange = (type) => {
      viewActiveType.value = type;
    };
    const saveSuccess = () => {
      loadData();
      activeDateChange(activeValue.value);
      schedulePanelRef.value.getEvent(activeValue.value);
    };
    const todoFinish = (d) => {
      memoRef.value.show(d);
    };
    const finishSuccess = () => {
      todoCreateRef.value.cancelModal();
      loadData();
    };
    const dateChange = (_date) => {
      date.value = new Date(_date.getFullYear(), _date.getMonth());
      schedulePanelRef.value.setValue(date.value);
      loadData();
    };
    const activeValue = ref(new Date());
    const activeDateChange = (_date) => {
      activeValue.value = _date;
      schedulePanelRef.value.setActiveDate(_date);
      if (viewActiveType.value == "d") {
        //dd
        if (daykView.value) daykView.value.setValue(_date);
      } else {
        //mm
        monthView.value.setActiveDate(_date);
      }
      // schedulePanelRef.value.setActiveDate(_date)
    };
    return {
      lastMonth,
      nextMonth,
      date,
      format: _format,
      monthView,
      viewChange,
      viewActiveType,
      weekView,
      daykView,
      menuOptions,
      menuChange,
      todoCreateRef,
      showCreateTodo,
      todoListView,
      saveSuccess,
      loadData,
      todoFinish,
      finishSuccess,
      memoRef,
      dateChange,
      schedulePanelRef,
      activeDateChange,
      activeValue,
    };
  },
});
</script>

<style lang="less" scoped>
.schedule-box {
  height: 100%;
  background-color: #eee;
  display: flex;

  &-left {
    width: 220px;
    margin-right: 5px;
    background-color: #fcfcfc;

    &-title {
      font-size: 16px;
      height: 50px;
      text-align: center;
      border-bottom: 5px #eee solid;
      box-sizing: border-box;
      margin: 0;
      line-height: 50px;
    }

    &-menu {
      font-size: 14px;
      text-align: center;
      cursor: pointer;

      &-item:hover {
        padding: 0;
        background: var(--n-red1);
      }
    }
  }

  &-right {
    flex: 1;
    background-color: #fcfcfc;
    display: flex;
    flex-direction: column;

    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50px;
      border-bottom: 5px #eee solid;
      box-sizing: border-box;

      &-left {
        height: 50px;
        line-height: 50px;
        display: flex;
        align-items: center;
        width: 100px;
        padding-left: 15px;

        span {
          display: inline-block;
          margin-right: 15px;
          height: 30px;
          width: 35px;
          line-height: 30px;
          box-sizing: border-box;
          text-align: center;
          cursor: pointer;
          font-weight: 700;
        }

        span.red-split {
          display: inline-block;
          height: 20px;
          width: 0;
          border-right: solid 2px red;
        }

        span.active {
          border-bottom: 3px solid red;
        }

        span:last-child {
        }
      }

      &-mid {
        height: 50px;
        line-height: 50px;
        font-size: 18px;

        &-lbtn {
          margin-right: 50px;
          cursor: pointer;
          -webkit-user-seletct: none;
          -moz-user-seletct: none;
          padding: 5px;
        }

        &-lbtn:hover {
          background-color: #eee;
        }

        &-rbtn {
          margin-left: 50px;
          cursor: pointer;
          -webkit-user-seletct: none;
          -moz-user-seletct: none;
          padding: 5px;
        }

        &-rbtn:hover {
          background-color: #eee;
        }
      }

      &-right {
        height: 50px;
        line-height: 50px;
        width: 100px;
        margin-right: 30px;
      }
    }

    &-content {
      flex: 1;
      height: 0;
      display: flex;

      .left-calendar {
        width: 420px;
        box-sizing: border-box;
        padding: 0 12px;
      }
    }
  }
}
</style>
