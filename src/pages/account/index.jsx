import { useEffect } from 'react';
import { useUserStore } from '@/state/user';
import ItemGraphic from '@/assets/images/graphics/sub.png';
import { FaChevronRight } from 'react-icons/fa';
import { useLoadingStore } from '@/state';
import { useSheetStore } from '@/state/sheet';
import Button from '@/components/atoms/Button';
import { useNavigate } from 'react-router-dom';
import HomeUpcoming from '@/components/molecules/Home/Upcoming';
import PolicyContent from '@/components/molecules/Policy/Content';
import Faq from '@/components/molecules/Policy/Faq';
import { policies, securityTips } from '@/utils/consts/helper';
import { FORMAT_PHONE_NUMBER } from '@/utils/format';
import { rules } from '@/utils/consts/rules';

const Account = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { setLoading } = useLoadingStore();
  const { openSheet, closeSheet, setSwipeToClose } = useSheetStore();

  const menuItems = [
    { id: 1, name: 'Chi tiết hướng dẫn tham gia', title: 'Hướng dẫn tham gia' },
    { id: 2, name: 'Chi tiết thể lệ chương trình', title: 'Thể lệ chương trình' },
    { id: 3, name: 'Điều khoản và chính sách bảo mật', title: 'Điều khoản & chính sách' },
    { id: 4, name: 'Câu hỏi thường gặp (FAQ)', title: 'Câu hỏi thường gặp (FAQ)' }
  ];

  const renderPolicyContent = (policyId) => {
    switch (policyId) {
    case 1:
      return <HomeUpcoming date={null} custom />;
    case 2:
      return <div dangerouslySetInnerHTML={{ __html: rules }} />;
    case 3:
      return <PolicyContent policies={policies} securityTips={securityTips} />;
    case 4:
      return <Faq />;
    default:
      return null;
    }
  };

  const handleOpenSheet = (policy) => {
    setSwipeToClose(true);
    openSheet({
      title: policy.title,
      children: (
        <>
          {renderPolicyContent(policy.id)}
          {
            policy.id !== 1 && (
              <div className="pt-4 w-full">
                <Button
                  text="QUAY LẠI TRANG CHỦ"
                  onClick={() => {
                    closeSheet();
                    setTimeout(() => navigate('/'), 300);
                  }}
                />
              </div>)
          }
        </>
      )
    });
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 300);
  }, []);

  return (
    <div className="flex flex-col items-center pb-2">
      <img src={ItemGraphic} alt="Item Graphic" className="w-full -mt-6 mb-6" />
      <div className="w-full px-4 space-y-6 max-w-lg mx-auto">
        <p className="text-center text-white font-semibold text-2xl">Thông tin cá nhân</p>
        <div>
          <div className="flex items-center space-x-4 bg-[#FFF8DF] rounded-2xl px-4 py-3 z-20 relative">
            <img className="w-16 h-16 rounded-full object-cover" src={user?.avatar || 'https://cdn-icons-png.flaticon.com/128/1144/1144760.png'} />
            <div>
              <p>Xin chào,</p>
              <p className="text-lg font-medium">{user?.display_name || 'Khách hàng'}</p>
            </div>
          </div>
          <div className="text-white sub-card px-4 pb-4 pt-12 space-y-3 rounded-2xl -mt-8 z-10 relative text-center text-base">
            <div className="flex justify-between">
              <p>Zalo</p>
              <p className="font-semibold text-primary">{user?.display_name || '--'}</p>
            </div>
            <div className="flex justify-between">
              <p>Họ và tên</p>
              <p className="font-semibold text-primary">{user?.name || '--'}</p>
            </div>
            <div className="flex justify-between">
              <p>Số điện thoại</p>
              <p className="font-semibold text-primary">{FORMAT_PHONE_NUMBER(user?.phone) || '--'}</p>
            </div>
          </div>
        </div>
        <div className="sub-card rounded-2xl p-4">
          {menuItems.map((item) => (
            <div
              key={item.name}
              className="
                py-3 cursor-pointer flex justify-between items-center text-primary dashed-custom
              "
              onClick={() => handleOpenSheet(item)}
            >
              <p className="text-base">{item.name}</p>
              <FaChevronRight size={12} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Account;