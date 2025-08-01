import { useSettingStore } from '@/stores/settings'
import { generateColors, setColors } from '@/utils/color'

export const useGenerateTheme = () => {
  // 监控主题的变化，更新到store中
  // 生成主题更新
  const store = useSettingStore()
  const theme = computed(() => store.setting.theme)
  const originTheme = computed(() => store.setting.originTheme)

  watchEffect(() => {
    if (theme.value !== originTheme.value) {
      const colors = {
        primary: theme.value,
        ...generateColors(theme.value)
      }
      setColors(colors)
      store.changeSetting({ key: 'originTheme', value: theme.value })
    }
  })
}
