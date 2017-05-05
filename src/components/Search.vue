<template>
  <div class="search">
    <div class="search-form">
      <form class="input-group">
        <input class="form-input input-query" type="text" placeholder="Search for..." v-model="q">
        <button class="btn btn-primary input-group-btn" @click.prevent="go">Go</button>
      </form>
    </div>
    <LoadingBar :state="status"></LoadingBar>
    <div class="status">
      {{status}}
    </div>
    <table class="table table-sm table-striped table-hover" v-if="releases.length">
      <tbody>
        <tr v-for="r in releases">
          <td><router-link :to="{name: 'search', query: {q: '@cat ' + r.cat}}">{{r.cat}}</router-link> {{r.genre}}</td>
          <td>{{r.name.replace('-' + r.team, '')}}<router-link :to="{name: 'search', query: {q: '@team ' + r.team}}">-{{r.team}}</router-link></td>
          <td>{{r.preAt}}</td>
          <td>{{r.files}} {{r.size}}</td>
        </tr>
      </tbody>
    </table>
    <ul class="pagination">
    </ul>
  </div>
</template>

<script>
import api from '@/assets/js/api'
import LoadingBar from './LoadingBar'

export default {
  name: 'search',
  components: {
    LoadingBar
  },
  data () {
    return {
      status: 'Loading',
      q: '',
      releases: []
    }
  },
  methods: {
    run () {
      this.parseURLQuery(this.$route)
      this.search()
    },
    go () {
      this.$router.push({name: 'search', query: this.generateURLQuery()})
    },
    parseURLQuery (route) {
      this.q = route.query.q
    },
    generateURLQuery () {
      return {
        q: this.q
      }
    },
    search () {
      this.status = 'Loading'
      if (this.q) {
        this.setPageTitle('Search ' + this.q)
      }
      let elStart = window.performance.now()
      api.query(this.q, this.page)
      .then((data) => {
        if (!data) {
          return
        }

        let elSeconds = Math.round(window.performance.now() - elStart) / 1000
        this.status = 'Results ' + (data.offset + 1) + '-' + (data.offset + data.rowCount) +
          ' of ' + data.total + ' matches in ' + elSeconds + ' seconds'
        this.releases = data.rows
      })
      .catch((err) => {
        this.status = err.message
      })
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
  margin: 0 20px;
}
.input-group-addon .form-switch {
  padding-top: 0;
  padding-bottom: 0;
}
.input-group-addon .form-switch .form-icon {
  top: .1rem;
}
.table-sm tbody td {
  padding: .8rem 1rem;
}
</style>
