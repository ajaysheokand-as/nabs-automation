import API from "./api";

// GET Request
export const fetchData = async (endpoint, params = {}) => {
  try {
    const response = await API.get(endpoint, { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error fetching data";
  }
};

// POST Request
export const postData = async (endpoint, data) => {
  try {
    const response = await API.post(endpoint, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error posting data";
  }
};

// PUT Request
export const updateData = async (endpoint, data) => {
  try {
    const response = await API.put(endpoint, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error updating data";
  }
};

// DELETE Request
export const deleteData = async (endpoint) => {
  try {
    const response = await API.delete(endpoint);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error deleting data";
  }
};
