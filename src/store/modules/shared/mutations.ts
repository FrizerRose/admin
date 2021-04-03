import { MutationTree } from 'vuex';
import LocalMutationTypes from './mutation-types';
import { State } from './state';

// Blueprint for mutations. All of them have to be implemented.
export type Mutations<S = State> = {
  [LocalMutationTypes.CHANGE_NUMBER](state: S, payload: number): void;
  [LocalMutationTypes.CHANGE_ADVICE](state: S, payload: string): void;
  [LocalMutationTypes.CHANGE_SIDEBAR_COLLAPSE](state: S, payload: boolean): void;
  [LocalMutationTypes.TOGGLE_MODAL](state: S, payload: boolean): void;
  [LocalMutationTypes.TOGGLE_CREATE_MODAL](state: S, payload: boolean): void;
  [LocalMutationTypes.CHANGE_USER_LOGGED_IN](state: S, payload: boolean): void;
};

// Mutuation implementation.
export const mutations: MutationTree<State> & Mutations = {
  [LocalMutationTypes.CHANGE_NUMBER](state, payload: number) {
    state.number = payload;
  },
  [LocalMutationTypes.CHANGE_ADVICE](state, payload: string) {
    state.advice = payload;
  },
  [LocalMutationTypes.CHANGE_SIDEBAR_COLLAPSE](state, payload: boolean) {
    state.sidebarCollapsed = payload;
  },
  [LocalMutationTypes.TOGGLE_MODAL](state, payload: boolean) {
    state.isModalOpen = payload;
  },
  [LocalMutationTypes.TOGGLE_CREATE_MODAL](state, payload: boolean) {
    state.isCreateModalOpen = payload;
  },
  [LocalMutationTypes.CHANGE_USER_LOGGED_IN](state, payload: boolean) {
    state.isUserLoggedIn = payload;
  },
};
