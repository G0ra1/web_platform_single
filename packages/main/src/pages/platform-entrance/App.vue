<template>
  <n-layout class="platform-entrance nw-layout-full">
    <n-layout-header>
      <h2>应用系统</h2>
    </n-layout-header>
    <n-layout has-sider ref="ContentRef">
      
      <n-layout-content style="padding: 0 0 0 40px;height: 100%;" :native-scrollbar="false">
        <template  v-for="group in GroupData" :key="group.id">
          <n-divider title-placement="left" :id="group.id" style="margin: 15px 0 0 0">
            <span class="divider-title" style="font-size:18px;font-weight: bold;">{{ group.label }}</span>
          </n-divider>
          <n-grid :x-gap="30" :y-gap="20" :cols="3" >
            <n-gi
              v-for="level2 in group.children"
              :key="level2.id"
            >
              <template v-if="level2.url">
                <h3 class="title">
                  <a @click="handle(level2)" href="javascript:void(0)">{{ level2.label }}</a>
                </h3>
              </template>
              <template v-else>
              <div
              class="platform-entrance-card"
              >
                <h3 class="title">
                  {{ level2.label }}
                </h3>
                <div class="menus">
                  <div
                  v-for="item in level2.children"
                  :key="item.id"
                  :class="{
                    menu: true,
                    active: Favorites.includes(item.url)
                  }"
                  
                  >
                    <div class="menu-text">
                      <!-- <nw-icon :name="item.icon"  :size="25" /> -->
                      <a @click="handle(item)" href="javascript:void(0)">{{ item.label }}</a>
                    </div>
                    <nw-icon
                    class="menu-shoucang"
                    name="icon-n-n-shoucang"
                    :size="20"
                    style="cursor: pointer"
                    @click="handleShoucang(item)"
                    />
                  </div>
                </div>
              </div>
              </template>
            </n-gi>
          
          </n-grid>
        </template>
      </n-layout-content>
      <n-layout-sider width="120">
        <n-anchor :offset-target="ContentRef && ContentRef.$el" >

          <n-anchor-link
          v-for="group in GroupData" :key="group.id"
          :title="group.label"
          :href="`#${group.id}`"
          
          />
        </n-anchor>
      </n-layout-sider>
    </n-layout>
  </n-layout>
</template>

<script lang="tsx">
import { ref, reactive, defineComponent, nextTick, h ,onMounted} from 'vue'

import {
  NLayout,
  NLayoutSider,
  NLayoutHeader,
  NLayoutContent,
  NGrid,
  NGi,
  NButton,
  NSpace,
  NTag,
  NInput,
  NInputGroup,
  NDrawer,
  NDrawerContent,
  NAnchor,
  NAnchorLink,
  NDivider,
  useDialog
} from 'naive-ui'
import { NwIcon, RequestPaging, VxeHelper, request, NwAppTreeGrid, Page } from '@platform/main'
import { GroupData } from './store'
// 链接新增
function create(data: any) {
    return request({
        url: `/portal/favoritesContent`,
        method: 'post',
        data
    })
}
// 

function query() {
    return request({
        url: `/portal/favoritesType/getDefault`,
        method: 'get'
    })
}

// 删除

function del(url: string) {
    return request({
        url: `/portal/favoritesContent/deleteByUrl?url=${url}`,
        method: 'get'
    })
}
export default defineComponent({
  components: {
    NLayout,
    NLayoutSider,
    NLayoutHeader,
    NLayoutContent,
    NGrid,
    NGi,
    NButton,
    NSpace,
    NwIcon,
    NTag,
    NInput,
    NInputGroup,
    NDrawer,
    NDrawerContent,
    NwAppTreeGrid,
    NAnchor,
    NAnchorLink,
    NDivider,
  },
  setup() {
    // 已选
    const Favorites = ref<any>([])

    const ContentRef = ref()
    // nextTick().then(() => {
    //   console.log('====ContentRef===', ContentRef)
    // })

    const queryFavorites = () => {
      query().then((res: any) => {
        Favorites.value = res[0].portalFavoritesContentVos ? res[0].portalFavoritesContentVos.map((d: any) => d.webUrl) : []
      })
    }
    queryFavorites();
    return {
      Favorites,
      ContentRef,
      GroupData: ref(GroupData),
      handle (item: any) {
        window.open(`${item.url}?token=${window.localStorage.getItem('ssologin')}`)
      },
      async handleShoucang (item: any) {
        if (Favorites.value.includes(item.url)) {
          // 取消
          await del(item.url).then(() => {
          })
          
          queryFavorites();
        } else {
          if (!item.url) {
            return;
          }
          await create({
              "articleName": item.label,
              "webUrl": item.url
          }).then(() => {
          })
          
          queryFavorites();
        }
      }
    }
  }
})

</script>

<style scoped lang="less">
.platform-entrance {
  .n-layout-header {
    > h2 {
      text-indent: 15px;;
    }
  }
}
.divider-title {
  color: var(--n-blue2)
}
.platform-entrance-card {
  >.title {
    // text-align: center;
    font-size: 16px;
    color: var(--n-blue3);
    padding: 0 5px;
    margin: 15px 0 0px 0
  }
  >.menus {
    >.menu {
      &.active {
        >.menu-shoucang {
          display: block;
          color: var(--n-orange5);
        }
      }
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 5px;
      >.menu-icon {
        
      }
      >.menu-text {
        display: flex;
        align-items: center;
        padding: 0 0px;
        // width: 150px;
        font-size: 14px;
        font-weight: bold;
        > a {
          color: var(--gray2)
          
        }
        >.icon {
          margin-right: 10px;
        }
      }
      >.menu-shoucang {
        display: none;
      }
      
      &:hover {
        background-color: var(--primary-color);
        color: #fff;
        >.menu-text a {
          color: #fff;
        }
        >.menu-shoucang {
          display: block;
        }
      }
    }
  }
}
</style>
