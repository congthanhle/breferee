import { authorize } from 'zmp-sdk';

export const ZaloAuthorize = (scopes) => {
  return authorize({ scopes: scopes });
};