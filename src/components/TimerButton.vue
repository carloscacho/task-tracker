<template>
  <button class="button" @click="action" :disabled="disable - button">
    <span class="icon">
      <i :class="icon - button"></i>
    </span>
    <span>{{ title }}</span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TimerButton",
  props: {
    disableButton: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
    },
    iconButton: {
      type: String,
    },
    action: {
      type: Function,
    },
  },
});
</script>
