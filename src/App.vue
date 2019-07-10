<template>
  <div id="app">
    <header class="navbar">
      <section class="navbar-section">
        <router-link
          class="btn btn-link navbar-brand"
          :to="{name: 'search'}"
        >
          <i class="icon ion-md-home" /> PREdb
        </router-link>
        <router-link
          class="btn btn-link"
          :to="{name: 'stats'}"
        >
          <i class="icon ion-ios-pulse" /> Stats
        </router-link>
        <a
          class="btn btn-link"
          href="https://predbdotovh.github.io/pre-api/"
          target="_blank"
        >
          <i class="icon ion-ios-book" /> API
        </a>
        <a
          class="btn btn-link"
          href="https://telegram.me/predbbot"
          target="_blank"
        >
          <i class="icon ion-ios-chatbubbles" /> Telegram Bot
        </a>
      </section>
      <section class="navbar-center">
        <router-link
          class="btn btn-link"
          :to="{name: 'live'}"
        >
          <i class="icon ion-md-play" /> Realtime
        </router-link>
      </section>
      <section class="navbar-section">
        <a
          class="btn btn-link"
          href="https://github.com/predbdotovh"
          target="_blank"
        >
          <i class="icon ion-logo-github" /> Github
        </a>
      </section>
    </header>
    <div class="content">
      <router-view />
    </div>
    <vue-progress-bar />
  </div>
</template>

<style src="spectre.css/docs/dist/spectre.min.css"></style>
<style src="@/assets/css/app.css"></style>
<style src="ionicons/dist/css/ionicons.css"></style>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.navbar {
  i.icon {
    font-size: 1rem;
  }
  a {
    &.router-link-exact-active {
      font-weight: bold;
    }
  }
}

/* Small-ish margins on main container */
.content {
  margin: 0 12px;
}
@media (max-width: 600px) {
  .content {
    margin: 0 4px;
  }
}
</style>
