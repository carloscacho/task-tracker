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
            <button
              class="button ml-2 is-danger"
              @click="deleteProject(proj.id)"
            >
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
import { AlertTypes } from "@/interfaces/IAlert";
import { notifyMixin } from "@/mixins/notify";
import { defineComponent } from "vue";
import { useStore } from "@/store";
import { DELETE_PROJECTS } from "@/store/mutations-types";
import {
  ACQUIRE_PROJECTS_GET,
  REMOVE_PROJECT_DELETE,
} from "@/store/actions-types";

export default defineComponent({
  name: "ListProjects",
  mixins: [notifyMixin],
  methods: {
    deleteProject(id: string) {
      // this.$store.commit(DELETE_PROJECTS, {id})
      this.$store.dispatch(REMOVE_PROJECT_DELETE, id).then(() => {
        this.notify(
          AlertTypes.DANGER,
          "Projeto Removido",
          "Pronto foi removido! 👀, mas as atividades realizadas com ele permanecem! 🙌"
        );
      });
    },
  },
  computed: {
    getProjects() {
      return this.$store.state.projects.slice(0).reverse();
    },
  },
  setup() {
    const store = useStore();
    store.dispatch(ACQUIRE_PROJECTS_GET);
  },
});
</script>

<style scoped>
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
