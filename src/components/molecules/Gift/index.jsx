import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tag } from 'antd';
import Button from '@/components/atoms/Button/Icon';
import ButtonText from '@/components/atoms/Button';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { FORMAT_DATE, FORMAT_PHONE_NUMBER } from '@/utils/format.js';
import { QRCode } from 'antd';

const index = ({ item, initialExpanded = false }) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(initialExpanded);

  const handleGoToRegister = () => {
    navigate('/campaign/result', {
      state: {
        data: item
      }
    });
  };

  return (
    <div>
      <div className="relative w-full h-32">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 319 130"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFF8DF" />
              <stop offset="100%" stopColor="#FFF0C8" />
            </linearGradient>
          </defs>
          <path
            d="M16 0 H90 C92 0 94 1 95 3 C97 6 102 6 104 3 C105 1 107 0 109 0 H303 C312 0 319 7 319 16 V114 C319 123 312 130 303 130 H109 C107 130 105 129 104 127 C102 124 97 124 95 127 C94 129 92 130 90 130 H16 C7 130 0 123 0 114 V16 C0 7 7 0 16 0 Z"
            fill="url(#gradient)"
          />
        </svg>
        <div className="absolute inset-0 flex items-stretch">
          <div className="w-28 flex items-center justify-center p-2">
            <img src={item?.image_path} alt="" className="w-24 h-24 object-contain" />
          </div>
          <div className="flex-1 px-2 py-3 flex justify-between items-center gap-2">
            <div className="space-y-2 flex-1">
              <p className="text-lg font-semibold line-clamp-3">{item?.coupon.coupon_name}</p>
              {
                (item?.pay_status !== 1 && item.type === 2) && (
                  <Tag color="red" className="font-medium py-1 px-3 rounded-full border-none text-xs bg-red-500">
                    Chưa đăng ký
                  </Tag>
                )
              }
              {
                item?.coupon_id !== 1 && <p className="text-sm text-black">HSD: {FORMAT_DATE(item?.coupon.using_limit)}</p>
              }
            </div>
            {!isExpanded ? <Button icon={<FaChevronDown size={12} />} onClick={() => setIsExpanded(true)} /> : <div className="w-6 h-6"></div>}
          </div>
        </div>
      </div>
      {isExpanded && (
        <div className="relative w-full sub-card rounded-2xl px-4 pb-4 text-white  space-y-3 text-base border-t-none transition-all duration-750 ease-in-out">
          <Button
            icon={<FaChevronUp size={12} />}
            onClick={() => setIsExpanded(false)}
            className="absolute -top-4 right-2"
          />
          {
            item?.type !== 1 && (
              <>
                <p className="text-center text-lg font-bold">Thông tin đăng ký</p>
                <div className="flex justify-between">
                  <p>Họ và tên</p>
                  <p className="text-primary font-semibold">{item?.backend_user?.name || '--'}</p>
                </div>
                <div className="flex justify-between">
                  <p>Số điện thoại</p>
                  <p className="text-primary font-semibold">{FORMAT_PHONE_NUMBER(item?.backend_user?.phone) || '--'}</p>
                </div>
                {item?.information_required && Object.entries(item.information_required).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <p>{value}</p>
                    <p className="text-primary font-semibold">{item?.delivery_info?.[key] || '--'}</p>
                  </div>
                ))}
                <div className="flex justify-between gap-2">
                  <p>Cửa hàng nhận quà</p>
                  <p className="text-primary font-semibold text-right">{item?.store?.name || '--'}</p>
                </div>
                {
                  item?.pay_status === 0 && (
                    <div className="pt-2">
                      <ButtonText
                        text="Đăng ký thông tin"
                        onClick={handleGoToRegister}
                      />
                    </div>
                  )
                }
              </>
            )
          }
          {
            item?.coupon_id !== 1 && (
              <div className="flex justify-center items-center gap-6 pt-2">
                <div className="text-center text-base">
                  <p>{item?.type !== 1 ? 'Mã quà tặng' : 'Mã coupon'}</p>
                  <p className="text-primary font-semibold">{item?.code || '--'}</p>
                </div>
                <QRCode
                  style={{ padding: 4, backgroundColor: 'white', borderRadius: 8 }}
                  value={item?.code}
                  size={90}
                  errorLevel='H'
                />
              </div>
            )
          }
        </div>
      )}
    </div>
  );
};

export default index;