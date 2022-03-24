<template>
  <div class="box has-text-weight-bold">
    <div class="columns">
      <div class="column is-7">{{item.description || 'Tarefa sem descrição'}}</div>
      <div class="column">
        <StopwatchView :timerInSeconds="item.timerInSeconds"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import StopwatchView from "./StopwatchView.vue";
import ITask from '../interfaces/ITask'

export default defineComponent({
  name: "TaskItem",
  components: {
    StopwatchView,
  },
  props: {
    item: {
      type: Object as PropType<ITask>
    }
  }
});
</script>

<style scoped>
.box{
  background: #aecaff;
}
</style>
