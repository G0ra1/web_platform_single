<template>
    <div id="cnadarMonthView">
        <vxe-grid v-bind="gridOptions" :loading="loading" :data="data" ref="gridComponent" class="mytable-scrollbar"
            v-on="gridEvent">
        </vxe-grid>
        <div class="event-row">
            <div class="event" v-if="showEvent" v-for="item in eventDom" :style="eventItemStyle(item)"
                @click="()=>eventHandel(item)">
                {{item.taskName}}</div>
        </div>
    </div>
</template>
<script lang="jsx">
import { ref, reactive, defineComponent, nextTick, h, onMounted, watch } from 'vue'
import { NTag, NButton, useMessage, NDataTable } from "naive-ui";
import {
    _format,
    gridComponent,
    loading,
    data,
    gridOptions,
    gridEvent,
    message,
    getEvent,
    sContext,
    eventList,
    eventHandel,
    setActiveDate
} from './store.jsx'
export default defineComponent({
    components: {
        NTag, NButton, NDataTable
    },
    props: ['todoListView'],
    setup(props, context) {
        const eventItemStyle = (item) => {
            let color = ['#C91019', '#F08301', '#FFDE44', '#7AB1FF', '#7AFF8B']
            let dom = document.getElementById('cnadarMonthView')
            let maxWidth = dom.offsetWidth
            let maxHeight = dom.offsetHeight
            let spanWidth = maxWidth / 7
            let cellHeight = (maxHeight - 50) / data.value.length
            let height = '20px'
            let width = (item.colSpan * spanWidth) - 8 + 'px'
            let left = (item.cloIndex * spanWidth) + 2 + 'px'
            let top = (item.cell * cellHeight + 21 * (item.lv - 1) + 35) + 'px'
            return {
                backgroundColor: color[item.priority * 1 - 1],
                height,
                width,
                left,
                top,
            }
        }
        const showEvent = ref(true)
        message.value = useMessage()
        sContext.value = context
        const setValue = (date = new Date()) => {
            loading.value = true
            getEvent(date)
        }
        const eventDom = ref([])
        const day_ms = 24 * 60 * 60 * 1000
        watch(() => eventList.value, (d) => {
            eventDom.value = []
            data.value.forEach((weekList, i) => {
                let cloLv = [];
                d.forEach(eventItem => {
                    let m = {}
                    if (+new Date(eventItem.taskEndTime) < weekList.sun || +new Date(eventItem.taskStartTime) > weekList.sat) {
                    } else {
                        if (+new Date(eventItem.taskStartTime) - weekList.sun <= 0 && +new Date(eventItem.taskEndTime) > weekList.sun) {
                            m.cloIndex = 0
                        } else {
                            m.cloIndex = Math.floor((+new Date(eventItem.taskStartTime) - weekList.sun) / day_ms)
                        }
                        if (+new Date(eventItem.taskEndTime) >= weekList.sat) {
                            m.colSpan = 7 - m.cloIndex
                        } else {
                            m.colSpan = _format(new Date(eventItem.taskEndTime), 'MMdd') * 1 - Math.max(_format(new Date(eventItem.taskStartTime), 'MMdd') * 1, _format(new Date(weekList.sun), 'MMdd') * 1) + 1
                        }
                        m.cell = i;
                        if (cloLv.length == 0) {
                            m.lv = 0
                            cloLv[0] = [[m.cloIndex, m.colSpan]]
                        }
                        cloLv.forEach((d, index) => {
                            if (d) {
                                let allowInsertion = d.every(d1 => {
                                    return m.cloIndex + m.colSpan <= d1[0] || m.cloIndex >= d1[0] + d1[1]
                                })
                                if (allowInsertion) {
                                    m.lv = index
                                    cloLv[index].push([m.cloIndex, m.colSpan])
                                } else {
                                    if (index == cloLv.length - 1) {
                                        cloLv[cloLv.length] = [[m.cloIndex, m.colSpan]]
                                        m.lv = index + 1
                                    }
                                }
                            } else {
                                cloLv[index] = [[m.cloIndex, m.colSpan]]
                                m.lv = index
                            }
                        })
                        eventDom.value.push({ ...eventItem, ...m })
                    }
                })
            })
        })
        onMounted(() => {
            getEvent()
            window.onresize = () => {
                showEvent.value = false
                nextTick(() => {
                    showEvent.value = true
                })
            }
        })
        return {
            data,
            loading,
            setValue,
            format: _format,
            getEvent,
            gridOptions,
            gridEvent,
            gridComponent,
            message,
            sContext,
            eventList,
            eventItemStyle,
            eventDom,
            eventHandel,
            showEvent,
            setActiveDate
        }
    }
})
</script>
<style lang="less">
#cnadarMonthView {
    height: 100%;
    width: 100%;
    background-color: #ccc;
    position: relative;
    flex: 1;
    top: -1px;
    min-height: 870px;
    min-width: 600px;
    overflow: hidden;

    .vxe-table--body {
        height: 100%;

        tr.vxe-body--row.my-row {
            height: 120px;

            .vxe-cell {
                height: 100%;
                text-align: left;
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

    .n-data-table-tbody {

        .n-data-table-tr .n-data-table-td {
            padding: 0;
            vertical-align: baseline;

            .c_days {}

            .c_days.c_days_hide {
                // color: #ccc
            }
        }

        .event-label {
            cursor: pointer;
        }
    }

    .event-row {
        position: absolute;
        width: 0;
        height: 0;
        left: 0;
        top: 50px;

        .event {
            width: 200px;
            position: absolute;
            box-sizing: border-box;
            padding-left: 5px;
            color: #fff;
            font-size: 12px;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.5s;
        }

        .event:hover {
            opacity: 0.8;
            box-shadow: 3px 3px 10px 5px #eee;
        }
    }

}
</style>