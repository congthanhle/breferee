import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/atoms/Button';
import { Form, Input } from 'antd';
import { useUserStore } from '@/state/user';
import { useSheetStore } from '@/state/sheet';
import { useLoadingStore } from '@/state';
import { RECEIVE_REGISTER } from '@/store/campaign';
import { useRegisterStore } from '@/state';
import { phoneNumberValidator, identityNumberValidator } from '@/utils/validate';

const RegisterForm = ({ fields, couponId, store }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { openSheet, closeSheet } = useSheetStore();
  const { user } = useUserStore();
  const { setLoading } = useLoadingStore();
  const { setRegisterSuccessState } = useRegisterStore();

  const handleConfirm = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      openSheet({
        title: 'Xác nhận thông tin',
        children: (
          <div className="flex flex-col justify-center space-y-4 w-full">
            <div className="text-lg text-black ">
              <div className="flex justify-between items-center dashed-gray-custom py-4">
                <p>Họ và tên</p>
                <p className="font-semibold">{values?.name}</p>
              </div>
              <div className="flex justify-between items-center dashed-gray-custom py-4">
                <p>Số điện thoại</p>
                <p className="font-semibold">{values?.phoneNumber}</p>
              </div>
              {fields && Object.entries(fields).map(([fieldName, fieldLabel]) => (
                <div key={fieldName} className="flex justify-between items-center dashed-gray-custom py-4">
                  <p>{fieldLabel}</p>
                  <p className="font-semibold">{values?.[fieldName] || 'N/A'}</p>
                </div>
              ))}
              <div className="flex justify-between items-center dashed-gray-custom py-4 gap-2">
                <p>Cửa hàng nhận thưởng</p>
                <p className="font-semibold text-right">TH true mart <br /> {store?.address}</p>
              </div>
              <p className="text-center mt-4">(*) BTC không chịu trách nhiệm nếu Khách hàng cung cấp thông tin không chính xác</p>
            </div>
            <Button
              text="Xác nhận"
              className="w-full"
              onClick={() => {
                closeSheet();
                setTimeout(() => handleSubmit(), 300);
              }}
            />
            <p
              className="text-center text-lg text-secondary"
              onClick={() => closeSheet()}
            >
              Quay lại chỉnh sửa
            </p>
          </div>
        )
      });
    } catch (error) {
      console.error('Validation Failed:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await form.validateFields();
      const values = form.getFieldsValue();
      const { name, phoneNumber, ...dynamicFields } = values;
      const payload = dynamicFields;
      const response = await RECEIVE_REGISTER(couponId, payload);
      setRegisterSuccessState(true);
      setTimeout(() => navigate('/campaign/result/success', {
        state: { desc: response?.description },
        replace: true
      }), 200);
    } catch (error) {
      console.error('Validation Failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputBlur = () => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
  };

  useEffect(() => {
    if (user?.phone && user?.name) {
      form.setFieldsValue({ phoneNumber: user?.phone, name: user?.name });
    }
  }, [user]);

  useEffect(() => {
    const handleResize = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div className="">
        <p className="text-white font-bold text-2xl text-center">
          Đăng ký nhận thưởng
        </p>
        <p className="text-white text-base text-center mt-4">
          Vui lòng giữ lại hóa đơn trúng thưởng và điền thông tin nhận thưởng sau
        </p>
        <Form form={form} className="w-full max-w-lg flex flex-col space-y-4 items-center">
          <Form.Item
            name="name"
            label="Họ và tên"
            className="w-full mb-0"
            rules={[{ required: true, message: 'Vui lòng hoàn tất thông tin tại trang chủ' }]}
            required={false}
          >
            <Input
              readOnly
              className="h-12 text-base rounded-full px-4 border-none custom-input custom-placeholder"
              onBlur={handleInputBlur}
            />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Số điện thoại"
            className="w-full mb-0"
            rules={[{ required: true, message: 'Vui lòng hoàn tất thông tin tại trang chủ' }]}
            required={false}
          >
            <Input
              readOnly
              className="h-12 text-base rounded-full px-4 border-none custom-input custom-placeholder"
              onBlur={handleInputBlur}
            />
          </Form.Item>
          {fields && Object.entries(fields)?.map(([fieldName, fieldLabel]) => {
            const rules = [{ required: true, message: `Vui lòng nhập ${fieldLabel}` }];

            if (fieldName === 'contact_phone') {
              rules.push({ validator: phoneNumberValidator });
            } else if (fieldName === 'id_number') {
              rules.push({ validator: identityNumberValidator });
            }

            return (
              <Form.Item
                key={fieldName}
                name={fieldName}
                label={fieldLabel}
                className="w-full mb-0"
                rules={rules}
              >
                <Input
                  placeholder={`Nhập ${fieldLabel}`}
                  className="h-12 text-base rounded-full px-4 border-none w-full"
                  onBlur={handleInputBlur}
                  inputMode="numeric"
                />
              </Form.Item>
            );
          })}
          <div className="w-full text-base">
            <p className=" text-white">Cửa hàng nhận thưởng</p>
            <div className="w-full sub-card rounded-xl p-4 mt-2 text-white">
              <p className="font-semibold">TH true mart {store?.name}</p>
              <p>{store?.address}</p>
            </div>
          </div>
          <div className="pt-4 w-full">
            <Button
              text="Đăng ký nhận thưởng"
              className="w-full"
              onClick={handleConfirm}
            />
          </div>
        </Form>
      </div>
    </>
  );
};

export default RegisterForm;