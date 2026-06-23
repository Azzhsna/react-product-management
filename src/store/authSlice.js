import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiPost, apiGet } from '../services/api';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const data = await apiPost('/auth/login', {
        username,
        password,
        expiresInMins: 60,
      });
      localStorage.setItem('accessToken', data.accessToken);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const data = await apiGet('/auth/me');
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialToken = localStorage.getItem('accessToken');

const initialState = {
  user: null,
  token: initialToken || null,
  isAuthenticated: !!initialToken,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('accessToken');
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // loginUser
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.token = action.payload.accessToken;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetchCurrentUser
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        localStorage.removeItem('accessToken');
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
