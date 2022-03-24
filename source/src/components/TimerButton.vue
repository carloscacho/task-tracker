<template>
  <button class="button" @click="action" :disabled="disableButton">
    <span class="icon">
      <i :class="iconButton"></i>
    </span>
    <span>{{ title }}</span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TimerButton",
  emits: ['action'],
  methods: {
    action(): void {
      this.$emit('action')
    }
  },
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
      default: "",
    },
  },
});
</script>
