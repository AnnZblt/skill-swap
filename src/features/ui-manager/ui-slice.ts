import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  registrationSuccessVisible: boolean;
  intendedRoute: string | null;
}

const initialState: UIState = {
  registrationSuccessVisible: false,
  intendedRoute: null
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showRegistrationSuccess: (state) => {
      state.registrationSuccessVisible = true;
    },
    hideRegistrationSuccess: (state) => {
      state.registrationSuccessVisible = false;
    },
    setIntendedRoute: (state, action: PayloadAction<string>) => {
      state.intendedRoute = action.payload;
    },
    clearIntendedRoute: (state) => {
      state.intendedRoute = null;
    }
  }
});

export const {
  showRegistrationSuccess,
  hideRegistrationSuccess,
  setIntendedRoute,
  clearIntendedRoute
} = uiSlice.actions;
