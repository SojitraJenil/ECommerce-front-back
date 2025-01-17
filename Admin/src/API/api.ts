import { axiosInstance } from './axios';
// User
export const getUser = async () => {
  try {
    const response = await axiosInstance.get('/show_all_user', {
      headers: {
        Authorization: `Bearer ${'jenil'}`,
      },
    });
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
// Product
export const getProduct = async () => {
  try {
    const response = await axiosInstance.get('/Product_Show');
    return response.data;
  } catch (error: unknown) {
    console.error(error);
    throw error;
  }
};

export const getCategory = async () => {
  try {
    const response = await axiosInstance.get('/categories');
    return response.data;
  } catch (error: unknown) {
    console.error(error);
    throw error;
  }
};

export const addProduct = async (addProduct: any) => {
  try {
    const response = await axiosInstance.post('/Product_add', addProduct, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error: unknown) {
    console.error(error);
    throw error;
  }
};

export const deleteProduct = async (id: any) => {
  try {
    const response = await axiosInstance.delete(`/product_delete/${id}`);
    return response.data;
  } catch (error: unknown) {
    console.error(error);
    throw error;
  }
};
export const UpdateProduct = async (id: any) => {
  try {
    const response = await axiosInstance.patch(`/product_update/${id}`);
    return response.data;
  } catch (error: unknown) {
    console.error(error);
    throw error;
  }
};

export const getInquiries = async () => {
  try {
    const response = await axiosInstance.get('/Inquiry_show');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteInquiries = async (id: any) => {
  try {
    const response = await axiosInstance.delete(`/Inquiry_delete/${id}`);
    return response.data;
  } catch (error: unknown) {
    console.error(error);
    throw error;
  }
};

//categories

export const getCategories = async () => {
  try {
    const response = await axiosInstance.get('/categories');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCategories = async (id: any) => {
  try {
    const response = await axiosInstance.delete(`/CateDelete/${id}`);
    return response.data;
  } catch (error: unknown) {
    console.error(error);
    throw error;
  }
};
export const addCategories = async (categories: any) => {
  try {
    const response = await axiosInstance.post(`/addCategory`, {
      name: categories,
    });
    return response;
  } catch (error: unknown) {
    console.error(error);
    throw error;
  }
};

export const UpdateCategories = async (id: any, categories: string) => {
  try {
    const response = await axiosInstance.post(`/CateUpdate/${id}`, {
      name: categories,
    });
    return response.data;
  } catch (error: unknown) {
    console.error(error);
    throw error;
  }
};

export const getOrder = async () => {
  try {
    const response = await axiosInstance.get('/Order_details');
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getAllCart = async () => {
  try {
    const response = await axiosInstance.get('/getAllCart');
    return response.data.show_cart;
  } catch (error) {
    console.error('Error fetching cart data:', error);
    throw error;
  }
};


export const getOrderDelete = async (id: any) => {
  try {
    const response = await axiosInstance.delete(`/Order_delete/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
