<template>
  <tr class="team-table-row">
    <td>
      <div class="name">
        <router-link :to="{ name: 'search', query: { q: '@team ' + r.team } }">
          {{ r.team }}
        </router-link>
      </div>
    </td>
    <td>
      <div v-if="r.firstPre" class="date">
        {{ firstPre.toLocaleDateString() }}
        {{ firstPre.toLocaleTimeString() }}
      </div>
    </td>
    <td>
      <div v-if="r.latestPre" class="date">
        {{ latestPre.toLocaleDateString() }}
        {{ latestPre.toLocaleTimeString() }}
      </div>
    </td>
    <td>
      <div v-if="r.count">
        {{ r.count }}
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  name: "PreTableRow",
  props: {
    r: {
      type: Object,
      default: () => {
        return {
          team: "",
          firstPre: 0,
          latestPre: 0,
          count: 0,
        };
      },
    },
  },
  computed: {
    firstPre() {
      return new Date(this.r.firstPre * 1000);
    },
    latestPre() {
      return new Date(this.r.latestPre * 1000);
    },
  },
};
</script>
