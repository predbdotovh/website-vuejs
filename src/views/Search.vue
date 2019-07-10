<template>
  <div class="search">
    <div class="search-form">
      <form class="input-group">
        <input
          ref="input"
          v-model="q"
          class="form-input input-query"
          type="text"
          placeholder="Search for..."
        >
        <button
          class="btn btn-primary input-group-btn"
          @click.prevent="go"
        >
          <i class="icon ion-14x ion-md-search" />
        </button>
      </form>
    </div>
    <div class="status">
      {{ status }}
    </div>
    <table
      v-if="releases.length"
      class="table table-sm table-striped table-hover"
      :class="{'state-loading': loading}"
    >
      <tbody>
        <TableRow
          v-for="row in releases"
          :key="row.id"
          :r="row"
        />
      </tbody>
    </table>
    <Pagination :page="page" />
  </div>
</template>

<script>
import api from '@/assets/js/api'
import utils from '@/assets/js/utils'
import PaginableMixin from '@/mixins/PaginableMixin.vue'
import Pagination from '@/components/Pagination.vue'
import TableRow from '@/components/TableRow.vue'

export default {
  name: 'Search',
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
  watch: {
    '$route': 'handleRouteUpdate'
  },
  created () {
    this.run()
  },
  mounted () {
    this.$refs.input.focus()
  },
  methods: {
    run () {
      this.q = ''
      utils.setPageTitle()
      this.resetPagination()
      this.parseURLQuery(this.$route)
      this.search()
    },
    go () {
      this.$router.push({ name: 'search', query: this.generateURLQuery() })
    },
    parseURLQuery (route) {
      this.q = route.query.q
      if (route.query.page) {
        this.page.current = route.query.page
      }
    },
    generateURLQuery () {
      const query = {}
      if (this.q) {
        query.q = this.q
      }

      return query
    },
    search () {
      this.loading = true
      this.$Progress.start()
      this.status = 'Loading'
      if (this.q) {
        utils.setPageTitle('Search ' + this.q)
      }
      window.scrollTo(0, 0)
      const elStart = window.performance.now()
      api.query({ q: this.q, page: this.page.current })
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
  }
}
</script>

<style lang="scss">
.search-form {
  margin-top: 0.6em;
}
</style>
