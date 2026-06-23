import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiGet, apiPost, apiPut, apiDelete } from '../services/api';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ limit = 10, skip = 0 } = {}, { rejectWithValue }) => {
    try {
      const data = await apiGet(`/products?limit=${limit}&skip=${skip}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id, { rejectWithValue }) => {
    try {
      const data = await apiGet(`/products/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const searchProducts = createAsyncThunk(
  'products/searchProducts',
  async ({ query, limit = 10, skip = 0 }, { rejectWithValue }) => {
    try {
      const data = await apiGet(
        `/products/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const data = await apiPost('/products/add', productData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, ...productData }, { rejectWithValue }) => {
    try {
      const data = await apiPut(`/products/${id}`, productData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id, { rejectWithValue }) => {
    try {
      await apiDelete(`/products/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  products: [],
  selectedProduct: null,
  total: 0,
  skip: 0,
  limit: 10,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearSelectedProduct(state) {
      state.selectedProduct = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchProducts
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.total = action.payload.total;
        state.skip = action.payload.skip;
        state.limit = action.payload.limit;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetchProductById
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // searchProducts
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.total = action.payload.total;
        state.skip = action.payload.skip;
        state.limit = action.payload.limit;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // addProduct
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.unshift(action.payload);
        state.total += 1;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // updateProduct
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        if (
          state.selectedProduct &&
          state.selectedProduct.id === action.payload.id
        ) {
          state.selectedProduct = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // deleteProduct
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter((p) => p.id !== action.payload);
        state.total -= 1;
        if (
          state.selectedProduct &&
          state.selectedProduct.id === action.payload
        ) {
          state.selectedProduct = null;
        }
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedProduct, clearError } = productSlice.actions;
export default productSlice.reducer;
