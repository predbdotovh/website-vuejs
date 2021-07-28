<template>
  <div class="teams">
    <div class="status-bar">
      {{ status }}
    </div>
    <table
      v-if="teams.length"
      class="table is-striped is-hoverable is-fullwidth"
      :class="{ 'state-loading': loading }"
    >
      <tr>
        <th>Team</th>
        <th>First pre</th>
        <th>Latest pre</th>
        <th>Total pre</th>
      </tr>
      <tbody>
        <TeamTableRow v-for="row in teams" :key="row.team" :r="row" />
      </tbody>
    </table>
  </div>
</template>

<script>
import api from "@/assets/js/api";
import utils from "@/assets/js/utils";
import TeamTableRow from "@/components/TeamTableRow.vue";

export default {
  name: "Live",
  components: {
    TeamTableRow,
  },
  data() {
    return {
      loading: false,
      status: "Loading",
      teams: [],
    };
  },
  created() {
    this.run();
  },
  methods: {
    run() {
      utils.setPageTitle("Teams");
      this.loading = true;
      this.$Progress.start();
      this.status = "Loading";

      window.scrollTo(0, 0);
      const elStart = window.performance.now();
      return api
        .teams()
        .then((data) => {
          if (!data) {
            return;
          }

          const sec = Math.round(window.performance.now() - elStart) / 1000;
          // this.status = `Results ${data.offset + 1}-${
          //   data.offset + data.rowCount
          // } of ${data.total} matches in ${sec} seconds`;
          this.status = `Top ${data.rowCount} teams ordered by pre count in ${sec} seconds`;
          this.teams = data.rows;

          return true;
        })
        .catch((err) => {
          this.status = err.message || "Error while loading teams";
        })
        .finally(() => {
          this.loading = false;
          this.$Progress.finish();
        });
    },
  },
};
</script>
