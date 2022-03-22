/* eslint-disable */
<template>
  <main class="columns is-gapless is-multiline">
    <div class="column is-one-quarter">
      <SideBar />
    </div>
    <div class="column is-three-quarter">
      <FormTask @onSalveTask="saveTask"/>
      <div class="taskList">
        <TaskItem v-for="(item, index) in listTask" :key="index" :item="item"/>
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


export default defineComponent({
  name: "App",
  components: {
    SideBar,
    FormTask,
    TaskItem
  },
  data() {
    return {
      listTask: [] as ITask[]
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
</style>
