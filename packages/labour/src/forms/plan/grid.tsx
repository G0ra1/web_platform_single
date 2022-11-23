import { h } from 'vue'
import type { VxeGridProps, VxeGridInstance } from "vxe-table";

import { NButton, NInput, NSelect, NDatePicker } from "naive-ui";

import type { Ref } from "vue"

import type { LabourPlan, LabourPlanPerson } from "./model";

export const getGridOptions: (dataModel: Ref<LabourPlan>, dataPermits: any) => VxeGridProps<LabourPlanPerson> = (dataModel: Ref<LabourPlan>, dataPermits: any) => {
    return {
      // rowId: "id",
      rowKey: false,
      keepSource: false,
      // height: '500px',
      size: "mini",
      showOverflow: false,
      highlightHoverRow: true,
      border: true,
      data: dataModel.value.labourPlanPersonList,
      toolbarConfig: {
          enabled: dataPermits.labourPlanContractWorks !== 'readonly',  
          slots: {
              buttons: ({ $grid }: any) => {
              return [
                  <NButton
                  type="primary"
                  onClick={() => {
                      // 第一次添加可能没有子表属性
                      if (!dataModel.value.labourPlanPersonList) {
                      dataModel.value.labourPlanPersonList = [];
                      }
                      dataModel.value.labourPlanPersonList?.push({
                        //planId:0,
                        isHour:0,
                        projectName : "",
                        postRankId: "",
                        postRankName: "",
                        needNo: 0,
                        outerDisciplineId: "",
                        outerDisciplineName: "",
                      });
                      $grid.reloadData(dataModel.value.labourPlanPersonList);
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
          visible: dataPermits['labourPlanPersonList.outerDisciplineName'] !== 'hide',
          title: "专业名称",
          field: "outerDisciplineName",
          showOverflow: "title",
          editRender: { enabled: dataPermits['outerDisciplineName.outerDisciplineName'] !== 'readonly' },
          slots: {
            default: ({ row }: any) => {
              return row.outerDisciplineName
            },
            edit: ({ row }: any) => {
              return [
                <NInput
                  size="small"
                  placeholder="输入名称"
                  value={row.outerDisciplineName}
                  onUpdateValue={d => row.outerDisciplineName = d}
                />
              ]
            }
          },
        },
        {
          visible: dataPermits['labourPlanPersonList.projectName'] !== 'hide',
          title: "项目",
          field: "projectName",
          showOverflow: "title",
          editRender: { enabled: dataPermits['labourPlanPersonList.projectName'] !== 'readonly' },
          slots: {
            default: ({ row }: any) => {
              return row.projectName
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
                  value={row.projectName}
                  onUpdateValue={(d) => {row.projectName = d}}
                />
              ]
            }
          },
        },
        {
          visible: dataPermits['labourPlanPersonList.postRankName'] !== 'hide',
          title: "岗位名称",
          field: "postRankName",
          showOverflow: "title",
          editRender: { enabled: dataPermits['labourPlanPersonList.postRankName'] !== 'readonly' },
          slots: {
            default: ({ row }: any) => {
              return row.postRankName
            },
            edit: ({ row }: any) => {
              return [
                <NDatePicker
                  size="small"
                  formatted-value={row.postRankName}
                  onUpdateFormattedValue={(d) => { row.postRankName = d }}
                />
              ]
            }
          },
        },
        {
          visible: dataPermits['labourPlanPersonList.needNo'] !== 'hide',
          title: "需求人数",
          field: "needNo",
          showOverflow: "title",
          editRender: { enabled: dataPermits['labourPlanPersonList.needNo'] !== 'readonly' },
          slots: {
            default: ({ row }: any) => {
              return row.needNo
            },
            edit: ({ row }: any) => {
              return [
                <NInput
                  size="small"
                  placeholder="输入人数"
                  value={row.needNo}
                  onUpdateValue={d => row.needNo = d}
                />
              ]
            }
          },
        },
        {
          visible: dataPermits['labourPlanPersonList.isHour'] !== 'hide',
          title: "是否工时制",
          field: "isHour",
          showOverflow: "title",
          editRender: { enabled: dataPermits['labourPlanPersonList.isHour'] !== 'readonly' },
          slots: {
            default: ({ row }: any) => {
              return row.isHour
            },
            edit: ({ row }: any) => {
              return [
                <NSelect
                  size="small"
                  options={[
                    {
                      label: '是',
                      value: 1
                    },
                    {
                      label: '否',
                      value: 0
                    },
                  ]}
                  value={row.isHour}
                  onUpdateValue={(d) => {row.isHour = d}}
                />
              ]
            }
          },
        },
        {
          visible: dataPermits.labourPlanContractWorks !== 'readonly',
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
                    console.log("-------")
                    console.log(rowIndex)
                    console.log("-------")
                    dataModel.value.labourPlanPersonList!.splice(rowIndex, 1);
                    // 当没有子表数据时，整个子表属性也要删除，为了触发必填验证
                    if (!dataModel.value.labourPlanPersonList!.length) {
                      delete dataModel.value.labourPlanPersonList;
                    }
                    $table.reloadData(dataModel.value.labourPlanPersonList);
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