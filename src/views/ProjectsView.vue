<template>
  <section class="projects">
    <h1 class="title">Projetos</h1>
    <form @submit.prevent="salvar">
      <div class="field">
        <label for="nomeDoProjeto" class="label">Nome do Projeto</label>
        <input
          type="text"
          class="input"
          v-model="projectName"
          id="projectName"
        />
      </div>
      <div class="field">
        <button class="button" type="submit">Salvar</button>
      </div>
    </form>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="proj in projects" :key="proj.id">
          <th>{{ proj.id }}</th>
          <th>{{ proj.name }}</th>
        </tr>
      </tbody>
    </table>
  </section>
</template>


<script lang="ts">
import { defineComponent } from "vue";
import IProject from "../interfaces/IProjects";

export default defineComponent({
  name: "ProjectsView",
  data() {
    return {
      projectName: "",
      projects: [] as IProject[],
    };
  },
  methods: {
    salvar() {
      const project: IProject = {
        id: new Date().toISOString(),
        name: this.projectName,
      };
      this.projects.push(project);
      this.projectName = "";
    },
  },
});
</script>

<style scoped>
.projects {
  padding: 1.5rem;
}
</style>
