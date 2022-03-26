<template>
  <div class="box has-text-weight-bold">
    <div class="columns">
      <div class="column is-7">
        {{ item.description || "Tarefa sem descrição" }}
      </div>
      <div class="column is-3">
        <StopwatchView :timerInSeconds="item.timerInSeconds" />
      </div>
      <div class="column is-flex is-align-items-center is-justify-content-end">
        <button class="button is-warning mr-2">
          <i class="fa fa-pencil"></i>
        </button>
        <button class="button is-danger" @click="this.delete">
          <i class="fa fa-trash"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import StopwatchView from "../formView/StopwatchView.vue";
import ITask from "../../interfaces/ITask";

export default defineComponent({
  name: "TaskItem",
  components: {
    StopwatchView,
  },
  props: {
    item: {
      type: Object as PropType<ITask>,
    },
  },
  methods: {
    delete() {
      this.$store.dispatch("deleteItem", this.item);
    },
  },
});
</script>

<style scoped>
.box {
  background: var(--bg-secondary);
  color: var(--text-primary);
}
</style>
