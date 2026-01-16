import { notEmpty } from '@/utils/variable';
import { HTTP_STATUS_CODE } from '@/utils/consts/httpCodes';
import axios from 'axios';
import { useUserStore } from '@/state/user';

export const createClient = (envUrl, headers = {}) => {
  const client = axios.create({
    baseURL: envUrl ?? import.meta.env.VITE_APP_API_URL,
    headers,
  });

  client.interceptors.request.use(async (request) => {
    const { token } = useUserStore.getState();

    if (notEmpty(token)) {
      request.headers.Authorization = 'Bearer ' + token;
    }

    return request;
  });

  client.interceptors.response.use(
    ({ headers, data }) => {
      const contentType = headers['content-type'] ?? '';
      if (!contentType.startsWith('application/json')) {
        return data;
      }

      const { status } = data;

      if (status === HTTP_STATUS_CODE.UNAUTHORIZED) {
        useUserStore.getState().clearUser();
      }

      if (status !== HTTP_STATUS_CODE.OK) {
        throw data;
      }
      return data;
    },
    (err) => {
      const { data } = err.response ?? {};
      if (data) {
        const options = {};
        if (data.hasOwnProperty('status')) {
          options.key = data.status;
        }
      }

      throw err.message;
    },
  );

  return client;
};