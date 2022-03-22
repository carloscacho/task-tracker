<template>
  <section>
    <strong>
      {{ timer }}
    </strong>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "StopwatchView",
  props: {
    timerInSeconds: {
      type: Number,
      default: 0
    }
  },
  computed: {
    timer() : string {
      return new Date(this.timerInSeconds * 1000)
        .toISOString()
        .substring(11, 19);
    },
  },
});
</script>
