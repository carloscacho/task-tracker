/* eslint-disable */
<template>
  <main class="columns is-gapless is-multiline">
    <div class="column is-one-quarter">
      <SideBar />
    </div>
    <div class="column is-three-quarter content">
      <FormTask @onSalveTask="saveTask"/>
      <div class="taskList">
        <TaskItem v-for="(item, index) in listTask" :key="index" :item="item"/>
        <card-text v-if="isEmptyList">
          "Não há nenhuma tarefa finalizada"
        </card-text>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SideBar from "./components/SideBar.vue";
import FormTask from "./components/FormTask.vue";
import TaskItem from "./components/Task.vue";

import ITask from "./interfaces/ITask"
import CardText from "./components/CardText.vue";


export default defineComponent({
  name: "App",
  components: {
    SideBar,
    FormTask,
    TaskItem,
    CardText
  },
  data() {
    return {
      listTask: [] as ITask[]
    }
  },
  computed: {
    isEmptyList(): boolean{
      return this.listTask.length === 0
    }
  },
  methods: {
    saveTask(t: ITask){
      this.listTask.push(t)
    }
  }
});
</script>

<style>
.taskList{
  padding: 2.5rem;
}

main {
  --bg-primary: rgb(240, 240, 240);
  --text-primary: rgb(15, 15, 15);
}
main.dark {
  --bg-primary: #2d2d42;
  --text-primary: #ddd;
}
.content{
  background-color: var(--bg-primary);
  color: var(--text-primary)
}
</style>
