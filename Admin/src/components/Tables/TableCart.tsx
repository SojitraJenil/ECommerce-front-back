import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import Loader from '../../common/Loader/index';
import useSnackbar from '../../hooks/useSnackbar';
import { RootState } from '../../reducers';
import { fetchCart } from '../../reducers/cartSlice';

function TableCart() {
    const dispatch = useDispatch<any>();
    const { showSnackbar } = useSnackbar();
    const cart = useSelector((state: RootState) => state.cart);
    const loading = useSelector((state: RootState) => state.cart.loading);

    useEffect(() => {
        dispatch(fetchCart());
    }, []);

    console.log('cart :>> ', cart);

    const renderCartItems = () => {
        if (!cart.items || cart.items.length === 0) {
            return <div>No items in the cart.</div>;
        }

        return cart.items.map((cartItem: any) => (
            <tr key={cartItem._id} className="border-b border-gray-200">
                <td className="p-2">{cartItem._id}</td>
                <td className="p-2">{cartItem.active ? 'Yes' : 'No'}</td>
                <td className="p-2">{cartItem.updatedAt ? new Date(cartItem.updatedAt).toLocaleString() : 'N/A'}</td>
                <td className="p-2">
                    {cartItem.products && cartItem.products.length > 0 ? (
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="p-2">Product Name</th>
                                    <th className="p-2">Quantity</th>
                                    <th className="p-2">Price</th>
                                    <th className="p-2">Image</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItem.products.map((product: any) => (
                                    <tr key={product._id}>
                                        <td className="p-2">{product.product_name || 'N/A'}</td>
                                        <td className="p-2">{product.quantity}</td>
                                        <td className="p-2">{product.product_price || 'N/A'}</td>
                                        <td className="p-2">
                                            {product.product_img && (
                                                <img
                                                    src={product.product_img}
                                                    alt={product.product_name || 'Product Image'}
                                                    className="w-16 h-16 object-cover"
                                                />
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No products in this cart.</p>
                    )}
                </td>
            </tr>
        ));
    };

    return (
        <>
            <Breadcrumb pageName="Cart" />
            <div className="p-4">
                {loading ? <Loader /> : (
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr>
                                <th className="p-2">Cart ID</th>
                                <th className="p-2">Active</th>
                                <th className="p-2">Modified On</th>
                                <th className="p-2">Products</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderCartItems()}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
}

export default TableCart;
