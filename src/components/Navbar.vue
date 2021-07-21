<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <router-link class="navbar-item" :to="{ name: 'search' }">
        PREdb
      </router-link>

      <a
        role="button"
        class="navbar-burger"
        :class="{ 'is-active': burgerVisible }"
        aria-label="menu"
        :aria-expanded="burgerVisible"
        @click.prevent="burger"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div class="navbar-menu" :class="{ 'is-active': burgerVisible }">
      <div class="navbar-start">
        <router-link class="navbar-item" :to="{ name: 'stats' }">
          Stats
        </router-link>
        <a
          class="navbar-item"
          href="https://predbdotovh.github.io/pre-api/"
          target="_blank"
        >
          API
        </a>
        <a
          class="navbar-item"
          href="https://telegram.me/predbbot"
          target="_blank"
        >
          Telegram Bot
        </a>
        <a
          class="navbar-item"
          href="https://predb.ovh/api/v1/rss"
          target="_blank"
        >
          RSS
        </a>

        <router-link class="navbar-item" :to="{ name: 'live' }">
          Realtime
        </router-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <label class="checkbox">
            <input v-model="theme" type="checkbox" />
            Dark theme
          </label>
        </div>
        <a
          class="navbar-item"
          href="https://github.com/predbdotovh"
          target="_blank"
        >
          Github
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      burgerVisible: false,
    };
  },
  computed: {
    theme: {
      get() {
        return this.$store.state.darkTheme;
      },
      set(value) {
        this.$store.commit("setDarkTheme", value);
      },
    },
  },
  methods: {
    burger() {
      this.burgerVisible = !this.burgerVisible;
    },
  },
};
</script>
