import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import createPersistedState from "vuex-persistedstate";
import State from "@/interfaces/State";
import Tracker from "@/interfaces/Tracker";
import IProject from "./../interfaces/IProjects";
import { AlertTypes } from "@/interfaces/IAlert";

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
    alerts: [
      {
        id: 1,
        title: "teste sucesso",
        text: "que top deu sucesso",
        alertType: AlertTypes.SUCCESS,
      },
      {
        id: 2,
        title: "teste erro",
        text: "que ruim deu erro",
        alertType: AlertTypes.DANGER,
      },
      {
        id: 3,
        title: "teste aviso",
        text: "Somente um aviso",
        alertType: AlertTypes.WARNING,
      },
    ],
  },
  plugins: [createPersistedState()],
  actions: {
    addItem: ({ commit }, payload) => {
      commit("addItem", payload);
    },
    addProject: ({ commit }, payload) => {
      commit("addProject", payload);
    },
    editProject: ({ commit }, payload) => {
      commit("editProject", payload);
    },
    deleteProject: ({ commit }, payload) => {
      commit("deleteProject", payload);
    },
    initDayWork: ({ commit }) => {
      commit("initDayWork");
    },
    finishDayWork: ({ commit }) => {
      commit("finishDayWork");
    },
    deleteItem: ({ commit }, payload) => {
      commit("deleteItem", payload);
    },
    incrementTotal: ({ commit }, payload) => {
      commit("incrementTotal", payload);
    },
    cleanTotalTimer: ({ commit }) => {
      commit("cleanTotalTimer");
    },
  },
  getters: {
    getTotalTimer: (state) => state.totalTimer,
  },
  mutations: {
    addItem(state, payload) {
      state.data.push(payload.item);
    },
    addProject(state, payload) {
      const project = {
        id: new Date().toISOString(),
        name: payload.name,
      } as IProject;
      state.projects.push(project);
    },
    editProject(state, payload) {
      const index = state.projects.findIndex((proj) => proj.id == payload.id);
      state.projects[index] = payload.project;
    },
    deleteProject(state, payload) {
      state.projects = state.projects.filter(
        (value) => value.id !== payload.id
      );
    },
    deleteItem(state, payload) {
      state.data = state.data.filter((value) => value.id !== payload.id);
    },
    incrementTotal(state, payload) {
      state.totalTimer += payload.time;
    },
    initDayWork(state) {
      state.today = new Date().toLocaleDateString("en-GB");
    },
    finishDayWork(state) {
      const tracker: Tracker = {
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
    cleanTotalTimer(state) {
      state.data = [];
      state.totalTimer = 0;
      state.today = "";
    },
  },
});

export function useStore() {
  return baseUseStore(key);
}
