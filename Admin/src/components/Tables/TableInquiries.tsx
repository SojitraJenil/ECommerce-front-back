import Loader from '../../common/Loader/index';
import { deleteInquiries, getInquiries } from '../../API/api';
import React, { useEffect, useState } from 'react';
import useSnackbar from '../../hooks/useSnackbar';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducers';
import { fetchInquiry, IsDeleteInquiry } from '../../reducers/inquiriesSlice';

function TableInquiries() {
  const dispatch = useDispatch<any>();
  const { showSnackbar } = useSnackbar();
  const Inquiries = useSelector((state: RootState) => state.inquiry.inquiry);
  const loading = useSelector((state: RootState) => state.inquiry.loading);

  useEffect(() => {
    dispatch(fetchInquiry());
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await dispatch(IsDeleteInquiry(id)).then(() => {
        showSnackbar('Inquiries deleted successfully!', 'success');
        dispatch(fetchInquiry());
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Breadcrumb pageName="Inquiries" />
      <div className="">
        {loading ? (
          <Loader />
        ) : (
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[20px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    Index
                  </th>
                  <th className=" py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    Name
                  </th>
                  <th className=" py-4 px-4 font-medium text-black dark:text-white">
                    Email
                  </th>
                  <th className=" py-4 px-4 font-medium text-black dark:text-white">
                    Mobile no
                  </th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">
                    subject
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
                {Inquiries &&
                  Inquiries.map((item: any, index: any) => (
                    <tr key={index}>
                      <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                        <h5 className="font-medium text-black dark:text-white">
                          {index + 1}
                        </h5>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                        <h5 className="font-medium text-black dark:text-white">
                          {item.name}
                        </h5>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {item.email}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          +91 {item.mobile}
                        </p>
                      </td>

                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {item.subject}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {item.message}
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

export default TableInquiries;
