<template>
  <div class="bar bar-sm mb-5" :style="{visibility: this.show ? 'visible' : 'hidden'}">
    <div class="bar-item" role="progressbar" :style="{width: percent + '%'}" :aria-valuenow="percent" aria-valuemin="0" aria-valuemax="100"></div>
  </div>
</template>

<script>
export default {
  name: 'loading-bar',
  props: [
    'state'
  ],
  data () {
    return {
      show: false,
      scheduler: null,
      startTime: 0,
      percent: 0
    }
  },
  methods: {
    start () {
      if (this.show) {
        return
      }

      if (this.scheduler) {
        clearInterval(this.scheduler)
        this.scheduler = null
      }

      this.startTime = window.performance.now()

      this.scheduler = setInterval(() => {
        if (this.percent >= 100) {
          this.show = false
        }
        const elapsed = window.performance.now() - this.startTime
        this.percent += Math.round(1 / elapsed * 1000)
      }, 40)

      this.percent = 0
      this.show = true
    },
    done () {
      if (!this.show) {
        return
      }

      this.percent = 100
    }
  },
  created () {
    this.start()
  },
  watch: {
    'state': function (s) {
      if (s) {
        this.start()
      } else {
        this.done()
      }
    }
  }
}
</script>
