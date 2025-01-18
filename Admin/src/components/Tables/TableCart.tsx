"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../reducers/cartSlice";
import { RootState } from "../../reducers";

const TableCart = () => {
    const dispatch = useDispatch<any>();
    const cart = useSelector((state: RootState) => state.cart.items);
    const [rowData, setRowData] = useState<any[]>([]);

    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);

    useEffect(() => {
        setRowData(cart);
    }, [cart]);

    return (
        <div className="w-full p-5">
            <table className="w-full table-auto border-collapse">
                <thead>
                    <tr>
                        <th className="border px-4 py-2 text-left bg-gray-100">Product Name</th>
                        <th className="border px-4 py-2 text-left bg-gray-100">Quantity</th>
                        <th className="border px-4 py-2 text-left bg-gray-100">Price</th>
                        <th className="border px-4 py-2 text-left bg-gray-100">Image</th>
                    </tr>
                </thead>
                <tbody>
                    {rowData.length > 0 ? (
                        rowData.map((cartItem: any) => (
                            cartItem.products.map((product: any) => (
                                <tr key={product._id} className="bg-white">
                                    <td className="border px-4 py-2">{product.product_name || "N/A"}</td>
                                    <td className="border px-4 py-2">{product.quantity}</td>
                                    <td className="border px-4 py-2">{product.product_price || "N/A"}</td>
                                    <td className="border px-4 py-2">
                                        {product.product_img ? (
                                            <img
                                                src={product.product_img}
                                                alt={product.product_name}
                                                className="w-12 h-12 object-cover"
                                            />
                                        ) : (
                                            "N/A"
                                        )}
                                    </td>
                                </tr>
                            ))
                        ))
                    ) : (
                        <tr>
                            <td className="border px-4 py-2" colSpan={4}>
                                No items in the cart.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TableCart;
