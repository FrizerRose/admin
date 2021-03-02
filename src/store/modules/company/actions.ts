// Cyclical dependency needed to make vuex fully typed.
// eslint-disable-next-line import/no-cycle
import { RootState } from '@/store';
import { ActionContext, ActionTree } from 'vuex';
import { CompanyService } from '@/api';
import { ApiError } from '@/types/customError';
import LocalActionTypes from './action-types';
import LocalMutationTypes from './mutation-types';
import { Mutations } from './mutations';
import { State } from './state';

// Constraints commit to mutations from the right module
type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, 'commit'>;

export interface Actions {
  [LocalActionTypes.FETCH_COMPANY]({ commit }: AugmentedActionContext): void;
}

// API access.
const companyService = new CompanyService();

// Action implementation.
export const actions: ActionTree<State, RootState> & Actions = {
  async [LocalActionTypes.FETCH_COMPANY]({ commit }) {
    const response = await companyService.getAll();
    if (response.status === 200 && response.data) {
      commit(LocalMutationTypes.CHANGE_COMPANY, response.data);
    } else {
      throw new ApiError('No company by this ID.');
    }
  },
};
