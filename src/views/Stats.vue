<template>
  <div class="stats">
    <div class="stats-total">
      Total releases : {{ stats.total }}
    </div>
    <div class="stats-gentime">
      Average search duration : {{ Math.round(stats.time * 1000) }}ms
    </div>
    <div class="stats-upddate">
      Last update : {{ new Date(stats.date).toLocaleString() }}
    </div>
  </div>
</template>

<script>
import api from '@/assets/js/api'
import utils from '@/assets/js/utils'

export default {
  name: 'Stats',
  data () {
    return {
      loading: false,
      stats: {}
    }
  },
  created () {
    this.run()
  },
  methods: {
    run () {
      utils.setPageTitle('Stats')
      this.loadStats()
    },
    loadStats () {
      this.loading = true
      this.$Progress.start()
      api.stats().then((stats) => {
        this.stats = stats
      }).finally(() => {
        this.loading = false
        this.$Progress.finish()
      })
    }
  }
}
</script>
