<template>
    <div id="cnadarWeekView">
        <div class="header">
            <div class="header-block" v-for="date in dateList">
                <p @click="() => daysClick(date)" :class="{ 'days': true, 'daysActive': date == activeDate }">
                    <span>{{ new Date(date).getDate() }}</span>
                    <span>{{ `星期${week[new Date(date).getDay()]}` }}</span>
                </p>
                <p class="events">
                    <span class="circle"></span>
                    <span class="e-contents">今日有事</span>
                </p>
            </div>
        </div>
        <div class="content">
            <div class="time_c">
                <span v-for="i in timeList">{{ i }}</span>
            </div>
            <div class="column" v-for="date in dateList">
                <div class="cell" v-for="time in timeList">
                </div>
            </div>

        </div>
        <div class="footer">
            <div @click="() => weekBtnClick(date)" v-for="date in btnList"
                :class="{ 'active': date.indexOf(activeDate) >= 0 }">
                {{ format(date[0], 'yyyy年MM月dd号') + '-' + format(date[6], 'MM月dd号') }}
            </div>
        </div>
    </div>
</template>
<script lang="jsx">
import { ref, reactive, defineComponent, nextTick, h, onMounted } from 'vue'
import { creatData, mapValues } from '../../utils/calendarTimeFormat.js'
import * as d3 from "d3";
import { format } from "date-fns";
export default defineComponent({
    setup() {
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
        const week = ['日', '一', '二', '三', '四', '五', '六']
        const dateList = ref([])
        const dateWeekList = ref([])
        const timeList = ref(timeListf())
        const btnList = ref([])

        const setValue = (date = new Date()) => {
            dateWeekList.value = creatData(date)
            console.log('周形式日期', dateWeekList.value)
            initData()
        }
        const activeDate = ref(+new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()))
        const daysClick = (date) => {
            activeDate.value = date
        }
        const weekBtnClick = (weekList) => {
            console.log(weekList,'weekListweekListweekList')
            dateList.value = weekList
            activeDate.value = dateList.value[0]
        }
        const initData = () => {
            dateList.value = mapValues(dateWeekList.value[0]).sort()
            activeDate.value = +new Date()
            btnList.value = dateWeekList.value.map(d => mapValues(d))
            // dateList.value = btnList.value.filter(d => d.indexOf(activeDate.value) >= 0)[0]
            
        }
        onMounted(() => {
            dateWeekList.value = creatData()
            console.log('周形式日期', dateWeekList.value)
            initData()
        })

        return {
            timeList,
            dateList,
            setValue,
            dateWeekList,
            initData,
            btnList,
            week,
            format: _format,
            daysClick,
            activeDate,
            weekBtnClick
        }
    }
})
</script>
<style lang="less" scoped>
#cnadarWeekView {
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;


    .header {
        height: 120px;
        box-sizing: border-box;
        padding: 0 80px;
        border-bottom: 3px solid #ccc;
        display: flex;

        &-block {
            flex: 1;
            border: 1px solid #ccc;

            p {
                margin: 0;
            }

            .days {
                display: flex;
                justify-content: space-between;
                border-bottom: #ccc 1px solid;
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
        background-color: darkcyan;
        border-bottom: 3px solid #ccc;
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

            span {
                height: 35px;
                line-height: 35px;
                border-right: 1px solid #ccc;
            }
        }

        .column {
            flex: 1;

            .cell {
                height: 35px;
                border-right: 1px solid #ccc;
                border-bottom: 1px solid #ccc;
                box-sizing: border-box;
            }
        }
    }

    .footer {
        display: flex;
        border-bottom: 3px solid #ccc;
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