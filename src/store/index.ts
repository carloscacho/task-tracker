import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import createPersistedState from "vuex-persistedstate";
import State from "@/interfaces/State";
import ITracker from "@/interfaces/ITracker";
import IProject from "./../interfaces/IProjects";
import api from "./../http/index";
import {
  ACQUIRE_PROJECTS_GET,
  REGISTER_PROJECT_POST,
  CHANGE_PROJECT_PUT,
  REMOVE_PROJECT_DELETE,
  ACQUIRE_TASKS_GET,
  REGISTER_TASK_POST,
  CHANGE_TASK_PUT,
  REMOVE_TASK_DELETE,
  ACQUIRE_TRACKERS_GET,
  REGISTER_TRACKER_POST,
  CHANGE_TRACKERS_PUT,
  REMOVE_TRACKERS_DELETE,
} from "./actions-types";
import ITask from "@/interfaces/ITask";
import {
  ADD_TASK,
  ADD_PROJECTS,
  CLEAN_ALL,
  DELETE_TASK,
  DELETE_PROJECTS,
  EDIT_PROJECTS,
  FINISH_WORK_DAY,
  INIT_PROJECTS,
  INIT_TASK,
  INIT_WORK_DAY,
  SHOW_ALERT,
  EDIT_TASK,
  INIT_TRACKERS,
  ADD_TRACKER,
  EDIT_TRACKER,
  DELETE_TRACKER,
} from "./mutations-types";

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
    projects: [],
    alerts: [],
    tasks: [],
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
    [ACQUIRE_TASKS_GET]({ commit }) {
      api.get("/tasks").then((response) => commit(INIT_TASK, response.data));
    },
    [REGISTER_TASK_POST]({ commit }, task) {
      return api
        .post("/tasks", task)
        .then((resp) => commit(ADD_TASK, { task: resp.data }));
    },
    [CHANGE_TASK_PUT]({ commit }, task: ITask) {
      return api
        .put(`/tasks/${task.id}`, task)
        .then(() => commit(EDIT_TASK, task));
    },
    [REMOVE_TASK_DELETE]({ commit }, task: ITask) {
      return api
        .delete(`/tasks/${task.id}`)
        .then(() => commit(DELETE_TASK, { task }));
    },
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
        tasks: this.state.tasks,
        totalTimer: this.state.totalTimer,
      };
      
      return api.post("/trackers", tracker).then((resp) => {
        this.state.tasks.map(value => {
          api.delete(`/tasks/${value.id}`)
        })
        commit(ADD_TRACKER, { tracker: resp.data });
        commit(CLEAN_ALL);
        
      });
    },
    // [CHANGE_TRACKERS_PUT]({ commit }, tracker: ITracker) {
    //   return api
    //     .put(`/trackers/${tracker.id}`, tracker)
    //     .then(() => commit(EDIT_TRACKER, tracker));
    // },
    // [REMOVE_TRACKERS_DELETE]({ commit }, tracker: ITracker) {
    //   return api
    //     .delete(`/trackers/${tracker.id}`)
    //     .then(() => commit(DELETE_TRACKER, { tracker }));
    // },
  },
  mutations: {
    [ADD_TASK](state, payload) {
      state.tasks.push(payload.task);
      state.totalTimer += payload.task.timerInSeconds;
    },
    [EDIT_TASK](state, task) {
      const list = state.tasks.map((value) => {
        return value.id == task.id ? task : value;
      });
      state.tasks = list;
    },
    [DELETE_TASK](state, payload) {
      state.tasks = state.tasks.filter((value) => value.id !== payload.task.id);
      state.totalTimer -= payload.task.timerInSeconds;
    },
    [INIT_WORK_DAY](state) {
      state.today = new Date().toLocaleDateString("en-GB");
    },
    [ADD_TRACKER](state, payload) {
      state.OldTrackers.push(payload.tracker);
    },
    [CLEAN_ALL](state) {
      state.tasks = [];
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
    [INIT_TASK](state, tasks: ITask[]) {
      // iniciando os projetos
      state.tasks = tasks;
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
