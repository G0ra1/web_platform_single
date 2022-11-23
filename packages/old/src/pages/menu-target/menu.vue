<template>
  <div class="main-layout" >
    <n-spin :show="isloading"  style="display:block; height: 100vh">
      <n-layout position="absolute">
        <!-- <n-layout-header
          bordered
          class="main-layout-header"
        >
          <n-layout has-sider >
            <n-layout-content class="header-title" >
              {{title}}
            </n-layout-content>
          </n-layout>
        </n-layout-header> -->
        <n-layout
          has-sider
          class="main-layout-body"
          
        >
          <n-layout-sider bordered>
            <div style="display:flex;align-items: center;text-indent: 10px;font-size: 16px;font-weight: bold;height: 40px;">
              {{title}}
            </div>
            <div class="menu-level-2" >
              <div
              v-for="item in menuLevel2"
              :key="item.id"
              
              :class="{
                'menu-level-2-item': true,
                'action': item.id === menuLevel2Action.id
              }
              "
              @click="handleMenuLevel2(item)"
              >
                <nw-icon :size="20" :name="item.icon" />{{item.resourceName}}
              </div>
            </div>
          </n-layout-sider>
          <n-layout-content
            v-if="menuLevel2Action && menuLevel2Action.openWay === '2'"
            class="app-area"
            :native-scrollbar="false"
            style="height:100%"
            :content-style="{
              height: '100%'
            }"
          >
            <iframe
            style="border: none;width: 100%;height: 100%"
            :src="makeMenuUrl(menuLevel2Action.resourceUrl, menuLevel2Action.id)"
            />
          </n-layout-content>
          <n-layout-content
            v-if="menuLevel2Action && menuLevel2Action.openWay === '1'"
            class="app-area"
            :native-scrollbar="false"
          >
            <div class="app-area-group" v-if="pageLevel3.length" >
              <ul class="app-area-ul">
                <li
                  v-for="item in pageLevel3"
                  :key="item.resourceCode"
                  @click="handleRes(item)"
                >
                  <nw-icon
                    :name="item.icon"
                    :size="58"
                  />
                  <span>{{item.resourceName}}</span>
                </li>
              </ul>
            </div>
            <div class="app-area-group" v-for="item in menuLevel3" :key="item.resourceCode" >
              <n-h6 prefix="bar" align-text>
                {{item.resourceName}}
              </n-h6>
              <ul class="app-area-ul">
                <li
                  v-for="box in getLevel4Page(item.id)"
                  :key="box.resourceCode"
                  @click="handleRes(box)"
                >
                  <nw-icon
                    :name="box.icon"
                    :size="58"
                  />
                  <span>{{box.resourceName}}</span>
                </li>
              </ul>
            </div>
          </n-layout-content>
        </n-layout>
      </n-layout>
    </n-spin>
  </div>
</template>

<script>
  import { defineComponent, ref, reactive, watch } from 'vue'
  import {
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NLayoutFooter,
    NMessageProvider,
    NNotificationProvider,
    NConfigProvider,
    NSpin,
    NInput,
    NInputGroup,
    NButton,
    NList,
    NListItem,
    NSelect,
    NH6,
    NSpace
  } from 'naive-ui'
  import { useRoute, useRouter } from 'vue-router'
  import NwIcon from '/@/components/nw-icon/index.vue'
  import {
    getAuthSys,
    getAuthRes
  } from '../work/api'
