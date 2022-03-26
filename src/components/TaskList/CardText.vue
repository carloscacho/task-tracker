<template>
  <div class="card">
    <div class="card-content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CardText",
});
</script>

<style scoped>
.card {
  background: var(--bg-secondary);
}
</style>