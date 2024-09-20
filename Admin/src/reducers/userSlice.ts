import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getUser, deleteUser } from '../API/api';

// Define a User type
interface User {
  _id: string;
  email: string;
  fname: string;
  lname: string;
  password: string;
}

// Define initial state
interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

// Asynchronous thunk to fetch users from the API
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await getUser();
  return response.data1;
});

export const IsDeleteUser = createAsyncThunk(
  'users/deleteUser',
  async (id: string) => {
    const response: any = await deleteUser(id);
    return response.data;
  },
);

// Create user slice
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // ======= Fetch User =========
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch users';
      })
      // ======= Delete =========
      .addCase(IsDeleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(IsDeleteUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(IsDeleteUser.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to delete user';
      });
  },
});

export const { setUsers, setError } = userSlice.actions;
export default userSlice.reducer;
