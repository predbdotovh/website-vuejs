<template>
  <div class="search">
    <div class="search-form">
      <form class="input-group">
        <input class="form-input input-query" type="text" placeholder="Search for..." v-model="q">
        <button class="btn btn-primary input-group-btn" @click.prevent="go">Go</button>
      </form>
    </div>
    <LoadingBar :state="loading"></LoadingBar>
    <div class="status">
      {{status}}
    </div>
    <table class="table table-sm table-striped table-hover" :class="{'state-loading': loading}" v-if="releases.length">
      <tbody>
        <TableRow v-for="row in releases" :r="row" :key="row.id"></TableRow>
      </tbody>
    </table>
    <Pagination :page="page"></Pagination>
  </div>
</template>

<script>
import api from '@/assets/js/api'
import LoadingBar from './LoadingBar'
import Pagination from './Pagination'
import TableRow from './TableRow'

export default {
  name: 'search',
  components: {
    TableRow,
    LoadingBar,
    Pagination
  },
  data () {
    return {
      loading: false,
      status: 'Loading',
      q: '',
      page: {
        current: 1,
        max: 0
      },
      releases: []
    }
  },
  methods: {
    run () {
      this.page.current = 1
      this.q = ''
      this.parseURLQuery(this.$route)
      this.search()
    },
    go () {
      this.$router.push({name: 'search', query: this.generateURLQuery()})
    },
    parseURLQuery (route) {
      this.q = route.query.q
      if (route.query.page) {
        this.page.current = route.query.page
      }
    },
    generateURLQuery () {
      return {
        q: this.q
      }
    },
    search () {
      this.loading = true
      this.status = 'Loading'
      if (this.q) {
        this.setPageTitle('Search ' + this.q)
      }
      window.scrollTo(0, 0)
      const elStart = window.performance.now()
      api.query(this.q, this.page.current)
      .then(this.calcPages)
      .then((data) => {
        if (!data) {
          return
        }

        const elSeconds = Math.round(window.performance.now() - elStart) / 1000
        this.status = 'Results ' + (data.offset + 1) + '-' + (data.offset + data.rowCount) +
          ' of ' + data.total + ' matches in ' + elSeconds + ' seconds'
        this.releases = data.rows
      })
      .catch((err) => {
        this.status = err.message || 'Error while loading releases'
      })
      .finally(() => {
        this.loading = false
      })
    },
    calcPages (data) {
      if (!data) {
        return
      }

      this.page = {
        current: Math.floor(data.offset / data.reqCount) + 1,
        max: Math.ceil(data.total / data.reqCount),
        list: []
      }

      {
        let q = Object.assign({}, this.$route.query)
        q.page = this.page.current - 1
        this.page.list.push({text: '<<', i: q.page, link: {path: this.$route.path, query: q}})
      }
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
      {
        let q = Object.assign({}, this.$route.query)
        q.page = this.page.current + 1
        this.page.list.push({text: '>>', i: q.page, link: {path: this.$route.path, query: q}})
      }

      return data
    },
    setPageTitle (title) {
      if (title) {
        document.title = title + ' - PREdb'
      } else {
        document.title = 'PREdb'
      }
    },
    handleRouteUpdate () {
      this.run()
    }
  },
  created () {
    this.run()
  },
  watch: {
    '$route': 'handleRouteUpdate'
  }
}
</script>

<style>
.search {
  margin: 0 12px;
}
.input-group-addon .form-switch {
  padding-top: 0;
  padding-bottom: 0;
}
.input-group-addon .form-switch .form-icon {
  top: .1rem;
}
.table-sm tbody td {
  padding: .4rem 1rem;
}
.state-loading {
  opacity: 0.6;
}
</style>
