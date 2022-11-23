import * as d3 from "d3";

export function getMyTimeFormat(date = new Date()) {
    const day2ms = 24 * 60 * 60 * 1000
    const formatWeek = d3.timeFormat("%w") // 本周的第几天 周日为0
    const formatWeeks = d3.timeFormat("%W") // 本年的第几周
    const formatGetweek = d3.timeFormat("%a") // 获取周几简写
    const year = date.getFullYear()
    const month = date.getMonth()
    const thatMonthDays = new Date(year, month + 1, 0).getDate() // 本月天数
    const lastMonthDays = new Date(year, month, 0).getDate()
    const dateStart = new Date(year, month, 1) //开始日期
    const dateEnd = new Date(year, month, thatMonthDays) // 结束日期
    const weekStart = formatWeeks(dateStart) // 当月一号所在每年周数
    const weekEnd = formatWeeks(dateEnd)// 当月最后一天所在每年周数
    const weeks = weekEnd - weekStart + 1 // 当月在日历占据的周数
    const startDays = formatWeek(dateStart) // 一号是本周第几天
    const pageDays = weeks * 7 // 本月日历天数
    const calenderStartTime = +new Date(year, month, 1) - startDays * day2ms
    const calenderEndTime = +new Date(year, month, 1) + (pageDays - startDays - 1) * day2ms
    return {
        calenderStartTime,
        day2ms,
        weeks,
        formatGetweek
    }
}
export function creatData(date = new Date()) {
    let { calenderStartTime: sTime, day2ms, weeks, formatGetweek } = getMyTimeFormat(date)
    let tempData = []
    for (let w = 0; w < weeks; w++) {
        let m = {}
        for (let d = 0; d < 7; d++) {
            m[formatGetweek(sTime).toLocaleLowerCase()] = +new Date(sTime)
            sTime += day2ms
        }
        tempData.push(m)
    }
    return tempData
}

export function mapValues(map) {
    var values = [];
    for (var key in map) values.push(map[key]);
    return values;
}