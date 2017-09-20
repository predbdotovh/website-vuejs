<template>
  <div id="app">
    <header class="navbar">
      <section class="navbar-section">
        <router-link class="btn btn-link navbar-brand" :to="{name: 'search'}">
          <i class="ion-home"></i> PREdb
        </router-link>
        <router-link class="btn btn-link" :to="{name: 'stats'}">
          <i class="ion-ios-pulse-strong"></i> Stats
        </router-link>
        <a class="btn btn-link" href="https://predbdotovh.github.io/pre-api/" target="_blank">
          <i class="ion-ios-book"></i> API
        </a>
        <a class="btn btn-link" href="https://telegram.me/predbbot" target="_blank">
          <i class="ion-chatbubbles"></i> Telegram Bot
        </a>
      </section>
      <section class="navbar-center">
        <router-link class="btn btn-link" :to="{name: 'live'}">
          <i class="ion-play"></i> Realtime
        </router-link>
      </section>
      <section class="navbar-section">
        <a class="btn btn-link" href="https://github.com/predbdotovh" target="_blank">
          <i class="ion-social-github"></i> Github
        </a>
      </section>
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
<style src="@/assets/css/spectre-fixes.css"></style>
<style src="@/assets/css/app.css"></style>
<style src="ionicons/css/ionicons.css"></style>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
