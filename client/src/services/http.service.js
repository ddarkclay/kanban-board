import axios from "axios";

const EMPTY_OBJECT = {};

const stringInterpolate = (str = "", obj = {}) =>
  str.replace(/{([^{}]*)}/g, (rawString, key) =>
    typeof rawString === "string" && typeof obj === "object"
      ? obj[key]
      : rawString
  );

//apply base url for axios
const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
// const API_VERSION = process.env.REACT_APP_API_VERSION || "v1"
const TIMEOUT = 20000;
const HEADERS = {};

const defaultConfig = {
  // paramsSerializer: params => qs.stringify(params),
  timeout: TIMEOUT,
};

const prefixEndpoint = (endpoint, options) =>
  stringInterpolate(endpoint, options);

// export `axios` instance with config as `api` object
const api = ((args) => {
  const instance = axios.create();
  // intercept response before actual handling in invoked action creator
  // this to serve response/error handling across application
  instance.interceptors.response.use(
    (response) => {
      return {
        ...response.data,
        // responseHeaders: response?.headers || {}
      };
    },
    async (error) => {
      return Promise.reject(error);
    }
  );

  // returning abstract methods of axios
  return {
    getConfig() {
      return {
        baseURL: API_URL,
        headers: HEADERS,
        ...args,
      };
    },

    setToken(token) {
      instance.defaults.headers.common["authorization"] = token;
    },
    get(url, params = {}, config = EMPTY_OBJECT, options = {}) {
      const endpoint = prefixEndpoint(url, options);
      const updatedConfig = { ...this.getConfig(), ...config };
      return instance.get(endpoint, { ...updatedConfig, params });
    },
    patch(url, data = {}, config = EMPTY_OBJECT, options = {}) {
      const endpoint = prefixEndpoint(url, options);
      const updatedConfig = { ...this.getConfig(), ...config };
      return instance.patch(endpoint, data, updatedConfig);
    },
    post(url, data = {}, config = EMPTY_OBJECT, options = {}) {
      const endpoint = prefixEndpoint(url, options);
      const updatedConfig = { ...this.getConfig(), ...config };
      return instance.post(endpoint, data, updatedConfig);
    },
    put(url, data = {}, config = EMPTY_OBJECT, options = {}) {
      const endpoint = prefixEndpoint(url, options);
      const updatedConfig = { ...this.getConfig(), ...config };
      return instance.put(endpoint, data, updatedConfig);
    },
    delete(url, _, config = EMPTY_OBJECT, options = {}) {
      const endpoint = prefixEndpoint(url, options);
      const updatedConfig = { ...this.getConfig(), ...config };
      // axios delete request does not take data with this way, will figure a new way once data has to go in payload
      return instance.delete(endpoint, updatedConfig);
    },
  };
})(defaultConfig);

export default api;
