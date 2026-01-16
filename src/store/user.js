import * as apiResource from '@/service/api_resource';
import notice from '@/components/atoms/Notice';
import { notEmpty, notBlank } from '@/utils/variable';
import { useUserStore } from '@/state/user';
import { ENCRYPT } from '@/utils/format';

export const LOGIN = async ({ accessToken, code, name, avatar }) => {
  const stringPayload = JSON.stringify({ access_token: accessToken, code });
  const encryptedPayload = ENCRYPT(stringPayload);
  const payload = {
    access_token: encryptedPayload,
    display_name: name,
    avatar,
  };
  try {
    const res = await apiResource.create('client/login', payload);
    const { token, backend_user } = res?.data;
    if (notBlank(token)) {
      useUserStore.getState().setToken(token);
    }
    if (notEmpty(backend_user)) {
      useUserStore.getState().setUser(backend_user);
    }
  } catch (error) {
    console.error(error);
  }
};

export const UPDATE = async ({ uid, name }) => {
  const payload = { uid, name };
  try {
    const res = await apiResource.create('client/update', payload);
    return res;
  } catch (error) {
    console.error(error);
  }
};
