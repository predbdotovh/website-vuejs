<template>
  <tr>
    <td>
      <div class="cat">
        <router-link :to="{ name: 'search', query: { q: '@cat ' + r.cat } }">
          {{ r.cat }}
        </router-link>
      </div>
      <div
        v-if="r.genre"
        class="genre"
        :title="r.genre"
      >
        {{ r.genre.substring(0, 36) }}
      </div>
    </td>
    <td>
      <div class="name">
        {{ r.name.replace('-' + r.team, '')
        }}<router-link
          class="text-italic"
          :to="{ name: 'search', query: { q: '@team ' + r.team } }"
          >-<!-- eslint-disable-line -->{{ r.team }}
        </router-link>
      </div>
      <div
        v-if="r.nuke"
        class="nuke"
        :class="{
          'nuke-nuked': nukeNuke.includes(r.nuke.type),
          'nuke-fine': nukeFine.includes(r.nuke.type)
        }"
      >
        {{ r.nuke.reason }} - <span class="nuke-net">{{ r.nuke.net }}</span>
      </div>
    </td>
    <td>
      <div
        v-if="r.preAt"
        class="date"
      >
        {{ preAt.toLocaleDateString() }}
        {{ preAt.toLocaleTimeString() }}
      </div>
      <div
        v-if="r.files"
        class="files"
      >
        {{ r.files }}<span
          class="files-symbol"
          title="Files"
        >F</span>
      </div>
      <div
        v-if="r.size"
        class="size"
      >
        {{ Math.round(r.size * 100) / 100
        }}<span
          class="size-symbol"
          title="Size"
        >MB</span>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'TableRow',
  props: {
    r: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      nukeFine: ['unnuke', 'undelpre'],
      nukeNuke: ['nuke', 'modnuke', 'delpre']
    }
  },
  computed: {
    preAt () {
      return new Date(this.r.preAt * 1000)
    }
  }
}
</script>

<style lang="scss">
.cat {
  display: inline-block;
}
.genre {
  margin-left: 0.6em;
  display: inline-block;
}
.name {
  word-break: break-all;
}
.nuke {
  word-break: break-all;
}
.nuke-nuked {
  color: #e85600;
}
.nuke-fine {
  color: #32b643;
}
.nuke-net {
  font-style: italic;
}
.date {
  display: inline-block;
}
.files {
  margin-left: 0.6em;
  display: inline-block;
}
.files-symbol {
  color: #32b643;
}
.size {
  margin-left: 0.6em;
  display: inline-block;
}
.size-symbol {
  color: #ffb700;
}

@media (max-width: 600px) {
  .cat {
    word-break: break-all;
  }
  .genre {
    word-break: break-all;
  }
}
@media (max-width: 840px) {
  .genre {
    margin-left: unset;
  }
  .files {
    margin-left: unset;
  }
  .size {
    margin-left: unset;
  }
}
</style>
