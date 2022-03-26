/* eslint-disable */
<template>
  <main class="columns is-gapless is-multiline" :class="{'dark': isDarkMode}">
    <div class="column is-one-quarter">
      <SideBar @onChangeMode="changeMode" />
    </div>
    <div class="column is-three-quarter content">
      <FormTask @onSalveTask="saveTask" />
      <div class="taskList">
        <TaskItem v-for="(item, index) in getItens" :key="index" :item="item" />
        <card-text v-if="isEmptyList">
          <span class="textMode"> "Não há nenhuma tarefa finalizada" </span> 
        </card-text>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from './store'
import SideBar from "./components/navigation/SideBar.vue";
import FormTask from "./components/formView/FormTask.vue";
import TaskItem from "./components/TaskList/Task.vue";

import ITask from "./interfaces/ITask";
import CardText from "./components/TaskList/CardText.vue";



export default defineComponent({
  name: "App",
  components: {
    SideBar,
    FormTask,
    TaskItem,
    CardText,
  },
  data() {
    return {
      store: useStore(),
      isDarkMode: false
    };
  },
  computed: {
    isEmptyList(): boolean {
      return this.$store.state.data.length === 0;
    },
    getItens(): ITask[] {
      return this.$store.state.data
    }
  },
  methods: {
    saveTask(t: ITask) {
      this.$store.dispatch('addItem', {item:t})
      this.$store.dispatch('incrementTotal', {time: t.timerInSeconds})
    },
    changeMode(isDarkMode: boolean) {
      this.isDarkMode = isDarkMode;
    },
  },
});
</script>

<style>
.taskList {
  padding: 2.5rem;
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
</style>
