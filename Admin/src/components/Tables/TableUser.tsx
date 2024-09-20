import React, { useEffect } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducers/index';
import { IsDeleteUser, fetchUsers, setError } from '../../reducers/userSlice';
import 'react-confirm-alert/src/react-confirm-alert.css';
import useSnackbar from '../../hooks/useSnackbar';
import Loader from '../../common/Loader/index';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';

const TableUser: React.FC = () => {
  const dispatch = useDispatch<any>();
  const users = useSelector((state: RootState) => state.users.users);
  const loading = useSelector((state: RootState) => state.users.loading);
  const error = useSelector((state: RootState) => state.users.error);

  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    try {
      dispatch(IsDeleteUser(id)).then(() => {
        dispatch(fetchUsers());
        showSnackbar('User deleted successfully!', 'success');
      });
    } catch (error) {
      dispatch(setError('Failed to delete user'));
      showSnackbar('Failed to delete user', 'error');
    }
  };

  const handleEdit = (id: string) => {
    showSnackbar('Edit functionality not implemented yet.', 'info');
  };

  if (error) return;
  return loading ? (
    <Loader />
  ) : (
    <>
      <Breadcrumb pageName="User" />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[50px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  No.
                </th>
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Email
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  First Name
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Last Name
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Password
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Other
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((item: any, index: any) => (
                <tr key={item._id}>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{index + 1}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{item.email}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{item.fname}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{item.lname}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium">
                      {item.password}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <button
                        className="hover:text-primary"
                        onClick={() => handleDelete(item._id)}
                      >
                        <MdDelete />
                      </button>
                      <button
                        className="hover:text-primary"
                        onClick={() => {
                          handleEdit(item._id);
                        }}
                      >
                        <MdEdit />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TableUser;
