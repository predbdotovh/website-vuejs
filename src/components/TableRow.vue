<<template>
  <tr>
    <td>
      <span class="block">
        <router-link :to="{name: 'search', query: {q: '@cat ' + r.cat}}">{{r.cat}}</router-link>
      </span>
      <span class="block text-break" v-if="r.genre">{{r.genre}}</span>
    </td>
    <td>
      <span class="text-break">{{r.name.replace('-' + r.team, '')}}<router-link class="text-italic" :to="{name: 'search', query: {q: '@team ' + r.team}}">-{{r.team}}</router-link></span>
    </td>
    <td class="hide-sm">
      <span v-if="r.preAt">{{new Date(r.preAt * 1000).toLocaleString()}}</span>
    </td>
    <td>
      <span v-if="r.preAt" class="show-sm">{{new Date(r.preAt * 1000).toLocaleString()}}</span>
      <span class="block" v-if="r.files">{{r.files}}<span class="files">F</span></span>
      <span class="block" v-if="r.size">{{Math.round(r.size * 100) / 100}}<span class="size">MB</span></span>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'table-row',
  props: {
    r: {
      type: Object,
      default: {}
    }
  }
}
</script>

<style>

</style>
