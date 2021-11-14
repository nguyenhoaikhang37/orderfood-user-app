import foodApi from 'apis/foodApi';

const { createSlice, createAsyncThunk, createSelector } = require('@reduxjs/toolkit');

export const fetchFoodByRes = createAsyncThunk('detail/fetchFoodByRes', async (resId) => {
  try {
    const res = await foodApi.getFoodByRes(resId);
    return res.data.food;
  } catch (error) {
    console.log('Failed to fetch Menu List', error);
  }
});

const detailSlice = createSlice({
  name: 'detail',
  initialState: {
    loading: false,
    foodList: [],
    foodCart: JSON.parse(localStorage.getItem('food_cart')) || [],
  },
  reducers: {
    addFoodToCart(state, action) {
      const newFoodCart = [...state.foodCart];
      const foundIndex = state.foodCart.findIndex((food) => food._id === action.payload._id);
      const priceInListChoose =
        action.payload?.listChoose?.reduce((total, cur) => total + cur.price, 0) || 0;
      if (foundIndex >= 0) {
        newFoodCart[foundIndex] = {
          ...newFoodCart[foundIndex],
          quantityInCart: state.foodCart[foundIndex]?.quantityInCart + 1,
          totalFood:
            (action.payload.lastPrice + priceInListChoose) *
            (state.foodCart[foundIndex]?.quantityInCart + 1),
        };
        localStorage.setItem('food_cart', JSON.stringify(newFoodCart));
        return { ...state, foodCart: newFoodCart };
      } else {
        newFoodCart.push({
          ...action.payload,
          quantityInCart: 1,
          totalFood: action.payload.lastPrice + priceInListChoose,
        });
        localStorage.setItem('food_cart', JSON.stringify(newFoodCart));
        return { ...state, foodCart: newFoodCart };
      }
    },
    removeFoodToCart(state, action) {
      const newFoodCart = [...state.foodCart];
      const foundIndex = state.foodCart.findIndex((food) => food._id === action.payload._id);
      const priceInListChoose =
        action.payload?.listChoose?.reduce((total, cur) => total + cur.price, 0) || 0;

      if (foundIndex >= 0) {
        newFoodCart[foundIndex] = {
          ...newFoodCart[foundIndex],
          quantityInCart: state.foodCart[foundIndex]?.quantityInCart - 1,
          totalFood:
            (action.payload.lastPrice + priceInListChoose) *
            (state.foodCart[foundIndex]?.quantityInCart - 1),
        };

        if (state.foodCart[foundIndex]?.quantityInCart - 1 !== 0) {
          localStorage.setItem('food_cart', JSON.stringify(newFoodCart));

          return { ...state, foodCart: newFoodCart };
        } else {
          const foodCartWithQuantityEqualZero = newFoodCart.filter(
            (food) => food._id !== state.foodCart[foundIndex]._id
          );
          localStorage.setItem('food_cart', JSON.stringify(foodCartWithQuantityEqualZero));

          return {
            ...state,
            foodCart: foodCartWithQuantityEqualZero,
          };
        }
      }
    },
    deleteFoodCartByRes(state, action) {
      return {
        ...state,
        foodCart: state.foodCart.filter((cart) => cart.restaurant != action.payload),
      };
    },
  },
  extraReducers: {
    [fetchFoodByRes.pending]: (state) => {
      state.loading = true;
    },
    [fetchFoodByRes.fulfilled]: (state, action) => {
      state.loading = false;
      state.foodList = action.payload;
    },
  },
});

//ACTIONS
export const detailActions = detailSlice.actions;
//SELECTOR
export const selectDetailLoading = (state) => state.detail.loading;
export const selectDetailFoodList = (state) => state.detail.foodList;
export const selectDetailFoodCart = (state) => state.detail.foodCart;
//REDUCER
const detailReducer = detailSlice.reducer;
export default detailReducer;
