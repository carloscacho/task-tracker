<template>
  <nav class="navbar isSmart" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <img src="../../assets/icon-logo.png" width="32" height="40" />
        <span class="textMode">Task Tracker</span>
      </a>
      <div class="btns is-flex is-justify-content-end is-align-self-center">
        <div>
          <i @click="changeModeLight" class="fa-solid fa-sun"></i>
          <i @click="changeMode" :class="buttonIcon"></i>
          <i @click="changeModeDark" class="fa-solid fa-moon"></i>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HeaderPhone",
  emits: ["onChangeModeHeader"],
  data() {
    return {
      isDarkMode: false,
    };
  },
  computed: {
    buttonIcon() {
      return !this.isDarkMode
        ? "fa-solid fa-toggle-off"
        : "fa-solid fa-toggle-on";
    },
  },
  methods: {
    changeMode() {
      this.isDarkMode = !this.isDarkMode;
      this.$emit("onChangeModeHeader", this.isDarkMode);
    },
    changeModeDark() {
      this.isDarkMode = true;
      this.$emit("onChangeModeHeader", this.isDarkMode);
    },
    changeModeLight() {
      this.isDarkMode = false;
      this.$emit("onChangeModeHeader", this.isDarkMode);
    },
  },
});
</script>

<style scoped>
.navbar {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
}
.textMode {
  padding-left: 10px;
}
@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
  i {
    font-size: 30px;
    margin: 10px;
  }
  .isSmart {
    visibility: visible;
  }

  .isNotSmart {
    visibility: hidden;
  }
  .btns {
    margin-left: auto;
  }
}
</style>