import { getAuthMenu } from '/@/api'
import { redirectMenu, makeMenuUrl } from '/@/utils'

  export default defineComponent({
    components: {
      NLayout,
      NLayoutHeader,
      NLayoutSider,
      NLayoutContent,
      NLayoutFooter,
      NMessageProvider,
      NNotificationProvider,
      NConfigProvider,
      NSpin,
      NInput,
      NInputGroup,
      NButton,
      NwIcon,
      NList,
      NListItem,
      NSelect,
      NH6,
      NSpace
    },
    setup () {
      const router = useRouter()
      const route = useRoute()
      const active = ref({}) // 当前选择的子系统

      const isloading = ref(false)
      watch(route, () => {
        route.params.menuId && loadMenu()
      })
      // 
      const title = ref('')
      const menuAll = ref([])
      // 二级菜单
      const menuLevel2 = ref([])
      // 当前触发的二级菜单
      const menuLevel2Action = ref(null)

      // 三级菜单
      const pageLevel3 = ref([])
      const menuLevel3 = ref([])

      // --------以下为旧的--------
      // 没有子类的功能项
      const funLevel2 = ref([])
      // 二级分类
      const groupLevel2 = ref([])
      // 三级功能
      const funLevel3 = reactive({})
      const loadMenu = () => {
        // 这里获取
        isloading.value = true
        getAuthMenu().then(res => {
          menuAll.value = res
          // res 是全部 扁平数据
          console.log('======menu res=======', res)
          const self = res.find(d => d.id === route.params.menuId)
          title.value = self ? self.resourceName : ''
          const allSonMenu = menuLevel2.value = res.filter(d => d.parentId === route.params.menuId)
          if (menuLevel2.value.length) {
            menuLevel2Action.value = {
              id: menuLevel2.value[0].id,
              openWay: menuLevel2.value[0].openWay,
              resourceUrl: menuLevel2.value[0].resourceUrl
            }
            queryMenuLevel3(menuLevel2Action.value.id)
          }
          //
          // 过滤功能项
          funLevel2.value = allSonMenu.filter(d => d.openWay !== '1')

          // 过滤出 二级的菜单分类
          groupLevel2.value = allSonMenu.filter(d => d.openWay === '1')
          // 分类三级功能项
          groupLevel2.value.forEach(d => {
            funLevel3[d.id] = res.filter(s => {
              return s.parentId === d.id
            })
          })
        }).finally(() => {
          isloading.value = false
        })
      }
      const queryMenuLevel3 = (id) => {
        pageLevel3.value = menuAll.value.filter(d => d.parentId === id && (['2', '3', '4'].includes(d.openWay)))
        menuLevel3.value = menuAll.value.filter(d => d.parentId === id && d.openWay === '1')
        
      }
      loadMenu()
      return {
        menuLevel2,
        menuLevel2Action,
        pageLevel3,
        menuLevel3,

        loadMenu,
        isloading,
        title,
        funLevel2,
        groupLevel2,
        funLevel3,
        active,

        handleRes (item) {
          // window.open(item.resourceUrl, '_blank')

          redirectMenu(item, router)
        },
        // 点击二级菜单
        handleMenuLevel2 (item) {
          console.log(item)
          menuLevel2Action.value = {
            id: item.id,
            openWay: item.openWay,
            resourceUrl: item.resourceUrl
          }
          if (item.openWay === '1') queryMenuLevel3(item.id)
        },
        // 根据三级菜单获取四级
        getLevel4Page (id) {
          return menuAll.value.filter(d => d.parentId === id && (['2', '3', '4'].includes(d.openWay)))
        },
        makeMenuUrl
      }
    }
  })
</script>
<style lang='less'>
.app-list {
  &.n-list {
    >.n-list-item {
      padding: 12px 25px;
      cursor: pointer;
      //#4e97ff
      &.active {
        background:#3f8fff;
        color: #fff;
        >.n-list-item__prefix {
          color: #fff
        }
      }
      >.n-list-item__prefix {
        display: flex;
        justify-content: center;
        color: #4e97ff
      }
    }
  }
}
.app-area {
  &-group {
    padding: 20px;
  }
  &-ul {
    li{
      // float: left;
      width: 184px;
      height: 72px;
      line-height: 72px;
      display: inline-flex;
      cursor: pointer;
      // padding-left: 12px;
      // margin-right: 16px;
      margin-bottom: 24px;
      overflow: hidden;
      span {
        display: inline-block;
        width: 60%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-left: 10px;
      }
    }
  }
}
.menu-level-2 {
  
  &-item {
    display: flex;
    cursor: pointer;
    align-items: center;
    
    padding: 10px 0 10px 20px;
    font-size: 14px;
    >.icon {
      margin-right: 8px;
    }
    &.action {
      background: #bbdefb;
    }
  }
  &-item:hover {
    background: #bbdefb;
  }

}
</style>