<template>
  <main class="columns is-gapless is-multiline" :class="{ dark: isDarkMode }">
    <div class="column is-one-quarter">
      <SideBar @onChangeMode="changeMode" />
    </div>
    <div class="column is-three-quarter content">
      <FormTask @onSalveTask="saveTask" />
      <div class="taskList">
        <TaskList
          v-if="!isEmptyList"
          :oldTotalTimer="getTotalTimer"
          :expanded="true"
        >
          <TaskItem
            v-for="(item, index) in getItens"
            :key="index"
            :item="item"
          />
        </TaskList>
        <card-text v-if="isEmptyList">
          <span class="textMode">
            "Não há nenhuma tarefa finalizada hoje"
          </span>
        </card-text>
        <div v-if="!isEmptyOldList">
          <article class="panel mt-4">
            <p class="panel-heading">Atividades antigamente finalizada</p>
            <div class="p-4">
              <TaskList
                v-for="item in getOldItens"
                :key="item.id"
                :oldDate="item.day"
                :oldTotalTimer="item.totalTimer"
                :expanded="false"
              >
                <TaskItem v-for="it in item.data" :key="it.id" :item="it" />
              </TaskList>
            </div>
          </article>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "./store";
import SideBar from "./components/navigation/SideBar.vue";
import FormTask from "./components/formView/FormTask.vue";
import TaskItem from "./components/TaskList/Task.vue";
import TaskList from "./components/TaskList/TaskList.vue";

import ITask from "./interfaces/ITask";
import CardText from "./components/Utils/CardText.vue";

export default defineComponent({
  name: "App",
  components: {
    SideBar,
    FormTask,
    TaskItem,
    CardText,
    TaskList,
  },
  data() {
    return {
      store: useStore(),
      isDarkMode: false,
    };
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
  --bg-color-header: #0d3b66;
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
