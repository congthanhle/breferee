import { useState, useEffect } from 'react';
import ItemGraphic from '@/assets/images/graphics/sub.png';
import EmptyCard from '@/assets/icons/items/Empty_State.png';
import GiftCard from '@/components/molecules/Gift';
import { useLoadingStore } from '@/state';
import { FETCH_USER_COUPONS } from '@/store/gift';
import { useSearchParams } from 'react-router-dom';

const index = () => {
  const [searchParams] = useSearchParams();
  const { setLoading } = useLoadingStore();
  const [coupons, setCoupons] = useState([]);
  const selectedCoupon = searchParams.get('code');

  const fetchCoupons = async () => {
    try {
      setLoading(true, 'Đang tải quà tặng...');
      const data = await FETCH_USER_COUPONS();
      setCoupons(data);
    } catch (error) {
      setCoupons([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  useEffect(() => {
    if (coupons.length > 0 && selectedCoupon) {
      setTimeout(() => {
        const element = document.getElementById(`coupon-${selectedCoupon}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 300);
    }
  }, [coupons, selectedCoupon]);

  return (
    <div className="w-full min-h-full">
      <img src={ItemGraphic} alt="Item Graphic" className="w-full -mt-6 mb-4" />
      <p className="text-center text-white font-semibold text-2xl">Quà tặng của tôi</p>
      {
        coupons?.length === 0 && (
          <div className="px-4 my-8 space-y-4 max-w-lg mx-auto text-center ">
            <img src={EmptyCard} className="w-36 mx-auto" />
            <p className="text-lg font-semibold text-primary mt-6 px-4">Bạn chưa có quà tặng nào</p>
            <p className="text-base text-white mt-6 px-4">Đừng bỏ lỡ cơ hội tiếp tục mua sắm và nhận quà tặng giá trị từ chương trình</p>
          </div>
        )
      }
      <div className="px-4 my-6 space-y-4 max-w-lg mx-auto">
        {coupons?.map((item) => (
          <div key={item.id} id={`coupon-${item.code}`}>
            <GiftCard
              item={item}
              initialExpanded={item.code === selectedCoupon}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default index;