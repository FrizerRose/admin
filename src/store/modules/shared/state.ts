export interface State {
  number: number;
  advice: string;
  sidebarCollapsed: boolean;
  isModalOpen: boolean;
  isCreateModalOpen: boolean;
  isUserLoggedIn: boolean;
}

const state: State = {
  number: 69,
  advice: 'sex number lmao',
  sidebarCollapsed: false,
  isModalOpen: false,
  isCreateModalOpen: false,
  isUserLoggedIn: false,
};

export default state;
