<template>
  <FormTask @onSalveTask="saveTask" />
  <div class="taskList">
    <TaskList
      v-if="!isEmptyList"
      :oldTotalTimer="getTotalTimer"
      :expanded="true"
    >
      <TaskItem v-for="(item, index) in getItens" :key="index" :item="item" />
    </TaskList>
    <card-text v-if="isEmptyList">
      <span class="textMode"> "Não há nenhuma tarefa finalizada hoje" </span>
    </card-text>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FormTask from "../components/formView/FormTask.vue";
import TaskItem from "../components/TaskList/Task.vue";
import TaskList from "../components/TaskList/TaskList.vue";

import ITask from "../interfaces/ITask";

export default defineComponent({
  name: "TaskView",
  components: {
    FormTask,
    TaskItem,
    TaskList,
  },
  computed: {
    getTotalTimer() {
      return this.$store.state.totalTimer;
    },
    getOldItens() {
      return this.$store.state.OldTrackers;
    },
    isEmptyList(): boolean {
      return this.$store.state.data.length === 0;
    },
    isEmptyOldList(): boolean {
      console.log(this.$store.state.OldTrackers);
      return this.$store.state.OldTrackers.length === 0;
    },
    getItens(): ITask[] {
      return this.$store.state.data;
    },
  },
  methods: {
    saveTask(t: ITask) {
      this.$store.dispatch("addItem", { item: t });
      this.$store.dispatch("incrementTotal", { time: t.timerInSeconds });
    },
  },
});
</script>

<style scoped>
.taskList {
  padding: 2.5rem;
}
.panel-heading {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
}
.panel {
  border: 2px solid var(--bg-secondary);
}

@media only screen and (max-width: 768px) {
  .taskList {
    height: calc(100vh - 52px - 32px - 96px - 144px - 1.5rem);
  }
}
main {
  --bg-primary: rgb(255, 255, 255);
  --bg-secondary: rgb(197, 213, 248);
  --text-primary: rgb(15, 15, 15);
}
main.dark {
  --bg-primary: #2d2d42;
  --bg-secondary: rgb(98, 147, 253);
  --text-primary: rgb(240, 240, 240);
}
.content {
  background-color: var(--bg-primary);
  color: var(--text-primary);
}
.textMode {
  font-weight: bold;
  color: var(--text-primary);
}
div.vcpg {
  --base-color: rgb(98, 147, 253) !important;
  --border-color: rgb(98, 147, 253) !important;
  --bg-color-header: rgb(98, 147, 253) !important;
  --bg-color-header-hover: rgb(98, 147, 253) !important;
  --bg-color-header-active: rgb(98, 147, 253) !important;
  --bg-color-body: var(--bg-primary) !important;
}
</style>
