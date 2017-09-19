<<template>
  <tr>
    <td>
      <div class="cat">
        <router-link :to="{name: 'search', query: {q: '@cat ' + r.cat}}">{{r.cat}}</router-link>
      </div>
      <div class="genre" v-if="r.genre">
        {{r.genre.substring(0, 36)}}
      </div>
    </td>
    <td>
      <div class="name">
        {{r.name.replace('-' + r.team, '')}}<router-link class="text-italic" :to="{name: 'search', query: {q: '@team ' + r.team}}">-{{r.team}}</router-link>
      </div>
      <div class="nuke" :class="{'nuke-nuked': nukeNuke.includes(r.nuke.type), 'nuke-fine': nukeFine.includes(r.nuke.type)}" v-if="r.nuke">
        {{r.nuke.reason}} - <span class="nuke-net">{{r.nuke.net}}</span>
      </div>
    </td>
    <td>
      <div class="date" v-if="r.preAt">
        {{new Date(r.preAt * 1000).toLocaleString()}}
      </div>
      <div class="files" v-if="r.files">
        {{r.files}}<span class="files-symbol">F</span>
      </div>
      <div class="size" v-if="r.size">
        {{Math.round(r.size * 100) / 100}}<span class="size-symbol">MB</span>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'table-row',
  data () {
    return {
      nukeFine: ['unnuke', 'undelpre'],
      nukeNuke: ['nuke', 'modnuke', 'delpre']
    }
  },
  props: {
    r: {
      type: Object,
      default: {}
    }
  }
}
</script>

<style>
.cat {
  display: inline-block;
}
.genre {
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
  display: inline-block;
}
.files-symbol {
  color: #32b643;
}
.size {
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
</style>
