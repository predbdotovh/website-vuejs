<template>
  <ul class="pagination" v-if="page.max > 0">
    <li class="page-item" :class="{active: page.current === p.i}" v-for="p in page.list">
      <router-link :to="p.link" :disabled="p.i < 1 || p.i > page.max">{{p.text}}</router-link>
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
.pagination .page-item.active a {
  background: #5764c6;
  color: #fff;
}
</style>
