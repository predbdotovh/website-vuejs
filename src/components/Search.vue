<template>
  <div class="search">
    <div class="search-form">
      <form class="input-group">
        <input class="form-input input-query" type="text" placeholder="Search for..." v-model="q">
        <button class="btn btn-primary input-group-btn" @click.prevent="go"><i class="ion-14x ion-search"></i></button>
      </form>
    </div>
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
import utils from '@/assets/js/utils'
import PaginableMixin from '@/mixins/PaginableMixin'
import Pagination from '@/components/Pagination'
import TableRow from '@/components/TableRow'

export default {
  name: 'search',
  components: {
    TableRow,
    Pagination
  },
  mixins: [
    PaginableMixin
  ],
  data () {
    return {
      loading: false,
      status: 'Loading',
      q: '',
      releases: []
    }
  },
  methods: {
    run () {
      this.q = ''
      this.resetPagination()
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
      this.$Progress.start()
      this.status = 'Loading'
      if (this.q) {
        utils.setPageTitle('Search ' + this.q)
      } else {
        utils.setPageTitle()
      }
      window.scrollTo(0, 0)
      const elStart = window.performance.now()
      api.query({q: this.q, page: this.page.current})
      .then(this.calcPagination)
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
        this.$Progress.finish()
      })
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
.search-form {
  margin-top: .6em;
}
</style>
