import { useNavigate } from 'react-router-dom';
import { scanQRCode } from 'zmp-sdk/apis';
import { useSheetStore } from '@/state/sheet';
import Button from '@/components/atoms/Button';
import { useLoadingStore } from '@/state';
import ItemGraphic from '@/assets/images/graphics/sub.png';
import LogoScan from '@/assets/images/scan/LogoScan.png';
import { SCAN } from '@/store/scan';
import GroupButton from '@/components/atoms/Button/Group';
import { ButtonOptions } from '@/utils/enums';
import { FaCheck } from 'react-icons/fa6';
import { useGuidesStore } from '@/state';
import Ended from '@/components/molecules/Home/Ended';
import Pending from '@/components/molecules/Home/Pending';
import { useEffect } from 'react';

const index = () => {
  const navigate = useNavigate();
  const { openSheet, closeSheet, setSwipeToClose } = useSheetStore();
  const { setLoading } = useLoadingStore();
  const { isEndedShown, rules, isPending } = useGuidesStore();

  const notice = [
    'Đặt QR code nằm gọn trong khung quét',
    'QR code cần rõ nét, không bị che khuất, gạch xóa, mất nét hoặc gấp nếp',
    'Quét trong điều kiện ánh sáng phù hợp, tránh quá tối hoặc quá chói'
  ];

  const scanQR = async () => {
    try {
      const { content } = await scanQRCode();
      if (!content){
        navigate('/scan');
        return;
      }
      await handleCheckBill(content);
    } catch (error) {
      console.error('Scan QR error: ', error);
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
            text="QUAY LẠI TRANG CHỦ"
            onClick={() => {
              closeSheet();
            }}
          />
        </>
      )
    });
  };

  const handleButtonClick = (buttonId) => {
    closeSheet();
    switch (buttonId) {
    case ButtonOptions.PROGRAM:
      setTimeout(() => handleReadPolicy(), 300);
      break;
    case ButtonOptions.QR:
      setTimeout(() => scanQR(), 200);
      break;
    case ButtonOptions.LOOKUP:
      setTimeout(() => navigate('/scan/lookup'), 300);
      break;
    case ButtonOptions.HOME:
      setTimeout(() => navigate('/'), 300);
      break;
    default:
      break;
    }
  };

  const handleCheckBill = async (billCode) => {
    try {
      setLoading(true, 'Đang kiểm tra hóa đơn. Vui lòng chờ...');
      const cleanUrl = billCode.replace(/"/g, '');
      const res = await SCAN({
        e_invoice_url: cleanUrl,
      });
      navigate(`/campaign?user_authorization=${res?.user_authorization}&cp_url_id=${res?.cp_url_id}`);
    } catch (error) {
      setLoading(false);
      setSwipeToClose(true);
      openSheet({
        title: 'Thông báo',
        children: (
          <div className="flex flex-col justify-center space-y-6 w-full">
            {error?.data?.image_path && <img src={error?.data?.image_path} className="w-32 mx-auto"/>}
            <div className="space-y-2 w-full">
              {error?.message && <p className="text-center text-black text-lg font-semibold">{error?.message}</p>}
              {error?.data?.sub_message && <p className="text-center text-lg text-black">{error?.data?.sub_message}</p>}
            </div>
            <GroupButton
              buttons={error?.data?.buttons}
              onButtonClick={handleButtonClick}
            />
          </div>
        )
      });
    }
  };

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
              }}/>
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
    <div className="flex flex-col items-center pb-10">
      <img src={ItemGraphic} alt="Item Graphic" className="w-full -mt-6 mb-6"/>
      <div className="w-full px-4 max-w-lg space-y-6 text-white mx-auto">
        <p className="text-center font-semibold text-2xl">HƯỚNG DẪN QUÉT HÓA ĐƠN</p>
        <img src={LogoScan} className="w-24 mx-auto"/>
        <p className="text-base">
          Sử dụng <strong>tính năng quét mã trong miniapp</strong> để quét <strong>QR code</strong> trên hóa đơn tham gia chương trình.
        </p>
        <div className="space-y-4 pb-4">
          <p className="font-semibold text-base">Lưu ý khi quét QR code</p>
          <ul className="text-base">
            {notice.map((item, index) => (
              <li key={index} className="flex items-center gap-2 mb-2">
                <FaCheck className="flex-shrink-0" size={14}/>
                <span>{item}</span>
              </li>
            ))
            }
          </ul>
          <p className="text-base">
            Trường hợp <strong>không quét được mã QR code</strong> vui lòng <strong>nhập mã tra cứu hóa đơn</strong> (mã phía dưới QR code)
          </p>
        </div>
        <Button
          text="Quét ngay"
          onClick={() => scanQR()}
        />
        <Button
          text="Nhập mã tra cứu hóa đơn"
          onClick={() => {
            navigate('/scan/lookup');
          }}
        />
        <p className="text-base text-primary text-center" onClick={() => navigate('/')}>Quay lại trang chủ</p>
      </div>
    </div>
  );
};

export default index;