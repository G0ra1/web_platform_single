<template>
  <n-layout class="nw-page">
    <n-layout-header>
      <h1>用户管理</h1>
      <div class="nw-page-header-right">
        <NwTableFun v-if="!formVisible" :table="nwTable"></NwTableFun>
      </div>
    </n-layout-header>
    <n-layout position="absolute" has-sider style="top: 36px" ref="page">
      <n-layout-sider collapse-mode="width" :collapsed-width="400" default-collapsed :width="280" bordered>
        <n-space vertical :size="12">
          <n-input v-model:value="pattern" placeholder="搜索" />
          <n-spin :show="isLoading">
            <n-tree :data="tree.treeList" block-line :render-prefix="renderPrefix" :pattern="pattern" virtual-scroll
              :default-expanded-keys="['0']" class="treeH" @update:selected-keys="
                (e) => {
                  deptChange(e)
                }
              " />
          </n-spin>
          <!--               :render-label="renderLabel"
 -->
        </n-space>
      </n-layout-sider>
      <n-layout-content>
        <NwTable ref="nwTable" :columns="columns" :data="null" :request="request" :response="response"
          :searchFormFields="[
            {
              field: 'userNameCh',
              title: '人员名称',
              valueFormat: (d) => d,
            },
          ]">
          <template v-slot:header-left="{ selected }">
            <n-input-group>
              <n-button type="info" size="small" @click="sortAction.sonFn({})" style="margin-right: 5px">全员排序</n-button>
              <n-popconfirm @positive-click="handDel(selected)" positive-text="确定" negative-text="取消">
                <template #trigger>
                  <n-button style="margin-right: 5px" :disabled="selected.length === 0" size="small">删除</n-button>
                </template>
                {{ `是否确定删除此${selected.length}条数据` }}
              </n-popconfirm>

              <n-button :loading="isTableLoading" :disabled="isTableLoading" type="info" size="small"
                @click="exportFile" style="margin-right: 5px">导出模板</n-button>
              <n-upload v-if="showUpload" :action="uploadUrl" accept="*/*" :show-file-list="false"
                :disabled="orgType == 1" :headers="{
                  Authorization: `${tokenType} ${token}`,
                }" :data="{
  deptId: uploadDeptId
}" @finish="handleFinish" @change="handChange" @error="handleError" @before-upload="beforeUpload">
                <n-button size="small" type="info">
                  <NwIcon name="icon-add-bold" :size="15" />导入
                </n-button>
              </n-upload>
            </n-input-group>
          </template>
          <template #header-right>
            <n-button type="info" size="small" @click="show">新设人员</n-button>
            <!-- <n-button type="info" size="small" style="margin-right: 5px;">其他</n-button>
            <n-button type="info" size="small">其他</n-button> -->
          </template>
          <template v-slot:search-form="{ searchFormData, searchFormData2 }">
            <n-form :model="searchFormData">
              <n-form-item path="userNameCh" label="人员名称">
                <n-input v-model:value="searchFormData.userNameCh" @keydown.enter.prevent />
              </n-form-item>

              <n-form-item path="idCard" label="证件号">
                <n-input v-model:value="searchFormData.idCard" @keydown.enter.prevent />
              </n-form-item>
            </n-form>
            <!-- <n-button type="info" size="small" style="margin-right: 5px;">其他</n-button>
            <n-button type="info" size="small">其他</n-button> -->
          </template>
        </NwTable>
      </n-layout-content>
    </n-layout>
  </n-layout>
  <AddEmp ref="addEmp" :treeList="tree.treeList" @update:callback="
    () => {
      $refs.nwTable.commitQuery();
      getTreeList();
    }
  "></AddEmp>
  <EditAction ref="editAction" @update:callback="
    () => {
      getTreeList();
      $refs.nwTable.commitQuery();
    }
  "></EditAction>
  <PostPickModal ref="postPickModal" :showSide="false" :multiple="false" @update:callback="
    (e) => {
      callbackPostPick(e);
      //$refs.nwTable.commitQuery();
    }
  "></PostPickModal>
  <PostPickModal ref="postPick" :showSide="true" @update:callback="
    (e) => {
      partPostPick(e);
    }
  "></PostPickModal>
  <DutyPickModal ref="dutyPickModal" :showSide="false" :multiple="false" @update:callback="
    (e) => {
      callbackdutyPick(e);
      //$refs.nwTable.commitQuery();
    }
  "></DutyPickModal>
  <DutyPickModal ref="dutyPick" :showSide="true" @update:callback="
    (e) => {
      partDutyPick(e);
    }
  "></DutyPickModal>
  <UnitMobilize ref="unitMobilize" @update:callback="
    (e) => {
      $refs.nwTable.commitQuery();
    }
  "></UnitMobilize>
  <SetPassWord ref="setPassWord" @update:callback="
    (e) => {
      $refs.nwTable.commitQuery();
    }
  "></SetPassWord>
  <SortAction ref="sortAction" @update:callback="
    () => {
      $refs.nwTable.commitQuery();
    }
  "></SortAction>
  <CurrentSort ref="currentSort" @update:callback="
    () => {
      $refs.nwTable.commitQuery();
    }
  "></CurrentSort>
  <VersionAction ref="versionAction" @update:callback="
    () => {
      $refs.nwTable.commitQuery();
    }
  "></VersionAction>
  <div style="
      position: fixed;
      z-index: 9999;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
    " v-show="loading">
    <n-spin :show="loading">
      <template #description> 正在导入 </template>
      <div style="height: 800px; width: 500px"></div>
    </n-spin>
  </div>
