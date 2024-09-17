import React, { useEffect, useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { deleteUser, getUser } from '../../API/api';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import useSnackbar from '../../hooks/useSnackbar';
import Loader from '../../common/Loader/index';

interface User {
  _id: string;
  email: string;
  fname: string;
  lname: string;
  password: string;
}

const TableUser: React.FC = () => {
  const [userDetails, setUserDetails] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await getUser();
      setUserDetails(response.data1);
    } catch (error) {
      showSnackbar('Failed to fetch users', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
      showSnackbar('User deleted successfully!', 'success');
      fetchUser();
    } catch (error) {
      showSnackbar('Failed to delete user', 'error');
    }
  };

  const confirmDelete = (id: string) => {
    confirmAlert({
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this user?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleDelete(id),
        },
        {
          label: 'No',
          onClick: () => showSnackbar('User deletion cancelled', 'info'),
        },
      ],
    });
  };

  const handleEdit = () => {
    showSnackbar('This is a success message!', 'info');
  };

  return loading ? (
    <Loader />
  ) : (
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
            {userDetails.map((item, index) => (
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
                      onClick={() => confirmDelete(item._id)}
                    >
                      <MdDelete />
                    </button>
                    <button className="hover:text-primary" onClick={handleEdit}>
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
  );
};

export default TableUser;
