import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import createPersistedState from "vuex-persistedstate";
import State from "@/interfaces/State";
import ITracker from "@/interfaces/ITracker";
import api from "./../http/index";
import {
  ACQUIRE_TRACKERS_GET,
  REGISTER_TRACKER_POST
} from "./actions-types";
import {
  CLEAN_ALL,
  INIT_WORK_DAY,
  SHOW_ALERT,
  INIT_TRACKERS,
  ADD_TRACKER,
  INCREMENT_TIMER,
  DECREMENT_TIMER
} from "./mutations-types";
import { project } from "./modules/project";
import { task } from "./modules/task"

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    totalTimer: 0,
    today: "",
    OldTrackers: [],
    project: {
      projects: []
    },
    alerts: [],
    task: {
      tasks:[]
    }
  },
  plugins: [createPersistedState()],
  getters: {
    getTotalTimer: (state) => state.totalTimer,
  },
  actions: {
    // TRACKERS
    [ACQUIRE_TRACKERS_GET]({ commit }) {
      api
        .get("/trackers")
        .then((response) => commit(INIT_TRACKERS, response.data));
    },
    [REGISTER_TRACKER_POST]({ commit }) {
      const tracker: ITracker = {
        id: new Date().toISOString() + Math.random().toString(),
        day: this.state.today,
        tasks: this.state.task.tasks,
        totalTimer: this.state.totalTimer,
      };
      
      return api.post("/trackers", tracker).then((resp) => {
        this.state.task.tasks.map(value => {
          api.delete(`/tasks/${value.id}`)
        })
        commit(ADD_TRACKER, { tracker: resp.data });
        commit(CLEAN_ALL);
        
      });
    },
  },
  mutations: {
    [INIT_WORK_DAY](state) {
      state.today = new Date().toLocaleDateString("en-GB");
    },
    [ADD_TRACKER](state, payload) {
      state.OldTrackers.push(payload.tracker);
    },
    [INIT_TRACKERS](state, trackers){
      state.OldTrackers = trackers
    },
    [CLEAN_ALL](state) {
      state.totalTimer = 0;
      state.today = "";
      state.alerts = [];
      //state.task.tasks = [];
      //state.OldTrackers = []
      //state.project.projects = []
    },
    [INCREMENT_TIMER](state, payload){
      state.totalTimer += payload.timer;
    },
    [DECREMENT_TIMER](state, payload){
      state.totalTimer -= payload.timer;
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
  modules: {
    task,
    project
  }
});

export function useStore() {
  return baseUseStore(key);
}
