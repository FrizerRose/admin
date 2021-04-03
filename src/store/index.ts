// Cyclical dependency needed to make vuex fully typed.
// eslint-disable-next-line import/no-cycle
import { ArticleStore, State as ArticleState, store as article } from '@/store/modules/article';
// eslint-disable-next-line import/no-cycle
import { SharedStore, State as SharedState, store as shared } from '@/store/modules/shared';
// eslint-disable-next-line import/no-cycle
import { CompanyStore, State as CompanyState, store as company } from '@/store/modules/company';
// eslint-disable-next-line import/no-cycle
import { FaqStore, State as FaqState, store as faq } from '@/store/modules/faq';
import { createLogger, createStore } from 'vuex';

export type RootState = {
  shared: SharedState;
  article: ArticleState;
  company: CompanyState;
  faq: FaqState;
};

export type Store = SharedStore<Pick<RootState, 'shared'>> &
  ArticleStore<Pick<RootState, 'article'>> &
  FaqStore<Pick<RootState, 'faq'>> &
  CompanyStore<Pick<RootState, 'company'>>;

// Plug in logger when in development environment
const isDebugMode = process.env.NODE_ENV !== 'production';
const plugins = isDebugMode ? [createLogger({})] : [];

export const store = createStore({
  plugins,
  modules: {
    shared,
    article,
    company,
    faq,
  },
});

export function useStore(): Store {
  return store as Store;
}
