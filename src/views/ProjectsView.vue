<template>
  <div class="projects">
    <h1 class="title">Projetos</h1>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ProjectsView'
})
</script>


<style scoped>
.title,
.label {
  color: var(--text-primary);
}
.projects {
  padding: 1.5rem;
  height: calc(100vh - 52px - 32px - 96px - 144px);
}
</style>