</template>

<script lang="jsx">
// import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-grids';
import { defineComponent, ref, reactive, onMounted, h } from 'vue'
import {
  NDrawer,
  NDrawerContent,
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NThemeEditor,
  NButton,
  NInputGroup,
  NInput,
  NForm,
  NFormItem,
  NTree,
  NSpace,
  NPopconfirm,
  useMessage,
  NDropdown,
  NSpin,
  NUpload,

} from 'naive-ui'
import {
  default as NwTable,
  NwTableFun,
} from "/@/components/nw-table/index.vue";
import { rightList, creatOrg } from '../organization-manage/api'
import {
  empList,
  setMasterPost,
  setAndPost,
  del,
  setAndDuty,
  setMasterDuty,
  syncGuFenUserAndMasterPostIncrement,
  exportUser
} from './api'
import AddEmp from './empAdd.vue'
import EditAction from './editAction.vue'
import UnitMobilize from './unitMobilize.vue'
import SetPassWord from './setPassWord.vue'
import NwIcon from '/@/components/nw-icon/index.vue'
import SortAction from './sortAction.vue'
import CurrentSort from './currentSort.vue'
import Setting from "/setting.js"
import PostPickModal from '../../components/postPickModal/postPickModal.vue'
import DutyPickModal from '../../components/dutyPickModal/dutyPickModal.vue'
import VersionAction from './versionAction.vue'
import cookies from "/@/utils/cookies.js";

