import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import createPersistedState from "vuex-persistedstate";
import State from "@/interfaces/State";
import ITracker from "@/interfaces/ITracker";
import IProject from "./../interfaces/IProjects";
import api from "./../http/index";
import {
  ACQUIRE_PROJECTS_GET,
  REGISTER_PROJECTS_POST,
  CHANGE_PROJECT_PUT,
  REMOVE_PROJECT_DELETE,
} from "./actions-types";
import {
  ADD_ITEM,
  ADD_PROJECTS,
  CLEAN_ALL,
  DELETE_ITEM,
  DELETE_PROJECTS,
  EDIT_PROJECTS,
  FINISH_WORK_DAY,
  INCREMENT_TOTAL,
  INIT_PROJECTS,
  INIT_WORK_DAY,
  SHOW_ALERT,
} from "./mutations-types";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    data: [],
    totalTimer: 0,
    today: "",
    OldTrackers: [],
    projects: [],
    alerts: [],
  },
  plugins: [createPersistedState()],
  getters: {
    getTotalTimer: (state) => state.totalTimer,
  },
  actions: {
    [ACQUIRE_PROJECTS_GET]({ commit }) {
      api
        .get("/projects")
        .then((response) => commit(INIT_PROJECTS, response.data));
    },
    [REGISTER_PROJECTS_POST](context, projectName: string) {
      return api.post("/projects", {
        name: projectName,
      });
    },
    [CHANGE_PROJECT_PUT](context, project: IProject) {
      return api.put(`/projects/${project.id}`, project);
    },
    [REMOVE_PROJECT_DELETE]({commit}, id: string) {
      return api.delete(`/projects/${id}`)
      .then(() => commit(DELETE_PROJECTS, {id}))
    },
  },
  mutations: {
    [ADD_ITEM](state, payload) {
      state.data.push(payload.item);
    },
    [DELETE_ITEM](state, payload) {
      state.data = state.data.filter((value) => value.id !== payload.id);
    },
    [INCREMENT_TOTAL](state, payload) {
      state.totalTimer += payload.time;
    },
    [INIT_WORK_DAY](state) {
      state.today = new Date().toLocaleDateString("en-GB");
    },
    [FINISH_WORK_DAY](state) {
      const tracker: ITracker = {
        id: new Date().toISOString() + Math.random().toString(),
        day: state.today,
        data: state.data,
        totalTimer: state.totalTimer,
      };
      state.OldTrackers.push(tracker);
      state.today = "";
      state.data = [];
      state.totalTimer = 0;
      console.log("salvando...", state.OldTrackers);
    },
    [CLEAN_ALL](state) {
      //state.data = [];
      state.totalTimer = 0;
      state.today = "";
      state.alerts = [];
      //state.OldTrackers = []
    },
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
    [SHOW_ALERT](state, payload) {
      payload.alert.id = new Date().getTime();
      state.alerts.push(payload.alert);
      setTimeout(() => {
        state.alerts = state.alerts.filter(
          (alert) => alert.id != payload.alert.id
        );
      }, 3500);
    },
  },
});

export function useStore() {
  return baseUseStore(key);
}
