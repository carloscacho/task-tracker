import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import createPersistedState from "vuex-persistedstate";
import State from '@/interfaces/State'
import Tracker from '@/interfaces/Tracker';
import IProject from './../interfaces/IProjects';

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
  },
  plugins: [createPersistedState()],
  actions: {
    addItem: ({ commit }, payload) => {
      commit("addItem", payload);
    },
    addProject: ({ commit }, payload) => {
      commit("addProject", payload);
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
    addProject(state, payload){
      const project = {
        id: new Date().toDateString(),
        name: payload.name
      }as IProject
      state.projects.push(project)
    },
    deleteItem(state, payload) {
      state.data = state.data.filter((value) => value.id !== payload.id);
    },
    incrementTotal(state, payload) {
      state.totalTimer += payload.time;
    },
    initDayWork(state){
      state.today = new Date().toLocaleDateString('en-GB')
    },
    finishDayWork(state){
      const tracker: Tracker = {
        id: new Date().toISOString() + Math.random().toString(),
        day: state.today,
        data: state.data,
        totalTimer: state.totalTimer
      }
      state.OldTrackers.push(tracker)
      state.today = ""
      state.data = []
      state.totalTimer = 0;
      console.log("salvando...", state.OldTrackers)
    },
    cleanTotalTimer(state) {
      state.data = []
      state.totalTimer = 0;
      state.today = ""
    },
  },
});

export function useStore() {
  return baseUseStore(key);
}