export default defineComponent({
  components: {
    NDrawer,
    NPopconfirm,
    NDrawerContent,
    NwTable,
    NButton,
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NInputGroup,
    NwTableFun,
    NForm,
    NLayoutSider,
    NFormItem,
    NInput,
    NTree,
    NSpace,
    AddEmp,
    EditAction,
    PostPickModal,
    UnitMobilize,
    SetPassWord,
    NDropdown,
    NwIcon,
    NSpin,
    DutyPickModal,
    SortAction,
    CurrentSort,
    VersionAction,
    NUpload,

  },
  setup() {
    window.$message = useMessage()
    const message = useMessage();
    const nwTable = ref(null)
    const pattern = ref('')
    const editAction = ref();
    const unitMobilize = ref()
    const setPassWord = ref()
    const sortAction = ref()
    const currentSort = ref()
    const token = cookies.get("token");
    const tokenType = cookies.get("tokenType");
    const tree = reactive({
      treeList: [], //原始数据

    })
    const addEmp = ref();
    const postPickModal = ref()
    const isLoading = ref(false)
    const isTableLoading = ref(false)

    const postPick = ref()
    const dutyPick = ref()
    const dutyPickModal = ref()
    const loading = ref(false)
    const show = (e) => {
      addEmp.value.sonFn(e);
    };
    const handleFinish = () => {
      let { code, data, msg } = JSON.parse(event.target.response);
      if (code == 200) {
        message.success("导入成功");
        nwTable.value.commitQuery()
      } else {
        message.error(msg);
      }
      loading.value = false;
    };
    const handleError = () => {
      loading.value = false;
      let { code, data, msg } = JSON.parse(event.target.response);
      console.log(code, data, msg);
      message.error(msg);
    };
    const beforeUpload = () => {
      showLoading()
    };
    const showLoading = () => {
      message.success("正在导入");
      loading.value = true;
    }
    const handChange = ({ file, fileList }) => {
      // model.files = fileList;
    };
    const synchrodata = () => {
      syncGuFenUserAndMasterPostIncrement({}).then(res => {
        message.success("同步成功");
      }).catcg(e => {
        message.error("同步失败");
      })
    }
    const showUnitMobilize = (row) => {
      unitMobilize.value.sonFn(row);
    }
    const showSetPassWord = (row) => {
      setPassWord.value.sonFn(row);
    }
    const showDutyPickModal = (row) => {
      dutyPickModal.value.sonFn(row);
    }
    const showDutyPick = (row) => {
      dutyPick.value.sonFn(row);
    }
    const showPostPickModal = (row) => {
      postPickModal.value.sonFn(row);
    }
    const showPostPick = (row) => {
      postPick.value.sonFn(row);
    }
    const showEditAction = (e) => {
      editAction.value.sonFn(e);
    }
    const showVersionAction = (data) => {
      versionAction.value.sonFn(data)
    }
    const versionAction = ref()
    const renderPrefix = ({ option }) => {
      return h(
        NwIcon,
        { name: option.orgType == 1 ? "icon-zuzhijigou2" : "icon-bumen1" },

      )
    }
    const renderLabel = ({ option }) => {
      return h(
        NButton,
        { text: true, type: 'primary', },
        { default: () => `${option.label}` }
      )
    }
    const getTreeList = () => {
      isLoading.value = true
      rightList({ isDefault: 0, status: 1, }).then((res) => {

        const getStr = (list) => {
          list.forEach((row) => {
            row.level = row.level + 1
            if (row.kids.length > 0) {
              row.label = row.orgName
              row.key = row.id
              row.children = row.kids
              getStr(row.kids)
            } else {
              row.label = row.orgName
              row.key = row.id
            }
          })
        }
        getStr(res)
        tree.treeList = res
        isLoading.value = false
      })
    }
    const handleSelect = (key, row) => {
      switch (key) {
        case "showSetPassWord":
          showSetPassWord(row)
          break;
        case "showPostPickModal":
          showPostPickModal({ ...row, userId: row.id })
          break;
        case "showDutyPickModal":
          showDutyPickModal({ ...row, userId: row.id })
          break;
        case "showDutyPick":
          showDutyPick({ ...row, userId: row.id })
          break;
        case "showPostPick":
          showPostPick({ ...row, userId: row.id })
          break;
        case "showUnitMobilize1":
          showUnitMobilize({ ...row, isDept: true })
          break;
        case "showUnitMobilize":
          showUnitMobilize({ ...row, isDept: false })
          break;
        case "currentSort":
          currentSort.value.sonFn({ ...row, })
          break;
        default:
          break;
      }
    }
    const dropdownOptions = [
      // {
      //   label: '重设密码',
      //   key: 'showSetPassWord',
      // },
      {
        label: '调岗',
        key: "showPostPickModal"
      },
      {
        label: '调职',
        key: "showDutyPickModal"
      },
      {
        label: '兼岗',
        key: "showPostPick"
      },
      {
        label: '兼职',
        key: "showDutyPick"
      },
      {
        label: '部门调动',
        key: "showUnitMobilize1"
      },
      {
        label: '单位调动',
        key: "showUnitMobilize"
      },
      {
        label: '部门人员排序',
        key: "currentSort"
      },
    ]
    onMounted(async () => {
      getTreeList()
    })
    const uploadDeptId = ref("0")
    const showUpload = ref(true)
    const orgType = ref(1)
    const filterTableMater = (id, arr) => {
      for (const item of arr) {
        if (item.id === id) return item
        if (item.kids && item.kids.length) {
          const _item = filterTableMater(id, item.kids)
          if (_item) return _item
        }
      }
    }
    const deptChange = (e) => {
      if (e[0]) {
        orgType.value = filterTableMater(e[0], tree.treeList).orgType
        request.params.parentOrgId = e[0];
        uploadDeptId.value = e[0]
        showUpload.value = false
        setTimeout(() => {
          showUpload.value = true
        }, 1);
        nwTable.value.commitQuery();
      }
    }
    const request = reactive({
      XHR: empList,
      params: { parentOrgId: 0 },
      pageMethod: (current, size) => ({ // 分页
        page: {
          current,
          size
        }
      }),
    })
    return {
      uploadDeptId,
      showUpload,
      deptChange,
      uploadUrl: `${Setting.apiBaseURL}/main/mdmUser/import`,
      Setting,
      orgType,
      token,
      handleFinish,
      handleError,
      loading,
      beforeUpload,
      handChange,
      showLoading,
      tokenType,
      versionAction,
      showVersionAction,
      currentSort,
      synchrodata,
      formVisible: ref(false),
      renderPrefix,
      sortAction,
      isLoading,
      isTableLoading,
      renderLabel,
      setPassWord,
      getTreeList,
      editAction, showEditAction,
      addEmp, showSetPassWord,
      showPostPick, postPickModal,
      showPostPickModal, postPick,
      dutyPick, dutyPickModal,
      showDutyPickModal, showDutyPick,
      show,
      showUnitMobilize,
      unitMobilize,
      nwTable,
      request,
      response: {
        dataMethod: res => res.records,
        pageMethod: ({ total }) => (total)
      },
      pattern,
      defaultExpandedKeys: ref(["0"]),
      tree, //左侧树
      columns: reactive([
        { type: 'checkbox', width: 35, },
        {
          field: 'userNameCh', title: '人员名称', width: 100,
          slots: {
            default: ({ row }) => {
              return [
                <span>
                  <a style="color:#2d8cf0;cursor: pointer;" onClick={(e) => {
                    showEditAction(row)
                  }
                  }>{row.userNameCh}</a>
                </span>,
              ];
            },
          }

        },
        { field: 'userName', title: '账户名称', showHeaderOverflow: true, width: 150 },
        { field: 'parentOrgName', title: '所属单位', showHeaderOverflow: true, width: 250 },
        { field: 'parentDeptName', title: '所属部门', showHeaderOverflow: true, width: 200 },
        { field: 'idCard', title: '证件号', showOverflow: true, width: 200 },
        { field: 'postName', title: '主岗', showOverflow: true, width: 200 },

        {
          field: 'sex', title: '性别', showOverflow: true, width: 80,
          slots: {
            default: ({ row }) => {
              return [
                <span>
                  {row.sex == 1 ? '男' : '女'}
                </span>,
              ];
            },
          }

        },
        {
          field: "status", title: "启用状态", showHeaderOverflow: true, showOverflow: true,
          slots: {
            default: ({ row }) => {
              return [
                <span>
                  {row.status == 1 ? '启用' : '禁用'}
                </span>,
              ];
            },
          }
        },
        //   {
        //   field: '',
        //   title: '操作',
        //   showHeaderOverflow: true,
        //   slots: {
        //     default: ({row}) => {
        //       return [
        //         <span>
        //           <a style="color:#2d8cf0;cursor: pointer;" onClick={(e)=>{showSetPassWord(row)}}>{"重设密码"}</a>
        //           <a style="color:#2d8cf0;cursor: pointer;margin-left:5px" onClick={(e)=>{showPostPickModal({...row,userId:row.id})}}>{"调岗"}</a>
        //           <a style="color:#2d8cf0;cursor: pointer;margin-left:5px" onClick={(e)=>{showPostPick({...row,userId:row.id})}}>{"兼岗"}</a>
        //            <a style="color:#2d8cf0;cursor: pointer;margin-left:5px" onClick={(e)=>{showUnitMobilize({...row,isDept:true})}}>{"部门调动"}</a>
        //             <a style="color:#2d8cf0;cursor: pointer;margin-left:5px" onClick={(e)=>{showUnitMobilize({...row,isDept:false})}}>{"单位调动"}</a>
        //         </span>,
        //       ];
        //     },
        //   }
        // },
        {
          field: '',
          width: 200,
          title: '操作',
          showHeaderOverflow: true,
          slots: {
            default: ({ row }) => {
              return [
                <div>
                  <a style="color:#2d8cf0;cursor: pointer;" onClick={(e) => { showSetPassWord(row) }}>{"重设密码"}</a>
                  <a style="color:#2d8cf0;cursor: pointer;display:inline-block;margin-left:10px" onClick={(e) => { showVersionAction(row) }}>{"历史"}</a>
                  <NDropdown onSelect={(key) => handleSelect(key, row)} trigger={"hover"} showArrow={true} options={dropdownOptions}>
                    <NButton type="text" style="color:#2d8cf0;cursor: pointer;">...</NButton>
                  </NDropdown>
                </div>

              ];
            },
          }
        },
      ]),

    }

  },

  methods: {
    callbackPostPick(e) {
      setMasterPost({ ...e, }).then((res) => {
        if (res) {
          this.$refs.postPickModal.showModal = false
          this.$refs.nwTable.commitQuery()
          setTimeout(() => {
            window.$message.success("设置成功");
          }, 1)
        } else {
          setTimeout(() => {
            window.$message.error("设置失败");
          }, 1)
        }
      })
    },
    callbackdutyPick(e) {
      setMasterDuty({ ...e, dutyIds: e.dutyId }).then((res) => {
        if (res) {
          this.$refs.dutyPickModal.showModal = false
          this.$refs.nwTable.commitQuery()
          setTimeout(() => {
            window.$message.success("设置成功");
          }, 1)
        } else {
          setTimeout(() => {
            window.$message.error("设置失败");
          }, 1)
        }

      })
    },
    partPostPick(e) {
      setAndPost(e).then((res) => {
        if (res) {
          this.$refs.postPickModal.showModal = false
          this.$refs.nwTable.commitQuery()
          setTimeout(() => {
            window.$message.success("设置成功");
          }, 1)
        } else {
          setTimeout(() => {
            window.$message.error("设置失败");
          }, 1)
        }

      })
    },
    partDutyPick(e) {
      setAndDuty(e).then((res) => {
        if (res) {
          this.$refs.postPickModal.showModal = false
          this.$refs.nwTable.commitQuery()
          setTimeout(() => {
            window.$message.success("设置成功");
          }, 1)
        } else {
          setTimeout(() => {
            window.$message.error("设置失败");
          }, 1)
        }

      })
    },
    handDel(selected) {
      let id = selected.map(d => d.id).join(',')
      del(id).then(res => {
        if (res) {
          this.$refs.nwTable.commitQuery()
          setTimeout(() => {
            window.$message.success("删除成功");
          }, 1)
        } else {
          setTimeout(() => {
            window.$message.error("删除失败");
          }, 1)
        }


      })
    },

    exportFile() {
      this.isTableLoading = true
      exportUser().then(r => {
        this.isTableLoading = false
      })
    }
  },
  mounted() {
    this.$nextTick(() => { })
  }
})
</script>
<style lang='less'>
.treeH {
  height: calc(~"100% - 50px");
}
</style>