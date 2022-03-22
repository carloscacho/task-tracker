<template>
  <div class="box">
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
      console.log(this.description+ " tempo: " + timeStop)
      this.description = ''
    }
  }
});
</script>
