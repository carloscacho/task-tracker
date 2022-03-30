<template>
  <section class="taskList">
    <h1 class="title">Atividades finalizadas</h1>
    <div v-if="!isEmptyOldList">
      <article class="panel mt-4">
        <div class="p-4">
          <TaskList
            v-for="item in getOldItens"
            :key="item.id"
            :oldDate="item.day"
            :oldTotalTimer="item.totalTimer"
            :expanded="false"
          >
            <TaskItem
              v-for="it in item.data"
              :key="it.id"
              :item="it"
              :showBtns="false"
            />
          </TaskList>
        </div>
      </article>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TaskItem from "../components/TaskList/Task.vue";
import TaskList from "../components/TaskList/TaskList.vue";

export default defineComponent({
  name: "OldTaskView",
  components: {
    TaskItem,
    TaskList,
  },
  computed: {
    getOldItens() {
      return this.$store.state.OldTrackers;
    },
    isEmptyOldList(): boolean {
      console.log(this.$store.state.OldTrackers);
      return this.$store.state.OldTrackers.length === 0;
    },
  },
});
</script>

<style scoped>
.taskList {
  padding: 2.5rem;
}
.panel {
  border: 2px solid var(--bg-secondary);
}
.title {
  color: var(--text-primary);
}

@media only screen and (max-width: 768px) {
  .taskList {
    height: calc(100vh - 52px - 32px - 96px - 144px - 1.5rem);
  }
}

</style>
