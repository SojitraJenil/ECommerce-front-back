import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getInquiries, deleteInquiries } from '../API/api';

// Define a User type
interface Inquiry {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  subject: string;
  message: string;
}

// Define initial state
interface InquiryState {
  inquiry: Inquiry[];
  loading: boolean;
  error: string | null;
}

const initialState: InquiryState = {
  inquiry: [],
  loading: false,
  error: null,
};

// Asynchronous thunk to fetch users from the API
export const fetchInquiry = createAsyncThunk('Inquiry/fetchUsers', async () => {
  const response = await getInquiries();
  return response.inquiry_show;
});

export const IsDeleteInquiry = createAsyncThunk(
  'Inquiry/deleteInquiry',
  async (id: string) => {
    const response: any = await deleteInquiries(id);
    return response;
  },
);

// Create user slice
const inquiriesSlice = createSlice({
  name: 'inquiry',
  initialState,
  reducers: {
    setInquiry: (state, action: PayloadAction<Inquiry[]>) => {
      state.inquiry = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // ======= Fetch User =========
      .addCase(fetchInquiry.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInquiry.fulfilled, (state, action) => {
        state.inquiry = action.payload;
        state.loading = false;
      })
      .addCase(fetchInquiry.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch users';
      })
      // ======= Delete =========
      .addCase(IsDeleteInquiry.pending, (state) => {
        state.loading = true;
      })
      .addCase(IsDeleteInquiry.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(IsDeleteInquiry.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to delete user';
      });
  },
});

export const { setInquiry, setError } = inquiriesSlice.actions;
export default inquiriesSlice.reducer;
