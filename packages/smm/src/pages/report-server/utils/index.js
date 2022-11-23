import { format } from "date-fns";
const getCurrentMonthLast = () => {
    var date = new Date();
    var currentMonth = date.getMonth();
    var nextMonth = ++currentMonth;
    var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
    var oneDay = 1000 * 60 * 60 * 24;
    return new Date(format(new Date(nextMonthFirstDay - oneDay), 'yyyy-MM-dd') + ' 23:59:59')
}
const getCurrentMonthFirst = () => {
    var date = new Date(format(new Date(), 'yyyy-MM-dd') + ' 00:00:00');
    date.setDate(1);
    return date;
}
export { getCurrentMonthLast, getCurrentMonthFirst }