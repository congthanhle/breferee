import { followOA } from 'zmp-sdk';

export const requiredUserFollow = () => {
  return followOA({ id: import.meta.env.VITE_ZALO_OA_ID });
};