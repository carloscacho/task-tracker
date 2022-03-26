import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import createPersistedState from "vuex-persistedstate";
import ITask from "./interfaces/ITask";

export interface State {
  data: [];
  totalTimer: number;
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}

export const key: InjectionKey<Store<State>> = Symbol()


export const store = createStore<State>({
  state:{
    data: [],
    totalTimer: 0,
  },
  plugins: [createPersistedState()],
  actions: {
    addItem: ({ commit }) =>  {commit('addItem')},
    incrementTotal: ({ commit }, payload) => {commit('incrementTotal', payload)},
    cleanTotalTimer: ({ commit }) => {commit('cleanTotalTimer')},
  },
  getters: {
    getTotalTimer: state => state.totalTimer
  },
  mutations: {
    addItem(state) {
      // state.data.push(item);
    },
    incrementTotal(state, payload) {
      state.totalTimer += payload.time;   
    },
    cleanTotalTimer(state) {
      state.totalTimer = 0;
    },
  },
});

export function useStore () {
  return baseUseStore(key)
}