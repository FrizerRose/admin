import Faq from '@/types/faq';

export interface State {
  faq: Faq[] | null;
  faqBeingEdited: Faq | null;
}

const state: State = {
  faq: null,
  faqBeingEdited: null,
};

export default state;
