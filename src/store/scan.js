import * as apiResource from '@/service/api_resource';

export const SCAN = async (payload) => {
  try {
    const res = await apiResource.create('client/invoice/scan', payload);
    return res.data;
  } catch (error) {
    throw error;
  }
};
