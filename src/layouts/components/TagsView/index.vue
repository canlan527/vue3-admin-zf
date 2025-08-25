<template>
  <div class="tags-view-container">
    <el-scrollbar w-full whitespace-nowrap>
      <router-link
        class="tags-view-item"
        v-for="(tag, index) in visitedViews"
        :key="index"
        :to="{ path: tag.path, query: tag.query }"
      >
        <el-dropdown
          placement="top-start"
          trigger="contextmenu"
          @command="(command) => handleCommand(command, tag)"
          line-height-7
          mr-2
        >
          <span class="title">{{ (tag as any).title }}</span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="all">关闭所有</el-dropdown-item>
              <el-dropdown-item command="other">关闭其他</el-dropdown-item>
              <el-dropdown-item command="self" v-if="!tag.meta.affix"
                >关闭</el-dropdown-item
              >
              <el-dropdown-item command="refresh">刷新</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <svg-icon
          v-if="!isAffix(tag)"
          icon-name="mdi:close"
          custom-class="mx-2px transform translate-y-1"
          @click.prevent="closeSelectedTag(tag)"
        ></svg-icon>
      </router-link>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { useTagsView } from '@/stores/tagsView'
import { join } from 'path-browserify'
import { routes } from '@/router'
import type { RouteLocationNormalizedGeneric, RouteRecordRaw } from 'vue-router'

const store = useTagsView()
const { deleteView, addView, delAllView, deleteOtherView, deleteCachedView } =
  store
// 必须采用 storeToRefs 解构，否则会丧失响应式
const { visitedViews } = storeToRefs(store)

const route = useRoute()
const refreshKey = ref(route.fullPath)
watch(
  () => route.fullPath,
  (newPath) => {
    refreshKey.value = newPath
  }
)

const router = useRouter()

// 判断当前路由是否激活
const isActive = (tag: RouteLocationNormalizedGeneric) => {
  return tag.path === route.path
}

// 判断标签是否可关闭
const isAffix = (tag: RouteLocationNormalizedGeneric) => {
  return tag.meta.affix
}

// 添加当前路由到标签视图
const addTags = () => {
  if (route.name) {
    addView(route) // 需要添加到tags中
  }
}

// 导航到最后一个标签视图
const toLastView = () => {
  const lastView = visitedViews.value[visitedViews.value.length - 1]
  if (lastView) {
    router.push(lastView.path)
  } else {
    router.push('/')
  }
}

// 关闭选中标签页
const closeSelectedTag = (tag: RouteLocationNormalizedGeneric) => {
  deleteView(tag)
  if (isActive(tag)) {
    toLastView() // 如果删掉了自己，需要导航到当前list中的最后一个
  }
}

function filterAffix(routes: RouteRecordRaw[], basePath = '/') {
  const tags: RouteLocationNormalizedGeneric[] = []

  for (let route of routes) {
    if (route.meta?.affix) {
      tags.push({
        name: route.name,
        path: join(basePath, route.path),
        meta: route.meta
      } as RouteLocationNormalizedGeneric)
    }
    if (route.children) {
      tags.push(...filterAffix(route.children, route.path))
    }
  }

  return tags
}

// 初始化标签视图,添加固定标签和当前路由标签
const initTags = () => {
  const filterAffixTags = filterAffix(routes)
  filterAffixTags.forEach((tag) => {
    // 添加固定标签
    addView(tag)
  })
  // 添加当前路由标签
  addTags()
}

// 页面加载后，需要初始化固定 + 默认当前路径
onMounted(() => {
  initTags()
})

// 路径变化时重新添加
watch(() => route.path, addTags)

// 右键点击菜单
const enum CommandType {
  All = 'all',
  Other = 'other',
  Self = 'self',
  Refresh = 'refresh'
}

// 处理菜单命令
const handleCommand = (
  command: CommandType,
  view: RouteLocationNormalizedGeneric
) => {
  switch (command) {
    case CommandType.All:
      delAllView()
      break
    case CommandType.Other:
      deleteOtherView(view)
      break
    case CommandType.Self:
      closeSelectedTag(view)
      break
    case CommandType.Refresh:
      deleteCachedView(view)
      // router.push('/redirect' + view.path)
      router.push({
        path: '/redirect' + view.fullPath
      })
      break
  }
}
</script>

<style lang="scss" scoped>
.tags-view-container {
  @apply w-full overflow-hidden @apply h-[var(--tagsview-height)] shadow-sm shadow-gray-300 bg-gray-100;
  .tags-view-item {
    @apply inline-block h-28px rounded-t-8px leading-28px px-6px mx-3px text-black mt-1 bg-white line-height-normal;
    .title {
      @apply text-dark-3;
    }
    &.active {
      @apply text-white border-none bg-green;
      &::before {
        content: '';
        @apply inline-block w-8px h-8px rounded-full bg-white mr-3px;
      }
    }
  }
}
</style>
