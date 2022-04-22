<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <StopwatchView :timerInSeconds="timerInSeconds" />

    <timer-button
      :icon-button="'fas fa-play'"
      @action="iniciar"
      :disable-button="timerRunner"
      color="is-success"
      :title="'iniciar'"
    />
    <timer-button
      :icon-button="'fas fa-pause'"
      @action="pausar"
      :disable-button="!timerRunner"
      color="is-warning"
      :title="'pause'"
    />
    <timer-button
      :icon-button="'fas fa-stop'"
      @action="finalizar"
      :disable-button="!timerRunner"
      color="is-danger"
      :title="'parar'"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import StopwatchView from "./StopwatchView.vue";
import TimerButton from "../Utils/TimerButton.vue";

export default defineComponent({
  name: "TimerMachine",
  emits: ["onTimerEnd"],
  components: {
    StopwatchView,
    TimerButton,
  },
  setup(props, context) {
    let timerInSeconds = ref(0);
    let timerRef = ref(0);
    let timerRunner = ref(false);

    const iniciar = () => {
      // começar a contar
      timerRef.value = setInterval(() => {
        timerInSeconds.value += 1;
      }, 1000);
      timerRunner.value = true;
    }

    const pausar = () => {
      timerRunner.value = false;
      clearInterval(timerRef.value);
    }

    const finalizar = () => {
      timerRunner.value = false;
      clearInterval(timerRef.value);
      context.emit("onTimerEnd", timerInSeconds.value);
      timerInSeconds.value = 0;
    }


    return {
      timerInSeconds,
      timerRef,
      timerRunner,
      iniciar,
      pausar,
      finalizar
    };
  },
});
</script>
