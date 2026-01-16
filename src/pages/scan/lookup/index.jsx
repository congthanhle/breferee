import { Form, Input } from 'antd';
import Button from '@/components/atoms/Button';
import { useNavigate } from 'react-router-dom';
import { SCAN } from '@/store/scan';
import { useSheetStore } from '@/state/sheet';
import ItemGraphic from '@/assets/images/graphics/main.png';
import { useLoadingStore } from '@/state';

const index = () => {
  const navigate = useNavigate();
  const { openSheet, closeSheet, setSwipeToClose  } = useSheetStore();
  const [form] = Form.useForm();
  const { setLoading } = useLoadingStore();

  const handleSubmit = async () => {
    const values = await form.validateFields();
    if (!values.billCode) return;

    try {
      setLoading(true, 'Đang kiểm tra hóa đơn. Vui lòng chờ...');
      await SCAN({ invoice_code: values.billCode });
    } catch (error) {
      setSwipeToClose(true);
      openSheet({
        title: 'Thông báo',
        children: (
          <div className="flex flex-col justify-center space-y-6 w-full">
            {error?.data?.image_path && <img src={error?.data?.image_path} className="w-32 mx-auto" />}
            <div className="space-y-2 w-full">
              {error?.message && <p className="text-center text-black text-lg font-semibold">{error?.message}</p>}
              {error?.data?.sub_message && <p className="text-center text-lg text-black" dangerouslySetInnerHTML={{ __html: error?.data?.sub_message }}></p>}
            </div>
            <Button
              text="Quay lại trang chủ"
              className="w-full"
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

  return (
    <div className="flex flex-col items-center pb-12 max-h-full">
      <img src={ItemGraphic} alt="Item Graphic" className="w-full -mt-8" />
      <div className="px-4 max-w-lg mx-auto">
        <div className="my-6 text-white text-center space-y-2">
          <p className="text-2xl font-semibold ">Nhập mã tra cứu</p>
          <p className="text-lg leading-6">Mã tra cứu được in trên hóa đơn giấy (bên dưới mã QR). Hệ thống tiếp nhận và xét duyệt thông tin hóa đơn.</p>
        </div>
        <Form form={form} layout="vertical">
          <Form.Item
            name="billCode"
            className="w-full pb-2"
            rules={[{ required: true, message: 'Vui lòng nhập Mã tra cứu' }]}
            required={false}
          >
            <Input
              placeholder="Mã hóa đơn"
              className="h-12 text-lg px-4 rounded-full w-full mt-2 border-none"
            />
          </Form.Item>
          <Button
            text="Xác nhận"
            className="w-full"
            onClick={handleSubmit}
          />
        </Form>
      </div>
    </div>
  );
};

export default index;