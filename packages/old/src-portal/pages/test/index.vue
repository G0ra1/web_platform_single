<template>
<n-config-provider :theme-overrides="portalTheme">
  <n-layout class="portal-layout" >
    <n-layout-header class="portal-layout-header" >
      <div
        class="portal-layout-header-banner"
        style="background: url(/assets/image/banner.png);height: 130px"
      />
      <div class="portal-layout-header-menu">
        <div class="portal-layout-header-menu-nav">
          <div class="portal-layout-header-menu-nav-item active">
            首页
          </div>
          <div class="portal-layout-header-menu-nav-item">
            企业新闻
          </div>
        </div>
      </div>
    </n-layout-header>
    <n-layout-content class="portal-layout-content">
      <n-grid x-gap="12" :cols="24">
        <n-gi span="6">
          <!-- 这里创建每种类型的栏目 -->
          <n-card class="portal-panel" :bordered="false" size="small">
            <template #header>
              通知
            </template>
            <n-list>
              <n-list-item>
                新闻新闻新闻新闻1
              </n-list-item>
              <n-list-item>
                新闻新闻新闻新闻1
              </n-list-item>
              <n-list-item>
                新闻新闻新闻新闻1
              </n-list-item>
            </n-list>
          </n-card>
        </n-gi>
        <n-gi span="12">
          <n-carousel show-arrow>
            <!-- <div class="carousel-img" style="width: 1000px; height: 240px;background:red">
              这是自定义
            </div> -->
            <img
              class="carousel-img"
              src="https://s.anw.red/fav/1623979004.jpg!/fw/600/quality/77/ignore-error/true"
            />
            <img
              class="carousel-img"
              src="https://s.anw.red/news/1623372884.jpg!/both/800x450/quality/78/progressive/true/ignore-error/true"
            />
            <img
              class="carousel-img"
              src="https://s.anw.red/news/1623177220.jpg!/both/800x450/quality/78/progressive/true/ignore-error/true"
            />
            <img
              class="carousel-img"
              src="https://s.anw.red/news/1623152423.jpg!/both/800x450/quality/78/progressive/true/ignore-error/true"
            />
          </n-carousel>
        </n-gi>
        <n-gi span="6">
          <!-- 这里创建每种类型的栏目 -->
          <n-card class="portal-panel" :bordered="false" size="small">
            <template #header>
              我的应用
            </template>
            <n-grid style="padding: 10px 0; " :x-gap="12" :y-gap="18" :cols="4">
              <n-gi>
                <nw-tile
                  icon="icon-jigou"
                  :size="32"
                  label="机构管理"
                />
              </n-gi>
              <n-gi>
                <nw-tile
                  icon="icon-shujuyuan"
                  :size="32"
                  label="数据源管理"
                />
              </n-gi>
              <n-gi>
                <nw-tile
                  icon="icon-lizixitong"
                  :size="32"
                  label="子系统管理"
                />
              </n-gi>
              <n-gi>
                <nw-tile
                  icon="icon-ziyuan"
                  :size="32"
                  label="资源管理"
                />
              </n-gi>
              <n-gi>
                <div class="light-green"></div>
              </n-gi>
              <n-gi>
                <div class="green"></div>
              </n-gi>
            </n-grid>
          </n-card>
        </n-gi>
      </n-grid>
      <n-grid x-gap="12" :cols="12">
        <n-gi span="12">
          <n-card class="portal-panel" :bordered="false" size="small">
            <template #header>
              图片新闻
            </template>
            <n-layout>
              
            </n-layout>
          </n-card>
        </n-gi>
      </n-grid>
      <!-- 轮播 -->
      
      
    </n-layout-content>
    <n-layout-footer class="portal-layout-footer">
      页脚
    </n-layout-footer>
  </n-layout>
</n-config-provider>
</template>
<script>
export default {
setup (props, context) {
  console.log(props, context);
  return {
    portalTheme: {
      Tabs: {
        tabPaddingSmallCard: '5px'
      },
      // 卡片
      Card: {
        paddingSmall: '5px',
        titleFontSizeSmall: '14px',
        titleFontWeight: '700',
        titleTextColor: '#1277d1',
        fontSizeSmall: '12px',
        color: '#fbfbfa'
        // #fbfbfa
      },
      List: {
        fontSize: '12px',
        borderColor: '#fff'
      }
    }
  }
}
}
</script>
<style lang="less">
.portal-layout {
  &-header {
    // /assets/image/banner.png
    &-banner {
      
    }
    .n-tab-pane {
      display: none;
    }
    &-menu {
      background: #f7f7f4;
      border-bottom: 1px solid #ccc;
      &-nav {
        position: relative;
        bottom: -1px;
        width: 1000px;
        margin: 0 auto;
        display: flex;
        &-item {
          display: inline-flex;
          padding: 4px 0;
          width: 100px;
          justify-content: center;
          font-size: 14px;
          &.active {
            // border-top: 1px solid #ccc;
            border-left: 1px solid #ccc;
            border-right: 1px solid #ccc;
            border-bottom: 1px solid #fff;
            background: #fff;
          }
        }
      }
    } 
  }
  &-content {
    background: #fff;
    height: 2000px;
    width: 1000px;
    margin: 10px auto;

    // 栏目样式
    .portal-panel {
      height: 100%;
      &.n-card {
        >.n-card-header {
          border-bottom: 1px solid #e8e5db;
          background: #fff;
          >.n-card-header__main {
            border-left: 4px solid var(--title-text-color);
            padding-left: 8px;
          }
        }
        >.n-card__content {
          >.n-list {
            margin: 0;
            >.n-list-item {
              padding: 4px
            }
          }
        }
      }

    }
    // 轮播
    .carousel-img {
      width: 100%;
      height: 240px;
      object-fit: cover;
    }
  }
  &-footer {
    color: red
  }
}
</style>