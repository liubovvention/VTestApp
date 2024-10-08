import axios, {
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import {API_URL, API_KEY} from '@env';


const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (config.method === 'get') {
      config.params = {
        ...config.params,
        appid: API_KEY,
      };
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  error => {
    return Promise.reject(error);
  },
);

class ApiService {
  public static async get<T>(url: string, params?: any): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axiosInstance.get(url, {params});
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public static async post<T>(url: string, data?: any): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axiosInstance.post(url, data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private static handleError(error: any): Error {
    let message = 'Something went wrong!';

    if (error.response) {
      console.error('DEBUG Error response:', error.response); 
      message = error.response.data.message || message; 
    } else if (error instanceof Error) {
      message = error.message; 
    }

    return new Error(message);
  }
}

export default ApiService;
