import { useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ItemGraphic from '@/assets/images/graphics/main.png';
import Button from '@/components/atoms/Button';
import { useRegisterStore } from '@/state';

const Success = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const description = location.state?.desc;
  const { isRegisterSuccess, resetRegisterSuccessState } = useRegisterStore();

  const handleNavigate = useCallback((path) => {
    resetRegisterSuccessState();
    navigate(path, { replace: true });
  }, [navigate, resetRegisterSuccessState]);

  useEffect(() => {
    if (!isRegisterSuccess) {
      handleNavigate('/');
    }
  }, [isRegisterSuccess, handleNavigate]);

  return (
    <div className="flex flex-col items-center pb-12 min-h-screen">
      <img src={ItemGraphic} alt="Item Graphic" className="w-full -mt-8" />
      <div className="text-center px-4 space-y-6 max-w-lg mx-auto">
        <p className="mt-4 text-primary uppercase font-bold text-3xl">Đăng ký nhận thưởng thành công</p>
        {description && <div className="text-white text-base mt-6" dangerouslySetInnerHTML={{ __html: description }} />}
      </div>
      <div className="space-y-4 mt-auto px-4 max-w-lg w-full text-center">
        <Button
          text="Quà tặng của tôi"
          onClick={() => handleNavigate('/gift')}
        />
        <p className="text-primary cursor-pointer" onClick={() => handleNavigate('/')}>Quay lại trang chủ</p>
      </div>
    </div>
  );
};

export default Success;