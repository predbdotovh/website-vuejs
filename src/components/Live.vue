<template>
  <div class="live">
    <div class="status">
      <span class="live-state" :class="{'online': running, 'offline': !running}">•</span>
      {{status}}
    </div>
    <table class="table table-sm table-striped table-hover" :class="{'state-loading': loading}" v-if="releases.length">
      <tbody>
        <TableRow v-for="row in releases" :r="row" :key="row.id"></TableRow>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from '@/assets/js/api'
import utils from '@/assets/js/utils'
import Pagination from '@/components/Pagination'
import TableRow from '@/components/TableRow'

export default {
  name: 'live',
  components: {
    TableRow,
    Pagination
  },
  data () {
    return {
      loading: false,
      running: false,
      status: 'Loading',
      releases: []
    }
  },
  methods: {
    run () {
      utils.setPageTitle('Live')
      this.preload()
      .then(this.live)
    },
    preload () {
      this.loading = true
      this.$Progress.start()
      this.status = 'Loading'
      window.scrollTo(0, 0)
      const elStart = window.performance.now()
      return api.fresh()
      .then((data) => {
        if (!data) {
          return
        }

        const elSeconds = Math.round(window.performance.now() - elStart) / 1000
        this.status = 'Results ' + (data.offset + 1) + '-' + (data.offset + data.rowCount) +
          ' of ' + data.total + ' matches in ' + elSeconds + ' seconds'
        this.releases = data.rows

        return true
      })
      .catch((err) => {
        this.status = err.message || 'Error while loading releases'
      })
      .finally(() => {
        this.loading = false
        this.$Progress.finish()
      })
    },
    live (preloaded) {
      if (!preloaded) {
        return
      }

      const ws = api.websocket()
      ws.onopen = (e) => {
        this.running = true
        this.status = 'Websocket started'
      }
      ws.onmessage = (e) => {
        const j = JSON.parse(e.data)
        if (!j.action) {
          return
        }

        this.status = 'Last update : ' + new Date().toLocaleString()
        switch (j.action) {
          case 'insert': {
            this.releases.unshift(j.row)
            break
          }
          case 'update': {
            const index = this.releases.findIndex((e) => e.id === j.row.id)
            if (index !== -1) {
              this.releases[index] = j.row
            }
            break
          }
          case 'delete': {
            const index = this.releases.findIndex((e) => e.id === j.row.id)
            if (index !== -1) {
              this.releases.splice(index, 1)
            }
            break
          }
          case 'nuke':
          case 'modnuke':
          case 'unnuke':
          case 'delpre':
          case 'undelpre': {
            if (j.row.nuke) {
              const index = this.releases.findIndex((e) => e.id === j.row.id)
              if (index !== -1) {
                this.releases[index] = j.row
              }
            }
            break
          }
        }
      }
      ws.onerror = () => {
        this.status = 'Websocket error'
        this.running = false
        setTimeout(this.run, 1000)
      }
      ws.onclose = () => {
        this.status = 'Websocket closed'
        this.running = false
      }
    }
  },
  created () {
    this.run()
  }
}
</script>

<style>
.live-state {
  font-size: 1.4em;
}
.online {
  color: #32b643;
}
.offline {
  color: #e85600;
}
</style>
