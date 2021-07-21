<template>
  <nav class="pagination is-centered" role="navigation" aria-label="pagination">
    <router-link
      v-if="page.current > 1"
      class="pagination-previous"
      :to="page.prev"
    >
      Prev
    </router-link>
    <span v-else class="pagination-previous" disabled>Prev</span>
    <router-link
      v-if="page.current < page.max"
      class="pagination-next"
      :to="page.next || ''"
    >
      Next
    </router-link>
    <span v-else class="pagination-next" disabled>Next</span>
    <ul class="pagination-list">
      <li v-for="p in page.list" :key="p.i">
        <router-link
          class="pagination-link"
          :to="p.link"
          :disabled="p.i < 1 || p.i > page.max"
          :class="{ 'is-current': page.current === p.i }"
        >
          {{ p.text }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    page: {
      type: Object,
      default: () => {
        return {
          prev: false,
          current: 0,
          list: [],
          next: false,
        };
      },
    },
  },
};
</script>
