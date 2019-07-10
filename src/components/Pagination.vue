<template>
  <ul class="pagination">
    <li
      v-if="page.prev"
      class="page-item"
    >
      <router-link
        :to="page.prev"
        :disabled="page.current <= 1"
      >
        <i class="icon ion-ios-arrow-back" />
      </router-link>
    </li>
    <li
      v-for="p in page.list"
      :key="p.i"
      class="page-item"
      :class="{active: page.current === p.i}"
    >
      <router-link
        :to="p.link"
        :disabled="p.i < 1 || p.i > page.max"
      >
        {{ p.text }}
      </router-link>
    </li>
    <li
      v-if="page.next"
      class="page-item"
    >
      <router-link
        :to="page.next"
        :disabled="page.current >= page.max"
      >
        <i class="icon ion-ios-arrow-forward" />
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    page: {
      type: Object,
      default: () => {
        return {
          prev: false,
          current: 0,
          list: [],
          next: false
        }
      }
    }
  }
}
</script>

<style lang="scss">
.pagination {
  justify-content: center;
}
</style>
