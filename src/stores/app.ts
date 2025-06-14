export const useAppstore = defineStore(
  'app',
  () => {
    const state = reactive({
      sidebar: {
        opened: true
      }
    })

    const sidebar = computed(() => state.sidebar)

    const toggleSidebar = () => {
      state.sidebar.opened = !state.sidebar.opened
    }

    return {
      state,
      sidebar,
      toggleSidebar
    }
  },
  {
    persist: {
      storage: window.localStorage,
      pick: ['state.sidebar']
    }
  }
)
