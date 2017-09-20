<template>
  <div class="stats">
    <div class="stats-total">Total releases : {{stats.total}}</div>
    <div class="stats-gentime">Average search duration : {{Math.round(stats.time * 1000)}}ms</div>
    <div class="stats-upddate">Last update : {{new Date(stats.date).toLocaleString()}}</div>
  </div>
</template>

<script>
import api from '@/assets/js/api'

export default {
  name: 'stats',
  data () {
    return {
      stats: {}
    }
  },
  created () {
    api.stats().then((stats) => {
      this.stats = stats
    })
  }
}
</script>
