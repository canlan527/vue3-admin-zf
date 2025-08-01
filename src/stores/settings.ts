import variables from '@/assets/styles/variables.module.scss'

// 用户主题、配置在这里管理
export const useSettingStore = defineStore(
  'setting',
  () => {
    const setting = reactive({
      theme: variables.theme,
      originTheme: ''
    })

    type ISetting = typeof setting

    const changeSetting = <T extends keyof ISetting>({
      key,
      value
    }: {
      key: T
      value: ISetting[T]
    }) => {
      setting[key] = value
    }

    return { setting, changeSetting }
  },
  {
    persist: {
      storage: sessionStorage,
      pick: ['setting.theme']
    }
  }
)
