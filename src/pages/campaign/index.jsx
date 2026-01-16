import { FETCH_CAMPAIGN, RECEIVE_CAMPAIGN } from '@/store/campaign';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'zmp-ui';
import Button from '@/components/atoms/Button';
import Ended from '@/components/molecules/Home/Ended';
import Pending from '@/components/molecules/Home/Pending';
import ItemGraphic from '@/assets/images/graphics/sub.png';
import Row from '@/assets/icons/items/arrow.svg';
import { useLoadingStore } from '@/state';
import Star from '@/assets/icons/items/star.svg';
import StarLoading from '@/assets/icons/star.png';
import { Modal } from 'antd';
import { notEmpty } from '@/utils/variable.js';
import { useSheetStore } from '@/state/sheet';
import { useGuidesStore } from '@/state';

const CampaignDetail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isEndedShown, rules, isPending } = useGuidesStore();
  const { openSheet, closeSheet, setSwipeToClose } = useSheetStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startReceive, setStartReceive] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);
  const [couponReceive, setCouponReceive] = useState([]);
  const [couponList, setCouponList] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [rotation, setRotation] = useState(0);
  const { setLoading } = useLoadingStore();

  const prizeAngleMap = {
    1: 18,
    2: 54,
    3: 90,
    4: 126,
    5: 162,
    6: 198,
    7: 234,
    8: 270,
    9: 306,
    10: 342,
  };

  const handleRegister = () => {
    setIsModalOpen(false);
    navigate('/campaign/result', {
      state: {
        data: couponReceive
      },
      replace: true
    });
  };

  const onReceiveCampaign = async () => {
    const userAuth = searchParams.get('user_authorization');
    if (!userAuth || hasSpun) return;

    setHasSpun(true);
    setStartReceive(true);

    try {
      const response = await RECEIVE_CAMPAIGN(userAuth);
      if (response?.coupon_users) {
        setStartReceive(false);
        setCouponReceive(response.coupon_users[0]);
        const prizeIdToWin =
          response.is_lottery_lose === true
            ? '0'
            : response.coupon_users[0].coupon_id;

        const targetIndex = couponList.findIndex(
          (id) => id === prizeIdToWin.toString()
        );
        const targetAngle = prizeAngleMap[targetIndex + 1];
        const extraRounds = 6;
        const finalRotation = rotation + extraRounds * 360 + (360 - (targetAngle % 360));
        setRotation(finalRotation);
        setStartReceive(false);
        setTimeout(() => {
          if (notEmpty(response.coupon_users[0]?.information_required)) {
            setIsModalOpen(true);
            return;
          }
          navigate('/campaign/result', {
            state: {
              data: response.is_lottery_lose === true
                ? null
                : response.coupon_users[0]
            },
            replace: true
          });
        }, 12000);
      }
    } catch (error) {
      setStartReceive(false);
      setRotation(0);
      setHasSpun(false);
      openSheet({
        title: 'Thông báo',
        children: (
          <div className="flex flex-col justify-center space-y-6 w-full">
            {error?.data?.image_path && <img src={error?.data?.image_path} className="w-32 mx-auto" />}
            <div className="space-y-2 w-full">
              {error?.message && <p className="text-center text-black text-lg font-semibold">{error?.message}</p>}
              {error?.data?.sub_message && <p className="text-center text-lg text-black">{error?.data?.sub_message}</p>}
            </div>
            <Button
              text="QUAY LẠI TRANG CHỦ"
              onClick={() => {
                closeSheet();
                setTimeout(() => navigate('/'), 300);
              }}
            />
          </div>
        )
      });
    }
  };

  const fetchCampaign = async () => {
    try {
      setLoading(true, 'Đang kiểm tra hóa đơn. Vui lòng chờ...');
      const data = await FETCH_CAMPAIGN(searchParams.get('cp_url_id'));
      if (data) {
        setImageUrl(data.image_path);
        const couponIds = data?.function_info?.list_coupon.map((coupon) => coupon?.toString());
        setCouponList(couponIds);
      }
    } catch (error) {
      console.error('Error fetching campaign:', error);
      openSheet({
        title: 'Thông báo',
        children: (
          <div className="flex flex-col justify-center space-y-6 w-full">
            {error?.data?.image_path && <img src={error?.data?.image_path} className="w-32 mx-auto" />}
            <div className="space-y-2 w-full">
              {error?.message && <p className="text-center text-black text-lg font-semibold">{error?.message}</p>}
              {error?.data?.sub_message && <p className="text-center text-lg text-black">{error?.data?.sub_message}</p>}
            </div>
            <Button
              text="QUAY LẠI TRANG CHỦ"
              onClick={() => {
                closeSheet();
                setTimeout(() => navigate('/'), 300);
              }}
            />
          </div>
        )
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReadPolicy = () => {
    setSwipeToClose(true);
    openSheet({
      title: 'Thể lệ chương trình',
      children: (
        <>
          <div dangerouslySetInnerHTML={{ __html: rules }} />
          <Button
            text="TIẾP TỤC THAM GIA"
            onClick={() => {
              closeSheet();
            }}
          />
        </>
      )
    });
  };

  useEffect(() => {
    if (searchParams.get('cp_url_id')) {
      fetchCampaign();
    }
  }, []);

  useEffect(() => {
    if (isEndedShown) {
      openSheet({
        title: 'Thông báo',
        children: (
          <>
            <Ended />
            <Button text="Quay lại trang chủ"
              onClick={() => {
                closeSheet();
                setTimeout(() => navigate('/'), 300);
              }} />
          </>
        )
      });
    }
  }, [isEndedShown]);

  useEffect(() => {
    if (isPending) {
      openSheet({
        title: 'Thông báo',
        children: (
          <>
            <Pending />
            <Button
              text="Quay lại trang chủ"
              onClick={() => {
                closeSheet();
                setTimeout(() => navigate('/'), 300);
              }}
            />
          </>
        )
      });
    }
  }, [isPending]);

  return (
    <div className="w-full min-h-full overflow-x-hidden">
      <img src={ItemGraphic} alt="Item Graphic" className="w-full -mt-6 mb-4" />
      {
        searchParams.get('cp_url_id') && (
          <div className="max-w-lg mx-auto">
            <div className="mb-8 space-y-1 flex flex-col items-center justify-center">
              <p className="text-center text-white font-semibold text-3xl">Tham Gia</p>
              <div>
                <p className="relative text-primary text-center uppercase font-bold text-3xl text-gold-shadow">
                  Vòng quay may mắn
                  <img className="absolute right-0 -top-3" src={Star} />
                </p>
              </div>
            </div>
            <div className="relative w-full max-w-md flex justify-center px-4">
              <img
                src={imageUrl}
                alt="Campaign"
                style={{
                  transform: `rotate(${rotation}deg)`,
                }}
                className="w-full object-cover rounded-lg mb-4 transition-transform duration-[8s] ease-out"
              />
              {startReceive && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary rounded-full p-3 shadow-lg -mt-2">
                  <img
                    src={StarLoading}
                    alt="Loading"
                    className="w-10 h-10 animate-spin"
                  />
                </div>
              )}
              <div
                className="absolute left-1/2 -top-1 -translate-x-1/2"
                style={{
                  transform: 'translateX(-50%)',
                  transition: imageUrl ? 'transform 0.1s ease-in' : 'none',
                  opacity: imageUrl ? 1 : 0
                }}
              >
                <img
                  className="w-8"
                  alt="pointer"
                  src={Row}
                />
              </div>
            </div>
            {!hasSpun && (
              <div className="px-6 mt-6">
                <Button
                  text="Quay ngay"
                  className="mx-auto"
                  onClick={onReceiveCampaign}
                />
                <p className="text-primary text-base text-center my-6" onClick={() => handleReadPolicy()}>Thể lệ tham gia</p>
              </div>
            )}
          </div>
        )
      }
      <Modal
        open={isModalOpen}
        footer={null}
        closable={false}
        centered
        maskClosable={false}
        styles={{
          mask: { backgroundColor: '#DA1F25D6' }
        }}
      >
        <div className="flex flex-col items-center space-y-8 w-full">
          <img
            src={couponReceive?.coupon?.image_path}
            className="w-md object-contain transform 0.1s ease-in"
          />
          <Button
            text="Đăng ký nhận thưởng"
            className="w-full"
            onClick={() => handleRegister()}
          />
        </div>
      </Modal>
    </div>
  );
};

export default CampaignDetail;