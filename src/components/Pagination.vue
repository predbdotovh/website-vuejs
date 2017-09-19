<template>
  <ul class="pagination">
    <li class="page-item" v-if="page.prev">
      <router-link :to="page.prev" :disabled="page.current <= 1">Prev</router-link>
    </li>
    <li class="page-item" :class="{active: page.current === p.i}" :key="p.i" v-for="p in page.list">
      <router-link :to="p.link" :disabled="p.i < 1 || p.i > page.max">{{p.text}}</router-link>
    </li>
    <li class="page-item" v-if="page.next">
      <router-link :to="page.next" :disabled="page.current >= page.max">Next</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'pagination',
  props: {
    page: {
      type: Object,
      default: {}
    }
  }
}
</script>

<style>
.pagination {
  justify-content: center;
}
</style>
