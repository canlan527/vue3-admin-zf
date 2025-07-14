import type { Size } from '@/plugins/element'

export const useAppstore = defineStore(
  'app',
  () => {
    const state = reactive({
      sidebar: {
        opened: true
      },
      size: 'default' as Size
    })
    // sidebar
    const sidebar = computed(() => state.sidebar)
    const toggleSidebar = () => {
      state.sidebar.opened = !state.sidebar.opened
    }
    // size
    const size = computed(() => state.size)
    const setSize = (value: Size) => {
      state.size = value
    }

    return {
      state,
      sidebar,
      toggleSidebar,
      size,
      setSize
    }
  },
  {
    persist: {
      storage: window.localStorage,
      pick: ['state.sidebar', 'state.size']
    }
  }
)
