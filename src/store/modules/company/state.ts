import Company from '@/types/company';

export interface State {
  company: Company | null;
  companyBeingEdited: Company | null;
}

const state: State = {
  company: null,
  companyBeingEdited: null,
};

export default state;
