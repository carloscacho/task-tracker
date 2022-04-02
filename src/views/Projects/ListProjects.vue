<template>
  <section>
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
            <router-link
              :to="`/projects/edit/${proj.id}`"
              class="button is-warning"
            >
              <span class="icon is-small">
                <i class="fa-solid fa-pencil-alt"></i>
              </span>
              <span class="isNotSmart">Editar</span>
            </router-link>
            <button class="button ml-2 is-danger" @click="deleteProject(proj.id)">
              <span class="icon is-small">
                <i class="fa-solid fa-trash"></i>
              </span>
              <span class="isNotSmart">Apagar</span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>


<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ListProjects",
  methods: {
    deleteProject(id: string) {
      this.$store.commit("deleteProject", {id})
    }
  },
  computed: {
    getProjects() {
      return this.$store.state.projects;
    },
  },
});
</script>

<style scoped>
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
