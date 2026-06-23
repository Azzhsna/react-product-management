import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiGet, apiPost, apiPut, apiDelete } from '../services/api';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ limit = 10, skip = 0, sortBy = 'title', order = 'asc' }, { rejectWithValue }) => {
    try {
      return await apiGet(`/products?limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}`);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchProductsByCategory',
  async ({ category, limit = 10, skip = 0, sortBy = 'title', order = 'asc' }, { rejectWithValue }) => {
    try {
      // dummyjson doesn't support sortBy alongside category filter directly in the same way, 
      // but we will append them just in case they support it or for consistency
      return await apiGet(`/products/category/${category}?limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}`);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      return await apiGet(`/products/categories`);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id, { rejectWithValue }) => {
    try {
      return await apiGet(`/products/${id}`);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const searchProducts = createAsyncThunk(
  'products/searchProducts',
  async ({ query, limit = 10, skip = 0, sortBy = 'title', order = 'asc' }, { rejectWithValue }) => {
    try {
      return await apiGet(`/products/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}`);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (productData, { rejectWithValue }) => {
    try {
      return await apiPost('/products/add', productData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, ...data }, { rejectWithValue }) => {
    try {
      return await apiPut(`/products/${id}`, data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id, { rejectWithValue }) => {
    try {
      const result = await apiDelete(`/products/${id}`);
      return { id, ...result }; // Ensure ID is returned for reducer
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  products: [],
  selectedProduct: null,
  categories: [],
  selectedCategory: '',
  total: 0,
  skip: 0,
  limit: 10,
  sortBy: 'title',
  order: 'asc',
  loading: false,
  error: null,
  searchQuery: '',
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.skip = 0; // reset skip when category changes
    },
    setSortParams: (state, action) => {
      state.sortBy = action.payload.sortBy;
      state.order = action.payload.order;
      state.skip = 0; // reset skip when sort changes
    },
    setSkip: (state, action) => {
      state.skip = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
      state.skip = 0;
    },
    setSelectedProductFromCache: (state, action) => {
      state.selectedProduct = action.payload;
    }
  },
  extraReducers: (builder) => {
    // Fetch Products
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.total = action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch Products by Category
    builder
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.total = action.payload.total;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch Categories
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        // dummyjson /products/categories returns array of objects with slug and name
        state.categories = action.payload;
      });

    // Fetch Product by ID
    builder
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
      });

    // Search Products
    builder
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.total = action.payload.total;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Add Product
    builder
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.unshift(action.payload);
        state.total += 1;
      });

    // Update Product
    builder
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        if (state.selectedProduct?.id === action.payload.id) {
          state.selectedProduct = action.payload;
        }
      });

    // Delete Product
    builder
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(p => p.id !== action.payload.id);
        state.total -= 1;
      });
  },
});

export const { clearSelectedProduct, clearError, setSearchQuery, setSelectedCategory, setSortParams, setSkip, setLimit, setSelectedProductFromCache } = productSlice.actions;
export default productSlice.reducer;
