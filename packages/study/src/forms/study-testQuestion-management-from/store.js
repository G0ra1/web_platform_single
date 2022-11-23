import {
  ref,
  reactive,
  watch
} from 'vue'
import './bridge.js'
import { cloneDeep } from 'lodash'
export const dataModel = ref({})
export const rules = ref([])
export const defaultSelecteRow = ref('')
const formatDate = (date) => {
  var date = new Date(date);
  var YY = date.getFullYear() + '-';
  var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
  var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
  return YY + MM + DD + " " + hh + mm + ss;//
}
window.DM_SET_VALUE = function (v) {
   if(v.id){
    if((v.questionCode==1 || v.questionCode==0)) {
      v={answers:[{sort:0,isTrue:0},{sort:1,isTrue:0},{sort:2,isTrue:0},{sort:3,isTrue:0},],...cloneDeep(v)}
      //  defaultSelecteRow.value= (v.answers).filter(d=>d.isTrue==1)[0].sort
     } else if(v.questionCode==2){
      //  {sort:0,isTrue:1},{sort:1,isTrue:1}
      v={answers:[],...cloneDeep(v),}

     } else if(v.questionCode==3){
      v={answers:[{sort:0,isTrue:1},],...cloneDeep(v),}

     } else {
      v={answers:[{sort:0,answer:'',isTrue:1},],...cloneDeep(v),}
     }
 } else {
     if((v.questionCode==1 || v.questionCode==0)) {
      v={answers:[{sort:0,isTrue:0},{sort:1,isTrue:0},{sort:2,isTrue:0},{sort:3,isTrue:0},],...cloneDeep(v)}

     } else if(v.questionCode==2){
      v={answers:[],...cloneDeep(v)}

     } else if(v.questionCode==3){
      v={answers:[{sort:0,isTrue:1},],...cloneDeep(v),}

     } else {
      v={answers:[{sort:0,answer:'',isTrue:1},],...cloneDeep(v),}
     }
 }
 dataModel.value = v
}
// 设置表单字段权限
window.DM_SET_RULES = function (v) {
  rules.value = v
}
// 获取表单数据
window.DM_GET_VALUE = function () {
 
  return cloneDeep(dataModel.value)

}
window.DM_VALIDATE = async function () {
  return []
  return f
}

window.DM_INIT && window.DM_INIT()
