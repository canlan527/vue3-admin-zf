// 对 color 做生成时，设置时的工具转换函数
import cssFunc from 'css-color-function'

type TColors = Record<string, string>

const formula: { [prop: string]: string } = {
  'primary-light-1': 'color(xxx tint(10%))',
  'primary-light-2': 'color(xxx tint(20%))',
  'primary-light-3': 'color(xxx tint(30%))',
  'primary-light-4': 'color(xxx tint(40%))',
  'primary-light-5': 'color(xxx tint(50%))',
  'primary-light-6': 'color(xxx tint(60%))',
  'primary-light-7': 'color(xxx tint(70%))',
  'primary-light-8': 'color(xxx tint(80%))',
  'primary-light-9': 'color(xxx tint(90%))'
}

const generateColors = (primary: string) => {
  const colors: TColors = {}
  Object.entries(formula).forEach(([key, value]) => {
    const v = value.replace(/xxx/g, primary)
    colors[key] = cssFunc.convert(v)
  })
  return colors
}

const setColors = (colors: TColors) => {
  const el = document.documentElement
  Object.entries(colors).forEach(([key, value]) => {
    el.style.setProperty(`--el-color-${key}`, value)
  })
}

export { generateColors, setColors }
