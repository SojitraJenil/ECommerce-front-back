import { axiosInstance } from './axios';

export const getUser = async () => {
  try {
    const response = await axiosInstance.get('/show_all_user', {
      headers: {
        Authorization: `Bearer ${'jenil'}`,
      },
    });
    console.log('response.data', response.data);
    return response.data;
  } catch (error: unknown) {
    console.error(error);
    throw error;
  }
};
export const deleteUser = async (id: any) => {
  try {
    const response = await axiosInstance.delete(`/delete_user/${id}`);
    return response.data;
  } catch (error: unknown) {
    console.error(error);
    throw error;
  }
};
