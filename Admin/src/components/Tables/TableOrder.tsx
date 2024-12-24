import Loader from '../../common/Loader/index';
import { useEffect, useState } from 'react';
import useSnackbar from '../../hooks/useSnackbar';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducers';
import { fetchOrder, IsDeleteOrder } from '../../reducers/orderSlice';

function TableOrder() {
  const dispatch = useDispatch<any>();
  const { showSnackbar } = useSnackbar();
  const order = useSelector((state: RootState) => state.order.order);
  const loading = useSelector((state: RootState) => state.inquiry.loading);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  useEffect(() => {
    dispatch(fetchOrder());
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await dispatch(IsDeleteOrder(id)).then(() => {
        showSnackbar('Order deleted successfully!', 'success');
        dispatch(fetchOrder());
      });
    } catch (error) {
      console.error(error);
    }
  };

  const toggleRow = (id: string) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <>
      <Breadcrumb pageName="Order" />
      <div>
        {loading ? (
          <Loader />
        ) : (
          <div className="max-w-full text-sm overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-center dark:bg-meta-4">
                  <th className="py-4 px-4 font-medium text-black dark:text-white">
                    Index
                  </th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">
                    FName
                  </th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">
                    LName
                  </th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">
                    UserId
                  </th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">
                    Mobile No
                  </th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {order &&
                  order.map((item: any, index: any) => (
                    <>
                      {/* Main Row */}
                      <tr key={item._id}>
                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                          <h5 className="font-medium text-black dark:text-white">
                            {index + 1}
                          </h5>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">{item.fname}</p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">{item.lname}</p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">{item.userId}</p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">{item.phone}</p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <div className="flex items-center space-x-3.5">
                            <button
                              className="hover:text-primary bg-blue-500 px-3 rounded-md text-white"
                              onClick={() => toggleRow(item._id)}
                            >
                              {expandedRows.has(item._id) ? 'Hide Products' : 'Show Products'}
                            </button>
                            <button
                              className="hover:text-primary bg-red-400 px-3 rounded-md text-white"
                              onClick={() => handleDelete(item._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* Nested Table */}
                      {expandedRows.has(item._id) && (
                        <tr>
                          <td colSpan={6} className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                            <table className="w-full table-auto bg-gray-100 dark:bg-gray-800">
                              <thead>
                                <tr className='bg-slate-400'>
                                  <th className="py-2 px-4 text-left text-black dark:text-white">
                                    Product Name
                                  </th>
                                  <th className="py-2 px-4 text-left text-black dark:text-white">
                                    Quantity
                                  </th>
                                  <th className="py-2 px-4 text-left text-black dark:text-white">
                                    Price
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {item.cartItems.map((cartItem: any) => (
                                  <tr key={cartItem._id} className='bg-slate-300'>
                                    <td className="py-2 px-4 text-black dark:text-white">
                                      {cartItem.productId.product_name}
                                    </td>
                                    <td className="py-2 px-4 text-black dark:text-white">
                                      {cartItem.quantity}
                                    </td>
                                    <td className="py-2 px-4 text-black dark:text-white">
                                      ${cartItem.productId.product_price}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default TableOrder;
