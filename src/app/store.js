import authReducer from 'features/Auth/authSlice';
import detailReducer from 'features/DetailStore/detailSlice';
import storeReducer from 'features/Store/storeSlice';

const { configureStore } = require('@reduxjs/toolkit');

const store = configureStore({
  reducer: {
    store: storeReducer,
    detail: detailReducer,
    auth: authReducer
  },
});

export default store;
