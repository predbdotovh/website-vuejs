<template>
  <div class="search">
    <div class="search-form">
      <form class="input-group">
        <input class="form-input input-query" type="text" placeholder="Search for..." v-model="searchQuery">
        <button class="btn btn-primary input-group-btn" @click.prevent="go">Go</button>
      </form>

      <label class="form-switch">
        <input type="checkbox" v-model="isLive">
        <i class="form-icon"></i> Live
      </label>
    </div>
    <div class="status">
      {{status}}
    </div>
    <table class="table table-striped table-hover" v-if="releases.length">
      <thead>
        <tr>
        </tr>
      </thead>
      <tbody>
        <tr v-for="r in releases">
          <td>{{r.cat}}</td>
          <td>{{r.name}}</td>
          <td>{{r.pretime}}</td>
        </tr>
      </tbody>
    </table>
    <ul class="pagination">
    </ul>
  </div>
</template>

<script>
import api from '@/assets/js/api'

export default {
  name: 'search',
  data () {
    return {
      status: '',
      isLive: true,
      searchQuery: '',
      releases: []
    }
  },
  methods: {
    go () {
      api.query({q: this.searchQuery})
      .then((data) => {
        if (!data) {
          return
        }

        this.releases = data.rows
      })
      .catch((err) => {
        this.status = err.message
      })
    }
  }
}
</script>

<style>
.search {
  margin: 0 20px;
}
</style>
