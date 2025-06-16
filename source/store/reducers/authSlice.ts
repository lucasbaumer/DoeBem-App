import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  dateOfBirth: string;
  role: "Donor" | "Admin";
}

interface IStateProps {
  access_token: string | null;
  user: User | null;
}

const initialState: IStateProps = {
  access_token: null,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<IStateProps["access_token"]>) => {
      state.access_token = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },
    logout: (state) => {
      state.access_token = null;
      state.user = null;
    },
  },
});

export const { setToken, setUser, updateUser, logout } = authSlice.actions;
