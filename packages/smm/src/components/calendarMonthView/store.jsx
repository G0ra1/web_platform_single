import { ref, reactive, defineComponent, nextTick, h, onMounted, watch } from 'vue'
import { creatData, mapValues } from '../../utils/calendarTimeFormat.js'
import { format } from "date-fns";
import {
    todoListView
} from "../../api/index.js"
export const _format = format
export const gridComponent = ref(null)
export const loading = ref(false)
export const data = ref([
])
export const message = ref();
export const sContext = ref()
export const eventList = ref([])
let minDate = +new Date()
let maxDate = +new Date()

let newDate = +new Date()
let activeDate = +new Date()
export const eventHandel = (d) => {
    sContext.value.emit("editEvent", d);
}
const isHaveEvent = (date) => {
    return eventList.value.filter((d) => {
        return date >= +new Date(d.taskStartTime.substring(0, 10) + ' 00:00:00') && date <= +new Date(d.taskEndTime.substring(0, 10) + ' 23:59:59')
    }).length > 0
}
const getEventDate = (date) => {
    return eventList.value.filter((d) => {
        return date >= +new Date(d.taskStartTime.substring(0, 10) + ' 00:00:00') && date <= +new Date(d.taskEndTime.substring(0, 10) + ' 23:59:59')
    })
}
const isThatMonth = (date) => {
    return format(date, 'MM') == format(data.value[3].sun, 'MM')
}
const columnRender = (row, week) => {
    let dom = <span class={['c_days', isThatMonth(row[week]) ? '' : 'c_days_hide', format(row[week], 'MM-dd') == format(+new Date(), 'MM-dd') ? 'c_days_this' : '', format(row[week], 'MM-dd') == format(activeDate, 'MM-dd') ? 'c_days_active' : '']}> {format(row[week], 'd')}</span>
    // if (isHaveEvent(row[week])) {
    //     dom = <div class="event_box" >
    //         <span class={['c_days', isThatMonth(row[week]) ? '' : 'c_days_hide', format(row[week], 'MM-dd') == format(+new Date(), 'MM-dd') ? 'c_days_this' : '', format(row[week], 'MM-dd') == format(activeDate, 'MM-dd') ? 'c_days_active' : '']}>{format(row[week], 'd')}</span>
    //         {getEventDate(row[week]).map(d => {
    //             let style = {
    //                 "background": `var(--lv${d.priority})`,
    //             }
    //             return <div onClick={() => eventHandel(d)} class="event-label" style={style}>{d.taskName}</div>
    //         })}
    //     </div >

    // }
    return dom
}
const createColumns = () => {
    return [
        {
            title: '日',
            field: 'sun',
            align: 'center',
            slots: {
                default: ({ row }) => columnRender(row, 'sun')
            }
        },
        {
            title: '一',
            field: 'mon',
            align: 'center',
            slots: {
                default: ({ row }) => columnRender(row, 'mon')
            }
        },
        {
            title: '二',
            field: 'tue',
            align: 'center',
            slots: {
                default: ({ row }) => columnRender(row, 'tue')
            }
        },
        {
            title: '三',
            field: 'wed',
            align: 'center',
            slots: {
                default: ({ row }) => columnRender(row, 'wed')
            }
        },
        {
            title: '四',
            field: 'thu',
            align: 'center',
            slots: {
                default: ({ row }) => columnRender(row, 'thu')
            }
        },
        {
            title: '五',
            field: 'fri',
            align: 'center',
            slots: {
                default: ({ row }) => columnRender(row, 'fri')
            }
        },
        {
            title: '六',
            field: 'sat',
            align: 'center',
            slots: {
                default: ({ row }) => columnRender(row, 'sat')
            }
        },
    ]
}

export const getEvent = (d = new Date()) => {
    newDate = new Date(d)
    let d1 = creatData(d)
    minDate = d1[0].sun;
    maxDate = d1[d1.length - 1].sat
    todoListView({ taskStartTime: format(minDate, 'yyyy-MM-dd'), taskEndTime: format(maxDate, 'yyyy-MM-dd') }).then(res => {
        eventList.value = res
        data.value = d1
        gridComponent.value.loadData(data.value)
        loading.value = false
    })
}
export const setActiveDate = (d) => {
    activeDate = d
    gridComponent.value.loadData(data.value)
}


export const gridOptions = reactive({
    size: "small",
    stripe: false,
    border: 'full',
    height: "auto",
    align: null,
    columns: createColumns(),
    rowClassName: "my-row",
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
export const gridEvent = reactive({
    cellClick: ({ columnIndex, row }) => {
        activeDate = mapValues(row).sort()[columnIndex]
        gridComponent.value.loadData(data.value)
        sContext.value.emit('activeDateChange', activeDate)
        if (format(activeDate, 'MM') !== format(newDate, 'MM')) {
            newDate = new Date(activeDate);
            getEvent(new Date(activeDate));
            sContext.value.emit('dateChange', newDate)
        }

    }
});




