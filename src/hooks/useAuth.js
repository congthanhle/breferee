import {
  getUserInformation,
  getUserAccessToken,
  getPhoneToken,
} from '@/service/zalo/user/info';
import {
  getSetting,
} from 'zmp-sdk/apis';
import { ZaloAuthorize } from '@/service/zalo/user/authorization';
import {
  ZALO_SCOPE_USER_INFO,
  ZALO_SCOPE_USER_PHONE_NUMBER,
} from '@/utils/enums';
import { useUserStore } from '@/state/user';
import { useLoadingStore, useGuidesStore } from '@/state';
import notice from '@/components/atoms/Notice';
import { LOGIN } from '@/store/user';

export const useAuth = () => {
  const { setLoading } = useLoadingStore();
  const { setIsCheckFollow } = useGuidesStore();
  const { user, clearUser } = useUserStore();

  const handleShareInfo = async () => {
    try {
      setLoading(true);
      await ZaloAuthorize([ZALO_SCOPE_USER_INFO, ZALO_SCOPE_USER_PHONE_NUMBER]);
      const userInfo = await getUserInformation();
      const [accessToken, phoneToken] = await Promise.all([
        getUserAccessToken(),
        getPhoneToken(),
      ]);
      await LOGIN({
        accessToken,
        code: phoneToken,
        name: userInfo?.name,
        avatar: userInfo?.avatar,
      });
      return true;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const checkFollowOa = async () => {
    try {
      await getUserInformation();
      setIsCheckFollow(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    };
  };

  const checkPermission = async () => {
    try {
      setLoading(true);
      const { authSetting } = await getSetting();

      const hasPermission =
      authSetting[ZALO_SCOPE_USER_INFO]
      && authSetting[ZALO_SCOPE_USER_PHONE_NUMBER]
      && user;

      if(!hasPermission) {
        clearUser();
      }
      return hasPermission;
    } catch (error) {
      notice.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleShareInfo,
    checkPermission,
    checkFollowOa,
  };
};
