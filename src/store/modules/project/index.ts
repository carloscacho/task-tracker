import api from "@/http";
import IProject from "@/interfaces/IProjects";
import State from "@/interfaces/State"
import { ACQUIRE_PROJECTS_GET, CHANGE_PROJECT_PUT, REGISTER_PROJECT_POST, REMOVE_PROJECT_DELETE } from "@/store/actions-types";
import { ADD_PROJECTS, DELETE_PROJECTS, EDIT_PROJECTS, INIT_PROJECTS } from "@/store/mutations-types";
import { Module } from "vuex";

export interface ProjectState {
  projects: IProject[]
}

export const project: Module<ProjectState, State> = {
  actions: {
    [ACQUIRE_PROJECTS_GET]({ commit }) {
      api
        .get("/projects")
        .then((response) => commit(INIT_PROJECTS, response.data));
    },
    [REGISTER_PROJECT_POST](context, projectName: string) {
      return api.post("/projects", {
        name: projectName,
      });
    },
    [CHANGE_PROJECT_PUT](context, project: IProject) {
      return api.put(`/projects/${project.id}`, project);
    },
    [REMOVE_PROJECT_DELETE]({ commit }, id: string) {
      return api
        .delete(`/projects/${id}`)
        .then(() => commit(DELETE_PROJECTS, { id }));
    },
  },
  mutations: {
    [INIT_PROJECTS](state, projects) {
      // iniciando os projetos
      state.projects = projects;
    },
    [ADD_PROJECTS](state, payload) {
      const project = {
        id: new Date().toISOString(),
        name: payload.name,
      } as IProject;
      state.projects.push(project);
    },
    [EDIT_PROJECTS](state, payload) {
      const index = state.projects.findIndex((proj) => proj.id == payload.id);
      state.projects[index] = payload.project;
    },
    [DELETE_PROJECTS](state, payload) {
      state.projects = state.projects.filter(
        (value) => value.id !== payload.id
      );
    },
  },
}