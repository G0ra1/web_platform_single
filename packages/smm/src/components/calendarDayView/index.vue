<template>
    <div id="cnadarDayView">
        <div class="content">
            <div class="time_c">
                <span v-for="i in timeList">{{ i }}</span>
            </div>
            <div class="column">
                <div class="cell" v-for="time in timeList">
                </div>
                <div class="eventColumn">
                    <div class="eventItem" @click="()=>eventHandel(item)" :style="eventItemStyle(item)"
                        v-for="item in eventList">
                        <p>
                            任务名称：{{item.taskName}}
                        </p>
                        <p v-if="format(new Date(item.taskStartTime),'MM-dd') == format(new
                        Date(item.taskEndTime),'MM-dd')">
                            任务时间：{{format(new Date(item.taskStartTime),'HH:mm')}}--{{format(new
                            Date(item.taskEndTime),'HH:mm')}}
                        </p>
                        <p v-if="format(new Date(item.taskStartTime),'MM-dd') != format(new
                        Date(item.taskEndTime),'MM-dd')">
                            任务时间：{{format(new Date(item.taskStartTime),'MM-dd HH:mm')}}--{{format(new
                            Date(item.taskEndTime),'MM-dd HH:mm')}}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="jsx">
import { ref, reactive, defineComponent, nextTick, h, onMounted } from 'vue'
import { format } from "date-fns";
import { request } from '@platform/main'
export default defineComponent({
    props: ['activeValue'],
    setup(props, context) {
        const eventItemStyle = (item) => {
            let dayStart = +new Date(format(activeDate.value, 'yyyy-MM-dd') + ' 00:00:00')
            let dayEnd = dayStart + 24 * 60 * 60 * 1000
            let pliesNum = (Math.min(+new Date(item.taskEndTime), dayEnd) - Math.max(+new Date(item.taskStartTime), dayStart)) / (60 * 60 * 1000)
            let height = pliesNum * 35 + 'px'
            let top = (Math.max(+new Date(item.taskStartTime), dayStart) - dayStart) / (60 * 60 * 1000) * 35 + 35 + 'px'
            let color = ['#C91019', '#F08301', '#FFDE44', '#7AB1FF', '#7AFF8B']
            return {
                backgroundColor: color[item.priority * 1 - 1],
                height,
                top,
                maxWidth:'240px'
            }
        }

        const timeListf = () => {
            let a = []
            for (let index = 0; index < 24; index++) {
                if (index < 10) { a.push(`0${index}:00`); } else {
                    a.push(`${index}:00`)
                }
            }
            return a
        }
        const _format = format
        const timeList = ref(timeListf())
        const activeDate = ref(props.activeValue)
        const tableLoading = ref(false)
        const setValue = (date = new Date()) => {
            activeDate.value = date
            getEvent()
        }
        const eventList = ref([

        ])
        const getEvent = (_date = activeDate.value) => {
            tableLoading.value = true
            let minDate, maxDate;
            minDate = _date
            maxDate = _date
            request({
                url: `center/todo/list/view?taskStartTime=${format(minDate, 'yyyy-MM-dd') + ' 00:00:00'}&taskEndTime=${format(maxDate, 'yyyy-MM-dd') + ' 23:59:59'}`,
                method: 'get',
            }).then(res => {
                // eventList.value = [
                //     {
                //         taskName: '测试一',
                //         taskStartTime: '2022-09-25 03:26:00',
                //         taskEndTime: '2022-09-25 08:39:00',
                //         priority: 1
                //     },
                //     {
                //         taskName: '测试二',
                //         taskStartTime: '2022-09-24 03:26:00',
                //         taskEndTime: '2022-09-26 08:39:00',
                //         priority: 2
                //     },
                //     {
                //         taskName: '测试三',
                //         taskStartTime: '2022-09-25 10:26:00',
                //         taskEndTime: '2022-09-26 11:39:00',
                //         priority: 3
                //     }
                //     ,
                //     {
                //         taskName: '测试四',
                //         taskStartTime: '2022-09-25 08:00:00',
                //         taskEndTime: '2022-09-25 11:39:00',
                //         priority: 4
                //     }
                // ]
                eventList.value =  res
                tableLoading.value = true
            })
        }
        const eventHandel = (d) => {
            context.emit("editEvent", d);
        }
        onMounted(() => {
            getEvent()
        })

        return {
            timeList,
            setValue,
            format: _format,
            activeDate,
            eventList,
            getEvent,
            eventItemStyle,
            eventHandel
        }
    }
})
</script>
<style lang="less" scoped>
#cnadarDayView {
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    flex: 1;
    min-height: 870px;
    min-width: 600px;


    .header {
        height: 120px;
        box-sizing: border-box;
        padding: 0 80px;
        border-bottom: 3px solid #8f959e;
        display: flex;

        &-block {
            flex: 1;
            border: 1px solid #8f959e;

            p {
                margin: 0;
            }

            .days {
                display: flex;
                justify-content: space-between;
                border-bottom: #8f959e 1px solid;
                cursor: pointer;

                span {
                    flex: 1;
                    text-align: center;
                }
            }

            .daysActive {
                background-color: red;
                color: #fff;
            }

            .events {
                margin-top: 5px;
                padding-left: 15px;

                .circle {
                    display: inline-block;
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background-color: brown;
                    vertical-align: sub;
                    margin-right: 15px;
                }

                .e-contents {
                    display: inline-block;
                    height: 16px;

                }
            }


        }

    }

    .content {
        flex: 1;
        overflow: auto;
        box-sizing: border-box;
        border-bottom: 3px solid #8f959e;
        display: flex;
        padding: 0 80px 0 0;

        &::-webkit-scrollbar {
            width: 0px;
            height: 0px;
        }

        &::-webkit-scrollbar-thumb {
            border-radius: 5px;
            -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
            background-color: #99a9bf;
        }

        &::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
            border-radius: 5px;
            background-color: #d3dce6;
        }

        .time_c {
            width: 80px;
            display: flex;
            flex-direction: column;
            text-align: right;
            padding-top: 17.5px;
            border-right: 1px solid #ddd;
            padding-right: 5px;
            color: #8f959e;

            span {
                height: 35px;
                line-height: 35px;
            }
        }

        .column {
            flex: 1;
            position: relative;

            .cell {
                height: 35px;
                border-right: 1px solid #ddd;
                border-bottom: 1px solid #ddd;
                box-sizing: border-box;
            }

            .eventColumn {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                display: flex;
                overflow: hidden;


                .eventItem {
                    flex: 1;
                    position: relative;
                    margin: 0 10px;
                    border-radius: 6px;
                    color: #fff;
                    padding: 12px;
                    font-size: 12px;
                    box-sizing: border-box;
                    transition: all 0.5s;
                }

                .eventItem:hover {
                    opacity: 0.8;
                    box-shadow: 3px 3px 10px 5px #eee;
                    cursor: pointer;
                }
            }
        }
    }

    .footer {
        display: flex;
        border-bottom: 3px solid #8f959e;
        height: 30px;
        line-height: 30px;
        padding: 0 80px;
        cursor: pointer;

        div {
            flex: 1;
            text-align: center;
        }

        div.active {
            background-color: red;
            color: #fff;
        }

    }

}
</style>