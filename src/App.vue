<template>
  <main class="columns is-gapless is-multiline" :class="{ dark: isDarkMode }">
    <div class="column is-one-quarter">
      <SideBar @onChangeMode="changeMode" />
    </div>
    <div class="column is-three-quarter content">
      <!-- Aqui será renderizado a view correspondente -->
      <router-view></router-view>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SideBar from "./components/navigation/SideBar.vue";

export default defineComponent({
  name: "App",
  components: {
    SideBar,
  },
  data() {
    return {
      isDarkMode: false,
    };
  },
  methods: {
    changeMode(isDarkMode: boolean) {
      this.isDarkMode = isDarkMode;
    },
  },
});
</script>

<style>
.taskList {
  padding: 2.5rem;
}
@media only screen and (max-width: 768px) {
  .taskList {
    height: calc(100vh - 52px - 32px - 96px - 144px - 1.5rem);
  }
}
main {
  --bg-primary: rgb(255, 255, 255);
  --bg-secondary: rgb(197, 213, 248);
  --text-primary: rgb(15, 15, 15);
}
main.dark {
  --bg-primary: #2d2d42;
  --bg-secondary: rgb(98, 147, 253);
  --text-primary: rgb(240, 240, 240);
}
.content {
  background-color: var(--bg-primary);
  color: var(--text-primary);
}
.textMode {
  font-weight: bold;
  color: var(--text-primary);
}
div.vcpg {
  --base-color: rgb(98, 147, 253) !important;
  --border-color: rgb(98, 147, 253) !important;
  --bg-color-header: rgb(98, 147, 253) !important;
  --bg-color-header-hover: rgb(98, 147, 253) !important;
  --bg-color-header-active: rgb(98, 147, 253) !important;
  --bg-color-body: var(--bg-primary) !important;
}
</style>
