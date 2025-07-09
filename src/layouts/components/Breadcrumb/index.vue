<template>
  <div>
    <el-breadcrumb separator="/" leading-50px text-lg ml-30px inline-block>
      <el-breadcrumb-item v-for="(item, index) in list" :key="item.path">
        <span v-if="list?.length - 1 === index">{{ item.meta?.title }}</span>
        <a v-else @click="handleLink(item)">{{ item.meta?.title }}</a>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import type { RouteLocationMatched } from 'vue-router'
import { compile } from 'path-to-regexp'

type PartialRouteLocationMatched = Partial<RouteLocationMatched>
const route = useRoute()
const router = useRouter()
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
      ...matched,
      {
        path: '/xxx',
        meta: {
          title: 'test'
        }
      }
    ]
  }
  list.value = matched.filter((matched) => matched.meta?.breadcrumb !== false)
}

// 监听路由，执行 getBreadCrumb 函数
watch(() => route.path, getBreadCrumb, {
  immediate: true
})

const compose = (path: string) => {
  // 从路由对象里面那params
  const params = route.params
  // 拼接path和params
  // /test/index/:id + {id: 123} => /test/index/123
  const resultPath = compile(path)(params)
  return resultPath
}

// 点击面包屑跳转路由
const handleLink = (route: PartialRouteLocationMatched) => {
  const resultPath = compose(route.path!)
  if (route.redirect) {
    return router.push(route.redirect as string)
  }
  router.push(resultPath)
}
</script>

<style scoped></style>
