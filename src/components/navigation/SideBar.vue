<template>
  <div class="isSmart">
    <HeaderPhone @onChangeModeHeader="changeModeHeader" />
    <div class="likeHeader"></div>
    <div class="timerView">
      <div :class="{ invisible: !visibilityTotal }">
        <button class="button is-success mb-2" @click="initDay">Iniciar o dia</button>
        <total-timer msg="Contador geral " :total="getTotalTimer" />
      </div>
      <div :class="{ invisible: visibilityTotal }">
        <card-text> 
          <span class="textMode">Contador desativado</span>  
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
      <img src="../../assets/logo.png" alt="logo do site" />
    </h1>
    <div class="isNotSmart">
      <i @click="changeModeLight" class="fa-solid fa-sun"></i>
      <i @click="changeMode" :class="buttonIcon"></i>
      <i @click="changeModeDark" class="fa-solid fa-moon"></i>
    </div>
    <div class="isNotSmart">
      <button class="button is-success is-fullwidth mr-4 mb-2 mt-2" :class="{'today':isToday}" @click="initDayWork">Iniciar o dia</button>
      <button class="button is-danger is-fullwidth mr-4 mb-2 mt-2" :class="{'today':!isToday}" @click="finishDayWork">finalizar o dia</button>
      <total-timer :total="getTotalTimer" />
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TotalTimer from "./TotalTimer.vue";
import HeaderPhone from "./HeaderPhone.vue";
import CardText from "../Utils/CardText.vue";
import { useStore } from "../../store";

export default defineComponent({
  name: "SideBar",
  emits: ["onChangeMode"],
  components: {
    TotalTimer,
    HeaderPhone,
    CardText,
  },
  data() {
    return {
      isDarkMode: false,
      visibilityTotal: true,
      store: useStore()
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
    getTotalTimer() {
      return this.$store.state.totalTimer
      // return this.total
    },
    isToday(){
      let today = new Date().toLocaleDateString('en-GB')
      return today === this.$store.state.today
    }
  },
  methods: {
    initDayWork(){
      this.$store.dispatch('initDayWork')
    },
    finishDayWork(){
      this.$store.dispatch('cleanTotalTimer')
    },
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
.today{
  visibility: hidden;
  height: 0;
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
