<script lang="ts">
export default {
  name: 'Redirect',
  setup() {
    // console.log('redirect setup running...')
    const route = useRoute()
    const router = useRouter()
    // 只是为了实现重定向功能
    router.replace({
      // path: '/' + route.params.path,
      // query: route.query
      path: '/' + route.params.path,
      query: route.query,
      hash: route.hash
    })
    // console.log('params:', route.params.path)
    // console.log('query:', route.query)
  },

  render() {
    return h('template')
  }
}
</script>
