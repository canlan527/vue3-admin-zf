<template>
  <div>
    <el-breadcrumb separator="/" leading-50px text-lg ml-30px inline-block>
      <el-breadcrumb-item
        v-for="(item, index) in list"
        :key="item.path"
        :to="{ path: item.path }"
      >
        <span v-if="list?.length - 1 === index">{{ item.meta?.title }}</span>
        <route-link v-else href="">{{ item.meta?.title }}</route-link>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import type { RouteLocationMatched } from 'vue-router'

type PartialRouteLocationMatched = Partial<RouteLocationMatched>
const route = useRoute()
const list = ref<PartialRouteLocationMatched[]>()

const getBreadCrumb = () => {
  let matched = route.matched.filter(
    (match) => match.meta.title
  ) as PartialRouteLocationMatched[]
  // 如果访问的不是首页，增加匹配项
  if (matched[0].path !== '/dashborad') {
    matched = [
      {
        path: '/dashboard',
        meta: {
          title: 'dashboard'
        }
      },
      ...matched
    ]
  }
  list.value = matched.filter((matched) => matched.meta?.breadcrumb !== false)
}

// 监听路由，执行 getBreadCrumb 函数
watch(() => route.path, getBreadCrumb, {
  immediate: true
})
</script>

<style scoped></style>
