<template>
  <div id="app" :class="$store.getters.appTheme">
    <Navbar />
    <div>
      <router-view />
    </div>
    <vue-progress-bar />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar,
  },
};
</script>

<style src="@/assets/css/app.scss" lang="scss"></style>
<style src="bulma/bulma.sass" lang="sass"></style>
