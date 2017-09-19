<<script>
export default {
  name: 'paginable-mixin',
  data () {
    return {
      page: {
        prev: false,
        current: 1,
        max: 0,
        next: false
      }
    }
  },
  methods: {
    resetPagination () {
      this.page.prev = null
      this.page.current = 1
      this.page.max = 0
      this.page.next = null
    },
    calcPagination (data) {
      if (!data) {
        return
      }

      this.page = {
        current: Math.floor(data.offset / data.reqCount) + 1,
        max: Math.ceil(data.total / data.reqCount),
        list: []
      }

      this.page.prev = {path: this.$route.path, query: Object.assign({}, this.$route.query, {page: this.page.current - 1})}
      let min = this.page.current - 4
      let max = this.page.current + 4
      for (let i = min; i <= max; i++) {
        if (i < 1) {
          max++
          continue
        }
        if (i > this.page.max) {
          break
        }
        let q = Object.assign({}, this.$route.query)
        q.page = i
        this.page.list.push({text: q.page, i: q.page, link: {path: this.$route.path, query: q}})
      }
      this.page.next = {path: this.$route.path, query: Object.assign({}, this.$route.query, {page: this.page.current + 1})}

      return data
    }
  }
}
</script>
