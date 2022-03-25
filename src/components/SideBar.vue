/* eslint-disable */
<template>
  <div class="isSmart">
    <HeaderPhone @onChangeModeHeader="changeModeHeader" />
    <div class="likeHeader"></div>
    <div class="timerView">
      <div :class="{ invisible: !visibilityTotal }">
        <total-timer msg="Contador geral " :total="total" />
      </div>
      <div :class="{ invisible: visibilityTotal }">
        <card-text> 
          <span class="disableTimer">Contador desativado</span>  
        </card-text>
      </div>

      <button class="button is-success is-rounded" @click="changeVisibility">
        <span class="icon is-small eyes">
          <i :class="buttonIconEye"></i>
        </span>
      </button>
    </div>
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
import CardText from "./CardText.vue";

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
    CardText,
  },
  data() {
    return {
      isDarkMode: false,
      visibilityTotal: true,
    };
  },
  computed: {
    buttonIcon() {
      return !this.isDarkMode
        ? "fa-solid fa-toggle-off"
        : "fa-solid fa-toggle-on";
    },
    buttonIconEye() {
      return this.visibilityTotal ? "fa fa-eye" : "fa fa-eye-slash";
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
    changeVisibility() {
      this.visibilityTotal = !this.visibilityTotal;
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
.invisible {
  visibility: hidden;
  height: 0;
}
.likeHeader {
  padding: 0.5rem;
  background: #0d3b66;
}
.disableTimer {
  font-weight: bold;
  color: var(--text-primary);
}
.timerView {
  padding-left: 30px;
  padding-right: 30px;
  background: #0d3b66;
}
i {
  font-size: 30px;
  margin: 10px;
  color: aliceblue;
}
.eyes > i {
  font-size: 20px;
  margin: 0;
  padding: 0;
}
.is-rounded {
  position: absolute;
  right: 10px;
  top: 100px;
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
