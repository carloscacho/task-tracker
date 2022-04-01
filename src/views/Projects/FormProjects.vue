<template>
  <section class="projects">
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
  </section>
</template>


<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FormProjects",
  data() {
    return {
      projectName: "",
    };
  },
  props: {
    id: {
      type: String,
    },
  },
  mounted() {
    if (this.id) {
      const project = this.$store.state.projects.find(
        (proj) => proj.id == this.id
      );
      this.projectName = project?.name || "";
    }
  },
  methods: {
    salvar() {
      if (this.id) {
        let project = {
          id: this.id,
          name: this.projectName,
        };
        this.$store.dispatch("editProject", { id: this.id, project });
      } else {
        this.$store.dispatch("addProject", { name: this.projectName });
      }
      this.projectName = "";
      this.$router.push("/projects");
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
</style>
