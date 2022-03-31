<template>
  <section class="projects">
    <h1 class="title">Projetos</h1>
    <router-link to="/projects/new" class="button is-success">
      <span class="icon is-small">
        <i class="fas fa-plus"></i>
      </span>
      <span>Novo Projeto</span>
    </router-link>
    <table class="table mt-3 is-fullwidth is-striped is-narrow is-hoverable">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="proj in getProjects" :key="proj.id">
          <td>{{ proj.id }}</td>
          <td>{{ proj.name }}</td>
          <td>
            <router-link :to="`/projetos/${proj.id}/edit`" class="button is-warning">
              <span class="icon is-small">
                <i class="fa-solid fa-pencil-alt"></i>
              </span>
              <span class="isNotSmart">Editar</span>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>


<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FormView",
  computed: {
    getProjects() {
      return this.$store.state.projects;
    },
  },
});
</script>

<style scoped>
.projects {
  padding: 1.5rem;
  height: calc(100vh - 52px - 32px - 96px - 144px);
}

.title,
.label {
  color: var(--text-primary);
}

th,
td {
  background-color: var(--bg-primary);
  color: var(--text-primary) !important;
}
@media only screen and (max-width: 768px) {
  .isNotSmart {
    visibility: hidden;
    width: 0;
  }
}
</style>
