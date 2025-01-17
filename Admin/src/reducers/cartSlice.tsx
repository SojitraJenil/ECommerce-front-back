import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllCart, getOrderDelete } from '../API/api';

// Define a CartItem type
interface CartItem {
    _id: string;
    userId?: string;
    products?: any[];
    active?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

// Define initial state
interface CartState {
    items: CartItem[];
    loading: boolean;
    error: string | null;

}

interface Product {
    _id: string;
    product_name: string;
    quantity: number;
    product_price: number;
    product_img?: string;
}


const initialState: CartState = {
    items: [],
    loading: false,
    error: null,
};

export const fetchCart = createAsyncThunk('cart/fetchOrder/fulfilled', async () => {
    const response = await getAllCart();
    return response;
});


const cartReducer = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, action: PayloadAction<CartItem[]>) => {
            state.items = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch cart items';
            })
    },
});

export const { setCart, setError } = cartReducer.actions;
export default cartReducer.reducer;
