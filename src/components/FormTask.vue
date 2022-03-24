<template>
  <div class="box formTime">
    <div class="columns">
      <div
        class="column is-8"
        role="form"
        aria-label="Formulário para criação de uma nova tarefa"
      >
        <input
          type="text"
          class="input"
          placeholder="Qual tarefa você deseja iniciar?"
          v-model="description"
        />
      </div>
      <div class="column">
        <TimerMachine @onTimerEnd="finishTask" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TimerMachine from "./TimerMachine.vue"


export default defineComponent({
  name: "FormTask",
  emits: ['onSalveTask'],
  components: {
    TimerMachine
  },
  data(){
    return {
      description: ''
    }
  },
  methods: {
    finishTask(timeStop: number): void{
      
      this.$emit('onSalveTask', {
        timerInSeconds: timeStop,
        description: this.description
      })
      this.description = ''
    },

  }
});
</script>

<style>
  .formTime{
    background-color: var(--bg-secondary);
    color: var(--text-primary);
  }
</style>