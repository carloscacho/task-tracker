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
import { defineComponent, ref } from "vue";
import { SHOW_ALERT } from "@/store/mutations-types";
import {
  CHANGE_PROJECT_PUT,
  REGISTER_PROJECT_POST,
} from "@/store/actions-types";
import { useStore } from "@/store";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "FormProjects",
  setup(props) {
    const store = useStore();
    const router = useRouter();
    // create ref
    const projectName = ref("");

    // get id of url, for search projectName
    if (props.id) {
      const project = store.state.project.projects.find(
        (proj) => proj.id == props.id
      );
      projectName.value = project?.name || "";
    }

    const notify = (
      alertType: AlertTypes,
      title: string,
      text: string
    ): void => {
      store.commit(SHOW_ALERT, { alert: { id: 0, title, text, alertType } });
    };

    const salvar = () => {
      if (projectName.value == "") {
        notify(
          AlertTypes.DANGER,
          "Ops campo em branco!",
          "Digite um nome valido para o projeto antes de tentar Salvar!"
        );
      } else {
        if (props.id) {
          let project = { id: props.id, name: projectName.value };
          store.dispatch(CHANGE_PROJECT_PUT, project).then(() => {
            notify(
              AlertTypes.WARNING,
              "Projeto Editado!",
              "Pronto o nome do seu projeto foi editado! 👍"
            );
          });
        } else {
          store.dispatch(REGISTER_PROJECT_POST, projectName.value).then(() => {
            notify(
              AlertTypes.SUCCESS,
              "Projeto salvo",
              "Pronto o seu novo projeto está salvo ✌️"
            );
            projectName.value = "";
            router.push("/projects");
          });
        }
      }
    };

    return {
      store,
      projectName,
      salvar,
    };
  },
  props: {
    id: {
      type: String,
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
