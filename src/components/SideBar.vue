/* eslint-disable */
<template>
  <div class="isSmart">
    <HeaderPhone @onChangeModeHeader="changeModeHeader" />
    <header>
      <p style="color:white"></p>
    </header>
    <total-timer msg="Cronometro geral " :total="total" />
  </div>
  <header>
    <h1 class="isNotSmart">
      <img src="../assets/logo.png" alt="logo do site" />
    </h1>
    <div class="isNotSmart">
      <i @click="changeModeLight" class="fa-solid fa-sun"></i>
      <i @click="changeMode" :class="buttonIcon"></i>
      <i @click="changeModeDark" class="fa-solid fa-moon"></i>
    </div>
    <div class="isNotSmart">
      <total-timer :total="total" />
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TotalTimer from "./TotalTimer.vue";
import HeaderPhone from "./HeaderPhone.vue";

export default defineComponent({
  name: "SideBar",
  emits: ["onChangeMode"],
  props: {
    total: {
      type: Number,
    },
  },
  components: {
    TotalTimer,
    HeaderPhone,
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
    changeModeHeader(darkMode: boolean) {
      this.isDarkMode = darkMode;
      this.$emit("onChangeMode", this.isDarkMode);
    },
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
@media only screen and (min-width: 768px) {
.isSmart {
    visibility: hidden;
    height: 0;
  }

  .isNotSmart {
    visibility: visible;
  }
}


@media only screen and (max-width: 768px) {
  header {
    padding: 0.5rem;
    height: auto;
  }

  .isSmart {
    visibility: visible;
  }

  .isNotSmart {
    visibility: hidden;
    height: 0;
  }
}
</style>
