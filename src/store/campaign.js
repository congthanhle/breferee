import * as apiResource from '@/service/api_resource';

export const FETCH_DASHBOARD = async () => {
  try {
    const res = await apiResource.list('client/dashboard');
    return res?.data;
  } catch (error) {
    throw error;
  }
};

export const FETCH_RULES = async () => {
  try {
    const res = await apiResource.list('client/dashboard/rules');
    return res?.data;
  } catch (error) {
    throw error;
  }
};

export const FETCH_CAMPAIGN = async (campaignId) => {
  try {
    const res = await apiResource.detail('client/campaigns', campaignId);
    return res?.data;
  } catch (error) {
    throw error;
  }
};

export const RECEIVE_CAMPAIGN = async (campaign_token) => {
  try {
    const payload = { campaign_token };
    const res = await apiResource.create('client/campaigns/receive', payload);
    return res?.data;
  } catch (error) {
    throw error;
  }
};

export const RECEIVE_REGISTER = async ( couponId, payload ) => {
  try {
    const res = await apiResource.create(`client/coupon-users/${couponId}/delivery`, payload);
    return res?.data;
  } catch (error) {
    throw error;
  }
};