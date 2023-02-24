<template>
  <n-layout class="nw-layout-full">
    <n-layout-header>
      <n-space :size="5" style="padding: 0 5px">
        <n-popconfirm @positive-click="handClear()" positive-text="确定" negative-text="取消">
          <template #trigger>
            <n-button type="error" size="small">清空</n-button>
          </template>
          {{ `是否确定清空数据` }}
        </n-popconfirm>
        <!-- <n-popconfirm @positive-click="handDel()" positive-text="确定" negative-text="取消">
          <template #trigger>
            <n-button type="error" style="margin-left: 15px" size="small">删除
            </n-button>
          </template>
          {{ `是否确定删除此条数据` }}
        </n-popconfirm> -->
      </n-space>
      <n-space :size="5" style="padding: 0 5px">
      </n-space>

    </n-layout-header>
    <n-layout-content class="nw-layout-full">
      <NwTable ref="nwTable" :columns="columns" :data="null" :request="request" :response="response" :searchFormFields="[
        {
          field: 'roleName',
          title: 'name',
          valueFormat: (d) => d,
        },
      ]">
        <template v-slot:search-form="{ searchFormData }">
          <n-form :model="searchFormData">
            <n-form-item label="子系统" path="bizSysCodes">
              <nw-dictionary :request="{ XHR: dictItemLists, params: 'APP_NAME' }"
                v-model:value="searchFormData.bizSysCodesList" @update:value="
                  (value) => {
                    searchFormData.bizSysCodes = value.join(',');
                  }
                " multiple :response="{
  dataMethod: (res) =>
    res.map(({ dictItemCode: value, dictItemName: label }) => ({
      label,
      value,
    })),
}" />
            </n-form-item>
            <n-form-item label="任务名称" path="jobName">
              <n-input placeholder="请输入任务名称" v-model:value="searchFormData.jobName" />
            </n-form-item>
            <n-form-item label="任务组名" path="jobGroup">
              <n-select v-model:value="searchFormData.jobGroup" :options="[
                { label: '默认', value: 'DEFAULT' },
                { label: '系统', value: 'SYSTEM' },
              ]" />
            </n-form-item>
            <n-form-item label="任务状态" path="status">
              <n-select v-model:value="searchFormData.status" :options="[
                { label: '正常', value: 0 },
                { label: '暂停', value: 1 },
              ]" />
            </n-form-item>
          </n-form>
        </template>
      </NwTable>
    </n-layout-content>
  </n-layout>
  <n-drawer :show="formVisible" width="100%" :height="200" placement="right" :to="$refs.page && $refs.page.$el">
    <n-drawer-content :title="contentTile" :header-style="{
      padding: '10px',
      'font-size': '16px',
      'font-weight': 'bold',
    }" :footer-style="{
  padding: '10px',
}">
      <template #footer>
        <n-button style="margin-right: 5px" size="small" @click="formVisible = false">取消</n-button>
        <n-button type="info" size="small" @click="handleSave">保存</n-button>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script lang='jsx'>
import { h, defineComponent, ref, reactive, getCurrentInstance, nextTick, onMounted } from "vue";
import {
  NDrawer,
  NDrawerContent,
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NLayoutFooter,
  NThemeEditor,
  NButton,
  NInputGroup,
  NInput,
  NForm,
  NFormItem,
  NPopconfirm,
  NSelect,
  useMessage,
  useDialog,
  NDropdown,
  NSpace
} from "naive-ui";
import {
  NwTable,
} from '@platform/main'
import { list, del, jobLogClean, dictItemLists } from "./api";
export default defineComponent({
  components: {
    NDrawer,
    NDrawerContent,
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NLayoutFooter,
    NThemeEditor,
    NButton,
    NInputGroup,
    NInput,
    NForm,
    NFormItem,
    NPopconfirm,
    NwTable,
    NSelect,
    NDropdown,
    NSpace
  },
  setup() {
    const nwTable = ref(null);
    const message = useMessage();
    const dialog = useDialog();
    const formVisible = ref(false);
    const model = reactive({})
    const Form = ref(null)
    const contentTile = ref('新建')
    // const {proxy} = getCurrentInstance()
    const handDel = (selected) => {
      let ids = selected.map(d => d.id).join(',')
      del(ids).then(res => {
        message.success('删除')
        nwTable.value.commitQuery()
        nwTable.value.clearSelected()
      })
    }
    const handClear = () => {
      jobLogClean(htmlQuery.jobId || '').then(res => {
        message.success('清空成功')
        nwTable.value.commitQuery()
      })
    }
    const getHtmlQuery = () => {
      let _location = window.parent.location
      if (!_location.search.split("?")[1]) return {}
      try {
        let m = {}
        _location.search.split("?")[1].split('&').forEach(e => {
          m[e.split('=')[0]] = e.split('=')[1]
        });
        return m
      } catch (error) {
        console.log(error)
        return {}
      }
    }
    const htmlQuery = getHtmlQuery()
    onMounted(() => {
      console.log(htmlQuery.value, 'onMountedonMountedonMounted')
      console.log(getHtmlQuery(), 'onMountedonMountedonMounted')
    })

    return {
      message,
      contentTile,
      getHtmlQuery,
      htmlQuery,
      formVisible,
      formValue: {},
      dictItemLists,
      Form,
      handDel,
      handClear,
      model,
      request: {
        XHR: list, // promise 请求函数
        params: { jobId: htmlQuery.jobId },
        pageMethod: (current, size) => ({
          // 分页
          page: {
            current,
            size
          }
        }),
      },
      // 接口相应
      response: {
        dataMethod: (res) => res.records,
        pageMethod: ({ total }) => total,
      },
      nwTable,
      columns: reactive([
        { type: 'checkbox', width: 35 },
        { type: "seq", width: 40 },
        { field: "bizSysCode", title: "子系统" },
        { field: "jobName", title: "任务名称", showOverflow: true },
        { field: "invokeTarget", title: "调用目标字符串", showOverflow: true },
        { field: "jobMessage", title: "日志信息", showOverflow: true },
        {
          field: "status", title: "执行状态", showOverflow: true, slots: {
            default: ({ row }) => {
              return [
                <span>{row.status == 0 ? "正常" : "失败"}</span>,
              ];
            },
          }
        },
        { field: "startTime", title: "开始日期", showOverflow: true },
        { field: "endTime", title: "结束日期", showOverflow: true },

        {
          fielf: '', title: '操作', showOverflow: true, slots: {
            default: ({ row }) => {
              return [
                <a style="color:#2d8cf0;cursor: pointer;" onClick={(e) => { window.open(`/html/mdm/log-current.html?appName=${row.bizSysCode}&startCreateTime=${row.startTime}&endCreateTime=${row.endTime}`) }}>{"查看日志监控"}</a>
              ]
            }
          }
        }

      ]),
    };
  },
  created() {

  },
  methods: {
    show() {
      this.$refs.nwTable.toggleSearchForm();
    },
  },
});
</script>