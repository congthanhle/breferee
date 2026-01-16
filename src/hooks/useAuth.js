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
import { useLoadingStore } from '@/state';

export const useAuth = () => {
  const { setLoading } = useLoadingStore();
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
      return true;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const checkPermission = async () => {

  };

  return {
    handleShareInfo,
    checkPermission,
  };
};
