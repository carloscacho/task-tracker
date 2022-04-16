import api from '@/http';
import ITask from '@/interfaces/ITask';
import State from '@/interfaces/State';
import { ACQUIRE_TASKS_GET, CHANGE_TASK_PUT, REGISTER_TASK_POST, REMOVE_TASK_DELETE } from '@/store/actions-types';
import { ADD_TASK, DELETE_TASK, EDIT_TASK, INIT_TASK } from '@/store/mutations-types';
import { Module } from 'vuex';
import { INCREMENT_TIMER, DECREMENT_TIMER } from './../../mutations-types';


export interface TaskState {
  tasks: ITask[]
}

export const task: Module<TaskState, State> = {
  actions:{
    [ACQUIRE_TASKS_GET]({ commit }) {
      api.get("/tasks").then((response) => commit(INIT_TASK, response.data));
    },
    [REGISTER_TASK_POST]({ commit }, task) {
      return api
        .post("/tasks", task)
        .then((resp) => {
          commit(ADD_TASK, { task: resp.data })
          commit(INCREMENT_TIMER, {timer: task.timerInSeconds})
        });
    },
    [CHANGE_TASK_PUT]({ commit }, task: ITask) {
      return api
        .put(`/tasks/${task.id}`, task)
        .then(() => commit(EDIT_TASK, task));
    },
    [REMOVE_TASK_DELETE]({ commit }, task: ITask) {
      return api
        .delete(`/tasks/${task.id}`)
        .then(() => {
          commit(DELETE_TASK, { task })
          commit(DECREMENT_TIMER, {timer: task.timerInSeconds})
        });
    },
  },
  mutations:{
    [INIT_TASK](state, tasks: ITask[]) {
      // iniciando os projetos
      state.tasks = tasks;
    },
    [ADD_TASK](state, payload) {
      state.tasks.push(payload.task);
    },
    [EDIT_TASK](state, task) {
      const list = state.tasks.map((value) => {
        return value.id == task.id ? task : value;
      });
      state.tasks = list;
    },
    [DELETE_TASK](state, payload) {
      state.tasks = state.tasks.filter((value) => value.id !== payload.task.id);
    },
  }
}