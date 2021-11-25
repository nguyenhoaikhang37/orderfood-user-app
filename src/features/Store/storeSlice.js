import menuApi from 'apis/menuApi';
import storeApi from 'apis/storeApi';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const fetchMenuList = createAsyncThunk('store/fetchMenuList', async () => {
  try {
    const res = await menuApi.getMenuList();
    return res.data.menu;
  } catch (error) {
    console.log('Failed to fetch Menu List', error);
  }
});

export const fetchCategoryList = createAsyncThunk('store/fetchCategoryList', async () => {
  try {
    const res = await menuApi.getCategoryList();
    return res.data.category;
  } catch (error) {
    console.log('Failed to fetch Category List', error);
  }
});

export const fetchStoreList = createAsyncThunk('store/fetchStoreList', async () => {
  try {
    const res = await storeApi.getStoreList();
    return res.data.restaurant;
  } catch (error) {
    console.log('Failed to fetch Store List', error);
  }
});

export const fetchNearStoreList = createAsyncThunk('store/fetchNearStoreList', async (address) => {
  try {
    const res = await storeApi.getNearStoreList(address.lat, address.lng);
    return res.data.restaurant;
  } catch (error) {
    console.log('Failed to fetch Near Store List', error);
  }
});

const storeSlice = createSlice({
  name: 'store',
  initialState: {
    loading: false,
    storeList: [],
    searchStoreList: [],
    nearStoreList: [],
    categoryList: [],
    menuList: [],
  },
  reducers: {
    searchStore(state, action) {
      const newStoreList = [...state.storeList];
      if (!action.payload) return { ...state, searchStoreList: newStoreList };
      return {
        ...state,
        searchStoreList: newStoreList.filter((x) =>
          x.name.toLowerCase().includes(action.payload.toLowerCase())
        ),
      };
    },
  },
  extraReducers: {
    [fetchCategoryList.fulfilled]: (state, action) => {
      state.categoryList = action.payload;
    },
    [fetchMenuList.fulfilled]: (state, action) => {
      state.menuList = action.payload;
    },
    [fetchStoreList.pending]: (state) => {
      state.loading = true;
    },
    [fetchStoreList.fulfilled]: (state, action) => {
      state.loading = false;
      state.storeList = action.payload;
    },
    [fetchNearStoreList.pending]: (state) => {
      state.loading = true;
    },
    [fetchNearStoreList.fulfilled]: (state, action) => {
      state.loading = false;
      state.nearStoreList = action.payload;
    },
  },
});

//ACTIONS
export const storeActions = storeSlice.actions;
//SELECTOR
export const selectStoreLoading = (state) => state.store.loading;
export const selectStoreCategoryList = (state) => state.store.categoryList;
export const selectStoreMenuList = (state) => state.store.menuList;
export const selectStoreList = (state) => state.store.storeList;
export const selectSearchStoreList = (state) => state.store.searchStoreList;
export const selectNearStoreList = (state) => state.store.nearStoreList;
//REDUCER
const storeReducer = storeSlice.reducer;
export default storeReducer;
