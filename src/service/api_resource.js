import { createClient } from './axios';

export const list = (object, queries = {}, baseUrl=null) => {
  return createClient(baseUrl).get(object, { params: queries });
};

export const detail = (object, id, queries = {}) => {
  return createClient().get(`${object}/${id}`, { params: queries });
};

export const create = (object, payload, headers = {}) => {
  return createClient().post(object, payload, headers);
};

export const update = (object, payload) => {
  return createClient().put(`${object}`, payload);
};

export const destroy = (object) => {
  return createClient().delete(`${object}`);
};