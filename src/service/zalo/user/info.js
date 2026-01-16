import { getAccessToken, getPhoneNumber, getUserInfo, followOA } from 'zmp-sdk';
import { HTTP_STATUS_CODE } from '@/utils/consts/httpCodes';
import { useUserStore } from '@/state/user';

export const getUserAccessToken = () => {
  return new Promise((resolve, reject) =>
    getAccessToken({
      success: (accessToken) => resolve(accessToken),
      fail: (error) => reject(error.message),
    })
  );
};

export const getPhoneToken = () => {
  return new Promise((resolve, reject) =>
    getPhoneNumber({
      success: async (data) => {
        const { token } = data;
        return resolve(token);
      },
      fail: (error) => reject(error.message),
    })
  );
};

export const getUserInformation = () => {
  return new Promise((resolve, reject) =>
    getUserInfo({
      success: ({ userInfo }) => {
        useUserStore
          .getState()
          .setOaId({ uid: userInfo?.idByOA, followedOA: userInfo?.followedOA });
        resolve(userInfo);
      },
      fail: (error) => reject(error.message),
    })
  );
};

export const FollowOa = async () => {
  return new Promise((resolve, reject) => {
    followOA({
      id: import.meta.env.VITE_ZALO_OA_ID,
      success: async () => {
        await getUserInformation();
        return resolve();
      },
      fail: (error) => {
        switch (error.code) {
        case HTTP_STATUS_CODE.CUSTOM_ERROR_201:
          return reject(
            'Bạn đã từ chối theo dõi OA. Hãy theo dõi OA để nhận những thông tin mới nhất.'
          );
        case HTTP_STATUS_CODE.CUSTOM_ERROR_203:
          return reject(
            'Bạn đã vượt quá số lần yêu cầu theo dõi cho phép. Hãy khởi động lại ứng dụng và thử lại.'
          );
        default:
          return reject(
            'Vui lòng theo dõi OA để nhận những thông tin mới nhất.'
          );
        }
      },
    });
  });
};
