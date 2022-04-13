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
import { AlertTypes } from "@/interfaces/IAlert";
import { defineComponent } from "vue";
import { notifyMixin } from "@/mixins/notify";
import {
  SHOW_ALERT,
} from "@/store/mutations-types";
import { CHANGE_PROJECT_PUT, REGISTER_PROJECT_POST } from "@/store/actions-types";

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
  mixins: [notifyMixin],
  methods: {
    salvar() {
      if (this.projectName == "") {
        this.$store.commit(SHOW_ALERT, {
          alert: {
            id: 0,
            title: "Ops campo em branco!",
            text: "Digite um nome valido para o projeto antes de tentar Salvar!",
            alertType: AlertTypes.DANGER,
          },
        });
        return;
      }
      if (this.id) {
        let project = {
          id: this.id,
          name: this.projectName,
        };
        // Commit para editar em local storage
        // this.$store.commit(EDIT_PROJECTS, { id: this.id, project });
        // dispatch para editar em banco de dados remoto
        this.$store.dispatch(CHANGE_PROJECT_PUT, project).then(() => {
          this.notify(
            AlertTypes.WARNING,
            "Projeto Editado!",
            "Pronto o nome do seu projeto foi editado! 👍"
          );
        });
      } else {
        // Commit para salvamento em local storage
        // this.$store.commit(ADD_PROJECTS, { name: this.projectName });
        // dispatch para salvamento em banco de dados remoto
        this.$store.dispatch(REGISTER_PROJECT_POST, this.projectName).then(() => {
          this.notify(
            AlertTypes.SUCCESS,
            "Projeto salvo",
            "Pronto o seu novo projeto está salvo ✌️"
          );
          this.projectName = "";
          this.$router.push("/projects");
        });
      }
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
