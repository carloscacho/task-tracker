<template>
  <card-text>
    <stopwatch-view :timerInSeconds="total" :msg="msg" />
  </card-text>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CardText from "./TaskList/CardText.vue";
import StopwatchView from "./formView/StopwatchView.vue";

export default defineComponent({
  name: "TotalTimer",
  props: {
    total: {
      type: Number
    },
    msg: {
      type: String,
      default: ""
    }
  },
  components: {
    CardText,
    StopwatchView,
  },
});
</script>
