export interface State {
  number: number;
  advice: string;
  sidebarCollapsed: boolean;
  isModalOpen: boolean;
  isUserLoggedIn: boolean;
}

const state: State = {
  number: 69,
  advice: 'sex number lmao',
  sidebarCollapsed: false,
  isModalOpen: false,
  isUserLoggedIn: false,
};

export default state;
