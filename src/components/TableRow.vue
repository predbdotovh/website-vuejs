<<template>
  <tr>
    <td>
      <span class="block cat">
        <router-link :to="{name: 'search', query: {q: '@cat ' + r.cat}}">{{r.cat}}</router-link>
      </span>
      <span class="block text-break genre" v-if="r.genre">{{r.genre.substring(0, 36)}}</span>
    </td>
    <td>
      <span class="text-break name">{{r.name.replace('-' + r.team, '')}}<router-link class="text-italic" :to="{name: 'search', query: {q: '@team ' + r.team}}">-{{r.team}}</router-link></span>
      <span class="nuke" :class="{'nuketype-nuke': nukeNuke.includes(r.nuke.type), 'nuketype-fine': nukeFine.includes(r.nuke.type)}" v-if="r.nuke">{{r.nuke.reason}} - <span class="nuke-net">{{r.nuke.net}}</span></span>
    </td>
    <td class="hide-sm date">
      <span v-if="r.preAt">{{new Date(r.preAt * 1000).toLocaleString()}}</span>
    </td>
    <td>
      <span v-if="r.preAt" class="show-sm date">{{new Date(r.preAt * 1000).toLocaleString()}}</span>
      <span class="block files" v-if="r.files">{{r.files}}<span class="files-symbol">F</span></span>
      <span class="block size" v-if="r.size">{{Math.round(r.size * 100) / 100}}<span class="size-symbol">MB</span></span>
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
.nuketype-nuke {
  color: #e85600;
}
.nuketype-fine {
  color: #32b643;
}
.nuke-net {
  font-style: italic;
}
.files-symbol {
  color: #32b643;
}
.size-symbol {
  color: #ffb700;
}
</style>
