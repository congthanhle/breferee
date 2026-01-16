import { useEffect } from 'react';
import { FORMAT_DATE } from '@/utils/format';
import { useLoadingStore } from '@/state';

const Ecoupon = ({ image, title, desc, expiry_date }) => {
  const { setLoading } = useLoadingStore();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <div className="text-center">
      <p className="text-primary uppercase font-bold text-3xl">
        Chúc mừng bạn <br/> đã trúng thưởng
      </p>
      <img src={image} className="my-4 transform 1s ease-in"/>
      <p className="text-white text-xl mb-4 font-semibold">{title}</p>
      <p className="text-white text-base">{desc}</p>
      <p className="text-white font-semibold my-4 text-base">HSD: 08/01/2026 đến hết {FORMAT_DATE(expiry_date)}</p>
      <p className="text-center text-white text-base">
        Mã E-coupon sẽ được hệ thống gửi trực tiếp đến số điện thoại đăng ký quay thưởng thông qua Zalo OA TH Official.
      </p>
    </div>
  );
};

export default Ecoupon;