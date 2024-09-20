import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getUser, deleteUser, getOrder, getOrderDelete } from '../API/api';

// Define a User type
interface Order {
  _id: string;
  userId: string;
  country: string;
  voucher: string;
  fname: string;
  lname: string;
  company: string;
  address: string;
  pinCode: string;
  email: string;
  phone: string;
}

// Define initial state
interface OrderState {
  order: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  order: [],
  loading: false,
  error: null,
};

export const fetchOrder = createAsyncThunk('order/fetchOrder', async () => {
  const response = await getOrder();
  return response.show_details;
});

export const IsDeleteOrder = createAsyncThunk(
  'users/deleteUser',
  async (id: string) => {
    const response: any = await getOrderDelete(id);
    return response;
  },
);

// Create user slice
const orderSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setOrder: (state, action: PayloadAction<Order[]>) => {
      state.order = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // ======= Fetch User =========
      .addCase(fetchOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.order = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrder.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch users';
      })
      // ======= Delete =========
      .addCase(IsDeleteOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(IsDeleteOrder.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(IsDeleteOrder.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to delete user';
      });
  },
});

export const { setOrder, setError } = orderSlice.actions;
export default orderSlice.reducer;
