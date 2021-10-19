import userApi from 'apis/userApi';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const getUserToken = createAsyncThunk('auth/getUserToken', async (token) => {
  try {
    const { data } = await userApi.layThongTinTaiKhoan(token);
    return data.user;
  } catch (error) {
    console.log('Failed to get user token', error);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {},
  },
  reducers: {},
  extraReducers: {
    [getUserToken.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
  },
});

//ACTIONS
export const authActions = authSlice.actions;
//SELECTOR
export const selectAuthUser = (state) => state.auth.user;
//REDUCER
const authReducer = authSlice.reducer;
export default authReducer;
