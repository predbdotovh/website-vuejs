<template>
  <div id="app">
    <header class="navbar">
      <section class="navbar-section">
        <router-link class="btn btn-link navbar-brand" :to="{name: 'search'}">PREdb</router-link>
        <router-link class="btn btn-link" :to="{name: 'live'}">Live</router-link>
        <router-link class="btn btn-link"  :to="{name: 'stats'}">Stats</router-link>
        <a class="btn btn-link"  href="https://predbdotovh.github.io/pre-api/">API</a>
        <a class="btn btn-link"  href="https://telegram.me/predbbot">Telegram Bot</a>
        <a class="btn btn-link"  href="https://github.com/predbdotovh">Github</a>
      </section>
      <section class="navbar-section"></section>
    </header>
    <div class="content">
      <router-view></router-view>
    </div>
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style src="spectre.css/docs/dist/spectre.min.css"></style>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
