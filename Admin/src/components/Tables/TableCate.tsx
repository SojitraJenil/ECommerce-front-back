import Loader from '../../common/Loader/index';
import {
  addCategories,
  deleteCategories,
  deleteInquiries,
  getCategories,
  getInquiries,
  UpdateCategories,
} from '../../API/api';
import React, { useEffect, useState } from 'react';
import useSnackbar from '../../hooks/useSnackbar';

function TableCate() {
  const [categories, setCategories] = useState([]);
  const [formCategories, setFormCategories] = useState<any>();
  const [loading, setLoading] = useState(false);
  const { showSnackbar } = useSnackbar();
  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await getCategories();
      setCategories(res.categories);
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCategories(id);
      showSnackbar('Inquiries deleted successfully!', 'success');
      fetchInquiries();
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = async (id: string) => {
    try {
      await UpdateCategories(id, formCategories);
      showSnackbar('Inquiries deleted successfully!', 'success');
      fetchInquiries();
    } catch (error) {
      console.log(error);
    }
  };

  const HandleAddCategories = async () => {
    console.log('formCategories :>> ', formCategories);
    try {
      const res = await addCategories(formCategories);
      fetchInquiries();
      console.log('res', res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      {loading ? (
        <Loader />
      ) : (
        <div className="max-w-full overflow-x-auto">
          <div>
            <div className="grid gap-4 mb-4 md:grid-cols-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                First name
              </label>
              <input
                type="text"
                onChange={(e: any) => {
                  setFormCategories(e.target.value);
                }}
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="John"
              />
              <button
                className="px-4 py-1 bg-teal-500 rounded-lg text-white"
                onClick={HandleAddCategories}
              >
                Add Categories
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
              {categories.map((item: any, index: any) => (
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
                    <p className="text-black dark:text-white">{item.name}</p>
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
                          handleUpdate(item._id);
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
  );
}

export default TableCate;
