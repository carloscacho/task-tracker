/* eslint-disable */
<template>
  <main class="columns is-gapless is-multiline" :class="{'dark': isDarkMode}">
    <div class="column is-one-quarter">
      <SideBar @onChangeMode="changeMode" :total="totalTimer" />
    </div>
    <div class="column is-three-quarter content">
      <FormTask @onSalveTask="saveTask" />
      <div class="taskList">
        <TaskItem v-for="(item, index) in listTask" :key="index" :item="item" />
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
import SideBar from "./components/SideBar.vue";
import FormTask from "./components/FormTask.vue";
import TaskItem from "./components/Task.vue";

import ITask from "./interfaces/ITask";
import CardText from "./components/CardText.vue";



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
      listTask: [] as ITask[],
      isDarkMode: false,
      totalTimer: 0
    };
  },
  computed: {
    isEmptyList(): boolean {
      return this.listTask.length === 0;
    },
  },
  methods: {
    saveTask(t: ITask) {
      this.listTask.push(t);
      this.totalTimer += t.timerInSeconds;
      this.$store.dispatch({type:'incrementTotal', time: t.timerInSeconds})
      console.log("change value: ", this.totalTimer)
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
