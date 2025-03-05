import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../utils/constants";

axios.interceptors.request.use((config) => {
  const STG_TOKEN = "9fbc6df30ef1431:6d4f68e133966b7";

  const token = localStorage.getItem("authToken") || STG_TOKEN;

  if (token) {
    config.headers.Authorization = `token ${token}`;
  }

  return config;
});

const useAxios = (method, url = "", options = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendRequest = async ({
    customURL = "",
    payload = {},
    headers = {},
    cb = () => {},
    showLoading = true,
  } = {}) => {
    const apiOptions = {
      auth: true,
      showAlert: true,
      useBaseURL: true,
      withCredentials: true,
      ...options,
    };

    setLoading(showLoading ?? true);

    const fullURL = `${apiOptions.useBaseURL ? API_BASE_URL : ""}${
      customURL || url
    }`;

    const config = {
      method,
      url: fullURL,
      headers,
      withCredentials: apiOptions.withCredentials,
      ...(method !== "get" && { data: payload }),
    };

    try {
      const response = await axios(config);
      setData(response.data);
      cb(response.data);
    } catch (err) {
      if (err.code === "ERR_NETWORK") {
        toast("It seems our servers are currently unresponsive.", {
          type: "error",
        });
        return;
      }

      const errorMessage = err?.response?.data?.message;

      if (apiOptions.showAlert && errorMessage) {
        toast(errorMessage, { type: "error" });
      }

      setError(err);
      cb(null, errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return [sendRequest, { data, loading, error }, setData];
};

export const useAxiosGet = (url = "", options = {}) =>
  useAxios("get", url, options);

export const useAxiosPost = (url = "", options = {}) =>
  useAxios("post", url, options);

export const useAxiosPatch = (url = "", options = {}) =>
  useAxios("patch", url, options);

export const useAxiosPut = (url = "", options = {}) =>
  useAxios("put", url, options);

export const useAxiosDelete = (url = "", options = {}) =>
  useAxios("delete", url, options);
