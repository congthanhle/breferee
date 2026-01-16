
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import routes from '@/routes';
import { useUserStore } from '@/state/user';
import { FollowOa } from '@/service/zalo/user/info';

const BottomNavigation = () => {
  const rootRouter = routes.filter((route) => route.isDisplayedInBottomNav);
  const navigate = useNavigate();
  const location = useLocation();
  const { token, user, isAgreed, oaId } = useUserStore();



  const isRouteActive = (routePath) => {
    if (routePath === location.pathname) return true;
    if (location.pathname.startsWith(routePath) && routePath !== '/') return true;
    return false;
  };

  return (
    <>
      {
        rootRouter.find(item => item.path === location.pathname || isRouteActive(item.path)) && location.pathname !== '/scan' && (
          <div className="flex justify-between items-center w-full bg-[#8C0004] py-3 rounded-t-2xl px-4 shadow-[0_0_50px_0_#FF000080] h-20 md:px-36 lg:px-64">
            {
              rootRouter.map((route) => (
                <div
                  key={route.key}
                  onClick={async () => {
                    if (route.center && (!token || !isAgreed || !user?.name)) return;
                    if (route.center && !oaId?.followedOA) {
                      await FollowOa();
                    }
                    navigate(route.path);
                  }}
                >
                  <img src={isRouteActive(route.path) ? route.active_icon : route.icon} />
                </div>
              ))
            }
          </div>
        )
      }
    </>
  );
};

export default BottomNavigation;