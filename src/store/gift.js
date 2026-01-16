import * as apiResource from '@/service/api_resource';

export const FETCH_COUPONS = async () => {
  try {
    const res = await apiResource.list('client/dropdown', { objects: ['coupon'] });
    return res?.data?.options?.coupon || [];
  } catch (error) {
    throw error;
  }
};

export const FETCH_USER_COUPONS = async () => {
  try {
    const res = await apiResource.list('client/coupon-users');
    return res?.data;
  } catch (error) {
    throw error;
  }
};

export const FETCH_CUSTOMERS = async ({ page = 1, phone = null, coupon_id = null }) => {
  try {
    const res = await apiResource.list('client/lottery-win', { page, phone, coupon_id });
    return res?.data;
  } catch (error) {
    throw error;
  }
};