import Loader from '../../common/Loader/index';
import {
  addCategories,
  deleteCategories,
  deleteInquiries,
  getCategories,
  getInquiries,
  UpdateCategories,
} from '../../API/api';
import { useEffect, useState } from 'react';
import useSnackbar from '../../hooks/useSnackbar';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/reducers';
import { fetchProductCategories } from '../../reducers/productSlice';

function TableCate() {
  const { showSnackbar } = useSnackbar();
  const dispatch = useDispatch<any>();
  const categories = useSelector(
    (state: RootState) => state.product.categories,
  );
  const loading = useSelector((state: RootState) => state.product.loading);
  const [formCategories, setFormCategories] = useState<any>();
  const [formCategoriesId, setFormCategoriesId] = useState<any>();
  const [updateCategories, setUpdateCategories] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchProductCategories());
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteCategories(id);
      showSnackbar('Categories deleted successfully!', 'success');
      dispatch(fetchProductCategories());
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (item: any) => {
    setFormCategories(item.name);
    setFormCategoriesId(item._id);
  };

  const HandleAddCategories = async () => {
    try {
      await addCategories(formCategories);
      showSnackbar('Inquiries deleted successfully!', 'success');
      dispatch(fetchProductCategories());
    } catch (error) {
      console.log(error);
    }
  };

  const HandleUpdateCategories = async () => {
    try {
      await UpdateCategories(formCategoriesId, formCategories);
      showSnackbar('Inquiries deleted successfully!', 'success');
      setUpdateCategories(false);
      dispatch(fetchProductCategories());
      setFormCategories('');
      setFormCategoriesId(null);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Breadcrumb pageName="Categories" />
      <div className="">
        {loading ? (
          <Loader />
        ) : (
          <div className="max-w-full overflow-x-auto">
            <div>
              <div className="flex gap-4 mb-4 md:grid-cols-2">
                <label
                  htmlFor="name"
                  className="mb-2 align-middle self-center text-md font-medium text-gray-900 dark:text-white"
                >
                  Categories :
                </label>
                <input
                  value={formCategories}
                  type="text"
                  onChange={(e: any) => {
                    setFormCategories(e.target.value);
                  }}
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-50 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="enter the text"
                />
                <button
                  className="px-4 py-1 bg-teal-500 rounded-lg text-white"
                  onClick={
                    updateCategories
                      ? HandleUpdateCategories
                      : HandleAddCategories
                  }
                >
                  {updateCategories ? 'Update' : 'Add Categories'}
                </button>
              </div>
            </div>
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[20px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    Index
                  </th>
                  <th className=" py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    Id
                  </th>
                  <th className=" py-4 px-4 font-medium text-black dark:text-white ">
                    Name
                  </th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">
                    message
                  </th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {categories &&
                  categories.map((item: any, index: any) => (
                    <tr key={index}>
                      <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                        <h5 className="font-medium text-black dark:text-white">
                          {index + 1}
                        </h5>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                        <h5 className="font-medium text-black dark:text-white">
                          {item._id}
                        </h5>
                      </td>

                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {item.name}
                        </p>
                      </td>

                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <div className="flex items-center space-x-3.5">
                          <button
                            className="hover:text-primary bg-red-400 px-3 rounded-md text-white "
                            onClick={() => {
                              handleDelete(item._id);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <div className="flex items-center space-x-3.5">
                          <button
                            className="hover:text-primary bg-red-400 px-3 rounded-md text-white "
                            onClick={() => {
                              setUpdateCategories(true);
                              handleUpdate(item);
                            }}
                          >
                            Update
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default TableCate;
