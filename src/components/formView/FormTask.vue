<template>
  <div class="box formTime">
    <p v-if="!newDay">Click em iniciar o dia para ativar o tracker</p>
    <div v-if="newDay" class="columns">
      <div
        class="column is-4"
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
      <div class="column is-3">
        <div class="select">
          <select v-model="idProject">
            <option value="">Selecione um projeto</option>
            <option 
              :value="project.id"
              v-for="project in getProjects"
              :key="project.id"
            >{{project.name}}</option>
          </select>
        </div>
      </div>
      <div class="column is-5">
        <TimerMachine @onTimerEnd="finishTask" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { computed, defineComponent, ref } from "vue";
import TimerMachine from "./TimerMachine.vue";

export default defineComponent({
  name: "FormTask",
  emits: ["onSalveTask"],
  setup(props, context) {
    const store = useStore()

    const description = ref("")
    const idProject = ref("")

    const projects = computed(() => store.state.project.projects)
    const newDay = computed(() => store.state.today !== "")
    const getProjects = computed(() => store.state.project.projects)

    const finishTask = (timeStop: number): void => {
      context.emit("onSalveTask", {
        id: new Date().toISOString() + Math.random().toString(),
        timerInSeconds: timeStop,
        description: description.value,
        project: projects.value.find(proj => proj.id == idProject.value)
      });
      description.value = "";
    }

    return {
      description,
      idProject,
      finishTask,
      projects,
      newDay,
      getProjects
    }
  },
  components: {
    TimerMachine,
  }
});
</script>

<style>
.formTime {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
}
</style>