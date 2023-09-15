import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAllProducts,
  fetchProductsByFilter,
  fetchAllBrands,
  fetchAllCategories,
  fetchProductById,
} from "./productListAPI";

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchAllProductsAsync = createAsyncThunk(
  "product/fetchAllProducts",
  async () => {
    const response = await fetchAllProducts();
    // The value we return becomes the `fulfilled` action payload
    // console.log(response.data);
    return response.data;
  }
);

export const fetchProductsByFilterAsync = createAsyncThunk(
  "product/fetchProductsByFilter",
  async ({ filter, sort, pagination }) => {
    const response = await fetchProductsByFilter(filter, sort, pagination);
    // The value we return becomes the `fulfilled` action payload
    // console.log(response.data);
    return response.data;
  }
);

export const fetchAllBrandsAsync = createAsyncThunk(
  "product/fetchAllBrands",
  async () => {
    const response = await fetchAllBrands();
    // The value we return becomes the `fulfilled` action payload
    // console.log(response.data);
    return response.data;
  }
);

export const fetchAllCategoriesAsync = createAsyncThunk(
  "product/fetchAllCategories",
  async () => {
    const response = await fetchAllCategories();
    // The value we return becomes the `fulfilled` action payload
    // console.log(response.data);
    return response.data;
  }
);

export const fetchProductByIdAsync = createAsyncThunk(
  "product/fetchProductById",
  async (id) => {
    const response = await fetchProductById(id);
    // The value we return becomes the `fulfilled` action payload
    // console.log(response.data);
    return response.data;
  }
);

const initialState = {
  allProducts: {
    status: "",
    products: [],
    totalItems: 0,
    brands: [],
    categories: [],
    selectedProduct: null,
  },
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.allProducts.status = "loading";
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.allProducts.status = "idle";
        state.allProducts.products = action.payload;
      })

      .addCase(fetchProductsByFilterAsync.pending, (state) => {
        state.allProducts.status = "loading";
      })
      .addCase(fetchProductsByFilterAsync.fulfilled, (state, action) => {
        state.allProducts.status = "idle";
        state.allProducts.products = action.payload.products;
        state.allProducts.totalItems = action.payload.totalItems;
      })

      .addCase(fetchAllBrandsAsync.pending, (state) => {
        state.allProducts.status = "loading";
      })
      .addCase(fetchAllBrandsAsync.fulfilled, (state, action) => {
        state.allProducts.status = "idle";
        state.allProducts.brands = action.payload;
      })

      .addCase(fetchAllCategoriesAsync.pending, (state) => {
        state.allProducts.status = "loading";
      })
      .addCase(fetchAllCategoriesAsync.fulfilled, (state, action) => {
        state.allProducts.status = "idle";
        state.allProducts.categories = action.payload;
      })

      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.allProducts.status = "loading";
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.allProducts.status = "idle";
        state.allProducts.selectedProduct = action.payload;
      });
  },
});

// export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export const selectAllProducts = (state) => state.product.allProducts.products;
export const selectAllBrands = (state) => state.product.allProducts.brands;
export const selectAllCategories = (state) =>
  state.product.allProducts.categories;
export const selectProduct = (state) =>
  state.product.allProducts.selectedProduct;

export const TotalProducts = (state) => state.product.allProducts.totalItems;

export default productSlice.reducer;
