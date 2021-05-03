// Cyclical dependency needed to make vuex fully typed.
// eslint-disable-next-line import/no-cycle
import { RootState } from '@/store';
import { GetterTree } from 'vuex';
import Payment from '@/types/payment';
import { State } from './state';

export type Getters = {
  getOrderedPayment(state: State): Payment[] | null;
}

export const getters: GetterTree<State, RootState> & Getters = {
  getOrderedPayment: (state) => (state.payment),
};
