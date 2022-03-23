<template>
  <div class="card">
  <div class="card-content">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CardText',
})
</script>
