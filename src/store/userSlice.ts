import { createSlice } from "@reduxjs/toolkit";
import type { ReduxStore, ReduxUser } from "../types/reduxTypes";

const initialState: ReduxUser = {
  id: "",
  email: "",
  name: "",
  fileImageUrl: "",
  cpf: "",
  dateBirth: "",
  phoneNumber: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUserInfoRedux(state, action) {
      const {
        email,
        id,
        nome,
        image,
        cpf,
        dataNascimento,
        telefone,
      } = action.payload;
      state.email = email;
      state.id = id;
      state.name = nome;
      state.fileImageUrl = image;
      state.cpf = cpf;
      state.dateBirth = dataNascimento;
      state.phoneNumber = telefone;
    },
    editUserPhotoRedux(state, action) {
      state.fileImageUrl = action.payload;
    },
  },
});

export const { saveUserInfoRedux, editUserPhotoRedux } =
  userSlice.actions;

export const selectUserName = (state: ReduxStore) => state.user.name;
export const selectUserPhoto = (state: ReduxStore) =>
  state.user.fileImageUrl;
export const selectUserId = (state: ReduxStore) => state.user.id;

export const selectUser = (state: ReduxStore) => state.user;

export default userSlice.reducer;
