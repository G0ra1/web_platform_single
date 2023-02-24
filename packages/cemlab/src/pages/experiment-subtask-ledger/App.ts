/**
 * @Description 实验管理-实验任务台账
 * @author 云数网讯 lvchengming@netwisd.com@netwisd.com
 * @date 2023-01-20 12:09:27
 */

import { ref, h } from "vue";
import {
  RequestPaging,
  VxeHelper,
  NwFunctionPredefine,
  Db,
  Page,
} from "@platform/main";
import { NTag } from "naive-ui";

/**
 * 初始化弹出框组件
 */
let dialogLocal: any;
function initDialog(dialog: any) {
  dialogLocal = dialog;
}

/**
 * 列表的请求和组装，也可以直接在页面用使用vxe-grid形式
 */
const { bind, gridRef, filterData, query, reset } = new VxeHelper.VxeGridPaging(
  {
    columns: [
      { type: "seq", minWidth: "20px", title: "序号", align: "center" },
      {
        field: "taskName",
        title: "实验任务",
        showHeaderOverflow: true,
        minWidth: "160px",
        align: "center",
        slots: {
          default: ({ row }) => {
            let insideInfo = h(
              NwFunctionPredefine,
              { code: "insideTaskAllView", descr: "查看", params: [row] },
              {
                auth: (fn: any) => {
                  return h(
                    "a",
                    {
                      href: "javascript:void",
                      style: "text-decoration: none",
                      onClick: fn,
                    },
                    row.taskName
                  );
                },
                unauth: () => row.taskName,
              }
            );
            let entrustInfo = h(
              NwFunctionPredefine,
              { code: "entrustTaskAllView", descr: "查看", params: [row] },
              {
                auth: (fn: any) => {
                  return h(
                    "a",
                    {
                      href: "javascript:void",
                      style: "text-decoration: none",
                      onClick: fn,
                    },
                    row.taskName
                  );
                },
                unauth: () => row.taskName,
              }
            );
            return row.type === 1
              ? insideInfo
              : row.type === 2
              ? entrustInfo
              : [];
          },
        },
      },
      {
        field: "experimentUserName",
        title: "实验人员",
        showHeaderOverflow: true,
        minWidth: "160px",
        align: "center",
      },
      {
        field: "finishDate",
        title: "完成日期",
        showHeaderOverflow: true,
        minWidth: "160px",
        align: "center",
      },
      {
        field: "createUserName",
        title: "创建人",
        showHeaderOverflow: true,
        minWidth: "160px",
        align: "center",
      },
      {
        field: "createTime",
        title: "创建日期",
        showHeaderOverflow: true,
        minWidth: "160px",
        align: "center",
      },
    ],
  },
  new RequestPaging("/cemlab/cemlabExperimentTask/page", "post")
);

const refresh = () => {
  reset({ experimentReceiptsId: Page.getMenuData().id });
};

/**
 * 传递用户参数例子
 */
let paramsArray = ref([{}]);
Db.get("userInfo").then((d: any) => {
  paramsArray.value = [{ createUserName: d.userName }];
});

export {
  bind,
  gridRef,
  filterData,
  query,
  refresh,
  reset,
  paramsArray,
  initDialog,
};
