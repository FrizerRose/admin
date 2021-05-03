// Cyclical dependency needed to make vuex fully typed.
// eslint-disable-next-line import/no-cycle
import { RootState } from '@/store';
import { ActionContext, ActionTree } from 'vuex';
import { PaymentService } from '@/api';
import { ApiError } from '@/types/customError';
import Payment from '@/types/payment';
import LocalActionTypes from './action-types';
import LocalMutationTypes from './mutation-types';
// import SharedMutationTypes from '../shared/mutation-types';
import { Mutations } from './mutations';
import { Mutations as SharedMutations } from '../shared/mutations';
import { State } from './state';

// Constraints commit to mutations from the right module
type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, 'commit'>

type AugmentedSharedActionContext = {
  commit<K extends keyof SharedMutations>(
    key: K,
    payload: Parameters<SharedMutations[K]>[1],
  ): ReturnType<SharedMutations[K]>;
} & Omit<ActionContext<State, RootState>, 'commit'>

export interface Actions {
  [LocalActionTypes.FETCH_PAYMENT](
    { commit }: AugmentedActionContext & AugmentedSharedActionContext,
    payload: object
  ): Promise<Payment[]>;
  [LocalActionTypes.UPDATE_PAYMENT](
    { commit }: AugmentedActionContext & AugmentedSharedActionContext,
    payload: object
  ): Promise<Payment>;
  [LocalActionTypes.CREATE_PAYMENT](
    { commit }: AugmentedActionContext & AugmentedSharedActionContext,
    payload: object
  ): Promise<Payment>;
}

// API access.
const paymentService = new PaymentService();

// Action implementation.
export const actions: ActionTree<State, RootState> & Actions = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async [LocalActionTypes.FETCH_PAYMENT]({ commit }, payload: object): Promise<Payment[]> {
    return new Promise((resolve, reject) => (async () => {
      const response = await paymentService.getAll();
      if (response.status === 200 && response.data) {
        commit(LocalMutationTypes.CHANGE_PAYMENT, response.data);
        resolve(response.data as Payment[]);
      } else {
        reject(new ApiError('Could not find payments.'));
      }
    })());
  },
  async [LocalActionTypes.UPDATE_PAYMENT]({ commit }, payment: Payment): Promise<Payment> {
    return new Promise((resolve, reject) => (async () => {
      const response = await paymentService.update(payment);
      if (response.status === 200 && response.data) {
        commit(LocalMutationTypes.CHANGE_PAYMENT_BEING_EDITED, response.data);
        resolve(response.data);
      } else {
        reject(new ApiError('Updating payment failed.'));
      }
    })());
  },
  async [LocalActionTypes.CREATE_PAYMENT]({ commit }, payment: Payment): Promise<Payment> {
    return new Promise((resolve, reject) => (async () => {
      const response = await paymentService.create(payment);
      if (response.status === 201 && response.data) {
        commit(LocalMutationTypes.CHANGE_PAYMENT_BEING_EDITED, response.data);
        resolve(response.data);
      } else {
        reject(new ApiError('Updating payment failed.'));
      }
    })());
  },
};
