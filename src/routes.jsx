import HomePage from '@/pages';
import Scan from '@/pages/scan';
import ScanLookup from '@/pages/scan/lookup';
import Gift from '@/pages/gift';
import Customer from '@/pages/customer';
import Account from '@/pages/account';
import Campaign from '@/pages/campaign';
import CampaignResult from '@/pages/campaign/result';
import CampaignResultSuccess from '@/pages/campaign/success';
import HomeIcon from '@/assets/icons/navigation/home.svg';
import HomeActiveIcon from '@/assets/icons/navigation/home_active.svg';
import GiftIcon from '@/assets/icons/navigation/gift.svg';
import GiftActiveIcon from '@/assets/icons/navigation/gift_active.svg';
import ListIcon from '@/assets/icons/navigation/list.svg';
import ListActiveIcon from '@/assets/icons/navigation/list_active.svg';
import UserIcon from '@/assets/icons/navigation/user.svg';
import UserActiveIcon from '@/assets/icons/navigation/user_active.svg';
import ScanIcon from '@/assets/icons/navigation/scan.svg';
import ScanActiveIcon from '@/assets/icons/navigation/scan_active.svg';


const routes = [
  {
    path: '/',
    key: 'home',
    component: <HomePage />,
    isRootRouter: true,
    isDisplayedInBottomNav: true,
    icon: HomeIcon,
    active_icon: HomeActiveIcon,
    name: 'Trang chủ',
  },
  {
    path: '/gift',
    key: 'gift',
    component: <Gift />,
    isRootRouter: true,
    isDisplayedInBottomNav: true,
    icon: GiftIcon,
    active_icon: GiftActiveIcon,
    name: 'Quà của tôi',
  },
  {
    path: '/scan',
    key: 'scan',
    component: <Scan />,
    isRootRouter: false,
    isDisplayedInBottomNav: true,
    center: true,
    icon: ScanIcon,
    active_icon: ScanActiveIcon,
    name: 'Scan QR',
  },
  {
    path: '/scan/lookup',
    key: 'scan-lookup',
    component: <ScanLookup />,
    isRootRouter: true,
    isDisplayedInBottomNav: false,
    icon: ScanIcon,
    active_icon: ScanActiveIcon,
    name: 'Scan QR',
  },
  {
    path: '/customers',
    key: 'customers',
    component: <Customer />,
    isRootRouter: true,
    isDisplayedInBottomNav: true,
    icon: ListIcon,
    active_icon: ListActiveIcon,
    name: 'KH trúng thưởng',
  },
  {
    path: '/account',
    key: 'account',
    component: <Account />,
    isRootRouter: true,
    isDisplayedInBottomNav: true,
    icon: UserIcon,
    active_icon: UserActiveIcon,
    name: 'Thông tin cá nhân',
  },
  {
    path: '/campaign',
    key: 'campaign',
    component: <Campaign />,
    name: 'Minigame',
  },
  {
    path: '/campaign/result',
    key: 'campaign-result',
    component: <CampaignResult />,
    name: 'MinigameResult',
  },
  {
    path: '/campaign/result/success',
    key: 'campaign-result-success',
    component: <CampaignResultSuccess />,
    name: 'MinigameSuccess',
  },
];

export default routes;