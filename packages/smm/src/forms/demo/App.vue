<template>
  <div style="height: 200px; padding-left: 200px">
    <n-anchor
      ref="anchorRef"
      affix
      :trigger-top="24"
      :top="88"
      :bound="24"
      style="z-index: 1"
    >
      <n-anchor-link title="演示" href="#演示">
        <n-anchor-link title="基础用法" href="#test1" />
        <n-anchor-link title="忽略间隔" href="#test2" />
        <n-anchor-link title="固定" href="#test3" />
        <n-anchor-link title="滚动到" href="#test4" />
      </n-anchor-link>
      <n-anchor-link title="API" href="#API" />
    </n-anchor>
  </div>
  <n-space style="padding-left: 400px">
    <n-button @click="scrollTo('#basic')">
      基础用法
    </n-button>
    <n-button @click="scrollTo('#affix')">
      固定
    </n-button>
  </n-space>

  <n-scrollbar style="margin-right: 140px"  >
    <div id="test1" style="width: 100px;height: 400px;background:red">test1</div>
    <div id="test2" style="width: 100px;height: 400px;background:yellow">test2</div>
    <div id="test3" style="width: 100px;height: 400px;background:blue">test3</div>
    <div id="test4" style="width: 100px;height: 400px;background:orange">test4</div>
    <div id="test5" style="width: 100px;height: 400px;background:orange">test5</div>
    <div id="test6" style="width: 100px;height: 400px;background:orange">test6</div>
    <div id="test7" style="width: 100px;height: 400px;background:orange">test7</div>
    <div id="test8" style="width: 100px;height: 400px;background:orange">test8</div>
  </n-scrollbar>

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { AnchorInst } from 'naive-ui'

export default defineComponent({
  setup () {
    const anchorRef = ref<AnchorInst | null>(null)
    const scrollTo = (href: string) => {
      anchorRef.value?.scrollTo(href)
    }
    return {
      anchorRef,
      scrollTo
    }
  }
})
</script>