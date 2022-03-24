/* eslint-disable */
<template>
  <header>
    <h1>
      <img src="../assets/logo.png" alt="logo do site" />
    </h1>
    <div>
      <i @click="changeModeLight" class="fa-solid fa-sun"></i>
      <i @click="changeMode" :class="buttonIcon"></i>
      <i @click="changeModeDark" class="fa-solid fa-moon"></i>
    </div>
    <total-timer :total="total"/>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TotalTimer from "./TotalTimer.vue";

export default defineComponent({
  name: "SideBar",
  emits: ["onChangeMode"],
  props:{
    total: {
      type: Number
    }
  },
  components: {
    TotalTimer,
  },
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
      this.$emit("onChangeMode", this.isDarkMode);
    },
    changeModeDark() {
      this.isDarkMode = true;
      this.$emit("onChangeMode", this.isDarkMode);
    },
    changeModeLight() {
      this.isDarkMode = false;
      this.$emit("onChangeMode", this.isDarkMode);
    },
  },
});
</script>

<style scoped>
header {
  padding: 2rem;
  background: #0d3b66;
  width: 100%;
  height: 100vh;
  text-align: center;
}
i {
  font-size: 30px;
  margin: 10px;
  color: aliceblue;
}
@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}
</style>
