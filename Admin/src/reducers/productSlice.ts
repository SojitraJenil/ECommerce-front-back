import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { addProduct, deleteProduct, getCategory, getProduct } from '../API/api';

// Define a User type
interface Product {
  _id: string;
  product_name: string;
  product_price: string;
  product_description: string;
  product_img: Array<any>;
  category: object[];
  Product_stock: string;
  Product_dis_rate: string;
  Product_rating: string;
}

// Define initial state
interface UserState {
  product: Product[];
  categories?: any;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  product: [],
  loading: false,
  error: null,
};

// Asynchronous thunk to fetch users from the API
export const fetchProduct = createAsyncThunk(
  'product/fetchProduct',
  async () => {
    const response = await getProduct();
    return response.product_show;
  },
);
export const fetchProductCategories = createAsyncThunk(
  'Category/getCategory',
  async () => {
    const response = await getCategory();
    return response.categories;
  },
);
export const IsDeleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async (id: string) => {
    const response: any = await deleteProduct(id);
    return response.data;
  },
);

// Create user slice
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<Product[]>) => {
      state.product = action.payload;
    },
    setProductCategories: (state, action: PayloadAction<any[]>) => {
      state.categories = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // ======= Fetch Product =========
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.product = action.payload;
        state.loading = false;
      })
      .addCase(fetchProduct.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch users';
      })
      // ======= Fetch categories =========
      .addCase(fetchProductCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
      })
      .addCase(fetchProductCategories.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch users';
      })
      // ======= Delete =========
      .addCase(IsDeleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(IsDeleteProduct.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(IsDeleteProduct.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to delete user';
      });
  },
});

export const { setProduct, setError, setProductCategories } =
  productSlice.actions;
export default productSlice.reducer;
