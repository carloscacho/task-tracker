<template>
  <section>
    <strong class="display isFlex isFlex-direction-row">
      <div>{{ msg }}</div>
      {{ timer }}
    </strong>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "StopwatchView",
  setup(props) {
    const timer = computed((): string =>
      new Date(props.timerInSeconds * 1000).toISOString().substring(11, 19)
    );

    return {
      timer,
    };
  },
  props: {
    timerInSeconds: {
      type: Number,
      default: 0,
    },
    msg: {
      type: String,
      default: "",
    },
  },
  computed: {},
});
</script>

<style>
.display {
  color: var(--text-primary);
}
</style>