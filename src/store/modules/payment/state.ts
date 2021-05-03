import Payment from '@/types/payment';

export interface State {
  payment: Payment[] | null;
  paymentBeingEdited: Payment | null;
}

const state: State = {
  payment: null,
  paymentBeingEdited: null,
};

export default state;
