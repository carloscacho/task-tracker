<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <StopwatchView :timerInSeconds="timerInSeconds" />

    <timer-button
      :icon-button='"fas fa-play"'
      :action="iniciar"
      :disable-button="timerRunner"
      :title='"iniciar"'
    />
    <timer-button
      :icon-button='"fas fa-stop"'
      :action="finalizar"
      :disable-button="!timerRunner"
      :title='"parar"'
    />

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import StopwatchView from "./StopwatchView.vue";
import TimerButton from "./TimerButton.vue";

export default defineComponent({
  name: "TimerMachine",
  emits: ["onTimerEnd"],
  components: {
    StopwatchView,
    TimerButton,
  },
  data() {
    return {
      timerInSeconds: 0,
      timerRef: 0,
      timerRunner: false,
    };
  },
  methods: {
    iniciar() {
      // começar a contar
      this.timerRef = setInterval(() => {
        this.timerInSeconds += 1;
      }, 1000);
      this.timerRunner = true;
      console.log("iniciando");
    },
    finalizar() {
      this.timerRunner = false;
      console.log("finalizando");
      clearInterval(this.timerRef);
      this.$emit("onTimerEnd", this.timerInSeconds);
      this.timerInSeconds = 0;
    },
  },
});
</script>
