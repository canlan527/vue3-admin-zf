import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    icon?: string
    title?: string
    hidden?: boolean
    alwaysShow?: boolean
    breadcrumb?: boolean
  }
}
