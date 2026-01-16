import routes from '@/routes';
import { Page } from 'zmp-ui';
import { ConfigProvider } from 'antd';
import viVN from 'antd/locale/vi_VN';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import { Route, Routes } from 'react-router-dom';

import { App, SnackbarProvider, ZMPRouter } from 'zmp-ui';
import backgroundImage from '@/assets/images/backgrounds/main.png';
import BottomNavigation from '@/components/molecules/Layout/BottomNavigation';
import Loading from '@/components/atoms/Loading';
import CustomSheet from '@/components/atoms/Sheet';

dayjs.locale('vi');

const MyApp = () => {
  return (
    <App>
      <ConfigProvider locale={viVN}>
        <SnackbarProvider>
          <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}  className="min-h-screen">
            <Loading/>
            <ZMPRouter >
              <Routes>
                {routes.map((value) =>
                  <Route
                    path={value.path}
                    key={value.key}
                    element={
                      value.isRootRouter ? (
                        <Page>{value.component}</Page>
                      ) : (
                        <div className="min-h-screen overflow-scroll">{value.component}</div>
                      )
                    }
                  />)}
              </Routes>
              <BottomNavigation />
            </ZMPRouter>
            <CustomSheet />
          </div>
        </SnackbarProvider>
      </ConfigProvider>
    </App>
  );
};
export default MyApp;