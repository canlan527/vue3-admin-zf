// 实现刷新功能，⽤于添加后提示⽤户刷新⻚⾯
interface IReloadFn {
  reloadPage: (title?: string, message?: string) => Promise<void>
}

export const useReoladPage = (): IReloadFn => {
  const { proxy } = getCurrentInstance()!
  const reloadPage = async (
    title = '确认刷新',
    message?: string
  ): Promise<void> => {
    try {
      await proxy?.$confirm(
        message || '菜单已发生改动，是否要刷新当前系统',
        title,
        {
          type: 'warning'
        }
      )
      window.location.reload()
    } catch {
      proxy?.$message({ type: 'info', message: '已取消刷新' })
    }
  }

  return {
    reloadPage
  }
}
