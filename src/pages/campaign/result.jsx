import { useLocation, useNavigate } from 'react-router-dom';
import NoGift from '@/components/molecules/Campaign/Result/NoGift';
import ECoupon from '@/components/molecules/Campaign/Result/ECoupon';
import Form from '@/components/molecules/Campaign/Result/Form';
import ItemGraphic from '@/assets/images/graphics/sub.png';
import Button from '@/components/atoms/Button';
import { notEmpty, empty } from '@/utils/variable.js';

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const result = location.state?.data;

  const renderContent = () => {
    if (!result) {
      return <NoGift />;
    }

    if (notEmpty(result?.information_required)) {
      return <Form fields={result?.information_required} couponId={result?.id} store={result?.store}/>;
    }

    return (
      <ECoupon
        title={result?.coupon.coupon_name}
        desc={result?.coupon.description}
        image={result?.coupon.image_path}
        expiry_date={result?.using_limit}
      />
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <img src={ItemGraphic} alt="Item Graphic" className="w-full -mt-6 mb-6" />
      <div className="w-full px-4 max-w-lg mx-auto flex flex-col flex-1 pb-8">
        <div className="flex-1 mb-6">
          {renderContent()}
        </div>
        {
          empty(result?.information_required) &&  (
            <div className="mt-auto">
              <Button
                text="Quay lại trang chủ"
                className="w-full"
                onClick={() => navigate('/', { replace: true })}
              />
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Result;