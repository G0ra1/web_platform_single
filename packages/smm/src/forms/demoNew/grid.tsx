import { h } from 'vue'
import type { VxeGridProps, VxeGridInstance } from "vxe-table";

import { NButton, NInput, NSelect, NDatePicker } from "naive-ui";

import type { Ref } from "vue"

import type { FormType, TaskInfoDetail } from "./conf";

export const getGridOptions: (dataModel: Ref<FormType>, dataPermits: any) => VxeGridProps<TaskInfoDetail> = (dataModel: Ref<FormType>, dataPermits: any) => {
    return {
      // rowId: "id",
      rowKey: false,
      keepSource: false,
      // height: '500px',
      size: "mini",
      showOverflow: false,
      highlightHoverRow: true,
      border: true,
      data: dataModel.value.taskInfoDetailList,
      toolbarConfig: {
          enabled: dataPermits.taskInfoDetailList !== 'readonly',  
          slots: {
              buttons: ({ $grid }: any) => {
              return [
                  <NButton
                  type="primary"
                  onClick={() => {
                      // 第一次添加可能没有子表属性
                      if (!dataModel.value.taskInfoDetailList) {
                      dataModel.value.taskInfoDetailList = [];
                      }
                      dataModel.value.taskInfoDetailList?.push({
                      detailName: "",
                      detailType: 1,
                      detailDatetime: null,
                      });
                      $grid.reloadData(dataModel.value.taskInfoDetailList);
                  }}
                  >
                  {{
                      default: () => "新增",
                  }}
                  </NButton>,
              ];
              },
          },
      },
      editConfig: {
        trigger: "click",
        mode: "row",
        showStatus: true,
        autoClear: false,
      },
      columns: [
        {
          visible: dataPermits['taskInfoDetailList.detailName'] !== 'hide',
          title: "名称",
          field: "detailName",
          showOverflow: "title",
          editRender: { enabled: dataPermits['taskInfoDetailList.detailName'] !== 'readonly' },
          slots: {
            default: ({ row }: any) => {
              return row.detailName
            },
            edit: ({ row }: any) => {
              return [
                <NInput
                  size="small"
                  placeholder="输入名称"
                  value={row.detailName}
                  onUpdateValue={d => row.detailName = d}
                />
              ]
            }
          },
        },
        {
          visible: dataPermits['taskInfoDetailList.detailType'] !== 'hide',
          title: "类型",
          field: "detailType",
          showOverflow: "title",
          editRender: { enabled: dataPermits['taskInfoDetailList.detailType'] !== 'readonly' },
          slots: {
            default: ({ row }: any) => {
              return row.detailType
            },
            edit: ({ row }: any) => {
              return [
                <NSelect
                  size="small"
                  options={[
                    {
                      label: '1',
                      value: 1
                    },
                    {
                      label: '2',
                      value: 2
                    },
                  ]}
                  value={row.detailType}
                  onUpdateValue={(d) => {row.detailType = d}}
                />
              ]
            }
          },
        },
        {
          visible: dataPermits['taskInfoDetailList.detailDatetime'] !== 'hide',
          title: "日期",
          field: "detailDatetime",
          showOverflow: "title",
          editRender: { enabled: dataPermits['taskInfoDetailList.detailDatetime'] !== 'readonly' },
          slots: {
            default: ({ row }: any) => {
              return row.detailDatetime
            },
            edit: ({ row }: any) => {
              return [
                <NDatePicker
                  size="small"
                  value-format="yyyy-MM-dd"
                  formatted-value={row.detailDatetime}
                  onUpdateFormattedValue={(d) => { row.detailDatetime = d }}
                />
              ]
            }
          },
        },
        {
          visible: dataPermits.taskInfoDetailList !== 'readonly',
          title: "操作",
          width: 70,
          fixed: "right",
          slots: {
            default: ({ $table, rowIndex }: any) => {
              return [
                <NButton
                  size="small"
                  type="error"
                  text
                  onClick={() => {
                    dataModel.value.taskInfoDetailList!.splice(rowIndex, 1);
                    // 当没有子表数据时，整个子表属性也要删除，为了触发必填验证
                    if (!dataModel.value.taskInfoDetailList!.length) {
                      delete dataModel.value.taskInfoDetailList;
                    }
                    $table.reloadData(dataModel.value.taskInfoDetailList);
                  }}
                >
                  {{
                    default: () => "删除",
                  }}
                </NButton>,
              ];
            },
          },
        },
      ]
    }
}