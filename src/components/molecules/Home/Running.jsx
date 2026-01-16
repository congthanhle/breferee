import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import Button from '@/components/atoms/Button';
import { useAuth } from '@/hooks/useAuth';
import { FaSquareCheck, FaSquare } from 'react-icons/fa6';
import { Input, Form } from 'antd';
import { useUserStore } from '@/state/user';
import { FollowOa } from '@/service/zalo/user/info';
import { UPDATE } from '@/store/user';
import { FORMAT_DATE, FORMAT_NUMBER } from '@/utils/format';
import { useSheetStore } from '@/state/sheet';
import { useGuidesStore } from '@/state';
import { HTTP_STATUS_CODE } from '@/utils/consts/httpCodes';
import Ended from '@/assets/icons/items/ended.png';
import EndedComponent from '@/components/molecules/Home/Ended';
import Slider from '@/components/atoms/Slider';
import Gift from '@/assets/images/graphics/Gift.png';
import { useLoadingStore } from '@/state';
import { blank } from '@/utils/variable';
import { rules } from '@/utils/consts/rules';

const index = ({ start_date, end_date, campaign }) => {
  const navigate = useNavigate();
  const { setLoading } = useLoadingStore();
  const { handleShareInfo } = useAuth();
  const { user, oaId, isAgreed, setIsAgreed, setUserField } = useUserStore();
  const [isAgreedState, setIsAgreedState] = useState(isAgreed);
  const { openSheet, closeSheet, setSwipeToClose } = useSheetStore();
  const { isEndedShown } = useGuidesStore();
  const [form] = Form.useForm();

  const homeRules = [
    'Số lượng các loại <strong>quà tặng có hạn</strong> và có thể <strong>hết trước thời hạn.</strong>',
    '<strong>Mỗi hóa đơn</strong> mua hàng hợp lệ chỉ được tham gia chương trình <strong>01 lần</strong> và chỉ trúng tối đa <strong>01 giải thưởng</strong>',
    'Giải <strong>E-coupon</strong> áp dụng cho : Bình nước MISTORI,  Bộ 36 bút màu TOPKID, Nem nhân tôm thịt 350 g, Giò lụa 250 g, Kem que 52 g (các hương vị), Kim chi 100 g, Trà tự nhiên ( vị tắc/ổi)',
    'Hình ảnh trong chương trình mang tính chất minh họa',
    'Thời gian diễn ra không bao gồm từ ngày 16/02/2026 - 20/02/2026',
  ];

  const products = [
    'SPDDCT cho trẻ từ 0 đến 6 tháng tuổi TH true FORMULA 1',
    'SPDDCT cho trẻ từ 6 đến 12 tháng tuổi TH true FORMULA 2',
    'SPDDCT cho trẻ từ 1 đến 2 tuổi TH true FORMULA 3',
    'SPDDCT sữa tươi cho trẻ từ 1 đến 2 tuổi TH true FORMULA 110 ml'
  ];

  const handleSharePhoneNumber = async () => {
    if (user?.phone && user?.display_name) return;
    try {
      await handleShareInfo();
    } catch (error) {
      if (error?.code === HTTP_STATUS_CODE.CUSTOM_ERROR_203) {
        setSwipeToClose(true);
        openSheet({
          title: 'Thông báo',
          children: (
            <div className="space-y-6">
              <img src={Ended} alt="Ended" className="w-32 mx-auto" />
              <p className="text-base text-black mb-4 text-center">Bạn đã từ chối chia sẻ thông tin nhiều lần. Vui lòng khởi động lại ứng dụng và chia sẻ thông tin để tiếp tục tham gia chương trình.</p>
              <Button
                text="Quay lại"
                onClick={() => {
                  closeSheet();
                }}
              />
            </div>
          )
        });
        return;
      }
      console.error('Chia sẻ số thông tin thất bại. Vui lòng thử lại.');
    }
  };

  const handleSubmit = useCallback(
    debounce(async () => {
      if (isEndedShown) {
        setSwipeToClose(true);
        openSheet({
          title: 'Thông báo',
          children: (
            <>
              <EndedComponent />
              <Button text="Quay lại trang chủ" onClick={() => {
                closeSheet();
              }} />
            </>
          )
        });
        return;
      }
      try {
        await form.validateFields();
        setLoading(true);
        if (!isAgreedState) return;
        if (!oaId?.followedOA) {
          await FollowOa();
        }
        const values = form.getFieldsValue();
        if (blank(user?.name)) {
          await UPDATE({ uid: oaId.uid, name: values.name });
          setUserField('name', values.name);
        }
        setIsAgreed(isAgreedState);
        navigate('/scan');
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, 200),
    []
  );

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
              setTimeout(() => navigate('/'), 300);
            }}
          />
        </>
      )
    });
  };

  const groupProducts = (products) => {
    if (!products || products.length === 0) return [];

    const groups = [];
    let currentIndex = 0;

    if (currentIndex < products.length) {
      groups.push(products.slice(currentIndex, currentIndex + 3));
      currentIndex += 3;
    }
    while (currentIndex < products.length) {
      groups.push(products.slice(currentIndex, currentIndex + 5));
      currentIndex += 5;
    }

    return groups;
  };

  const productGroups = groupProducts(campaign?.products);

  useEffect(() => {
    if (user?.phone && user?.display_name) {
      form.setFieldsValue({ phoneNumber: user?.phone, displayName: user?.display_name, name: user?.name });
    }
    if (user?.name) {
      setIsAgreed(true);
      setIsAgreedState(true);
    }
  }, [user]);

  return (
    <>
      <div className="w-full max-w-lg px-4">
        <div className=" mt-6 flex flex-col items-center sub-card rounded-xl w-full p-4 space-y-2">
          <p className="text-primary text-lg text-center font-bold uppercase">Thời gian diễn ra chương trình</p>
          <p className="text-white text-base">Từ <strong>{FORMAT_DATE(start_date)}</strong> đến <strong>hết ngày {FORMAT_DATE(end_date)}</strong></p>
        </div>
        <p className="mt-6 text-white text-2xl font-semibold text-center">Thông tin tham gia</p>
        <Form form={form} className="w-full max-w-lg flex flex-col space-y-4 items-center">
          <Form.Item
            name="displayName"
            label="Tên Zalo"
            className="w-full mb-0"
            rules={[{ required: true, message: 'Vui lòng chia sẻ tên Zalo' }]}
            required={false}
          >
            <Input
              readOnly
              className="h-12 text-base rounded-full px-4 border-none custom-input custom-placeholder"
              placeholder="Nhấn để chia sẻ tên Zalo"
              onClick={handleSharePhoneNumber}
            />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Số điện thoại"
            className="w-full mb-0"
            rules={[{ required: true, message: 'Vui lòng chia sẻ số điện thoại' }]}
            required={false}
          >
            <Input
              readOnly
              className="h-12 text-base rounded-full px-4 border-none custom-input custom-placeholder"
              placeholder="Nhấn để chia sẻ số điện thoại"
              onClick={handleSharePhoneNumber}
            />
          </Form.Item>
          <Form.Item
            name="name"
            label="Họ và tên"
            className="w-full mb-0"
            rules={[{ required: true, message: 'Vui lòng nhập Họ và tên' }]}
            required={false}
          >
            <Input
              readOnly={user?.name}
              placeholder="Nhập tên của bạn"
              className={`h-12 text-base rounded-full px-4 border-none ${user?.name ? 'custom-input custom-placeholder' : ''}`}
            />
          </Form.Item>
          <Form.Item
            name="agreed"
            valuePropName="checked"
            className="w-full mb-0"
            rules={[
              {
                validator: (_, value) =>
                  isAgreedState ? Promise.resolve() : Promise.reject(new Error('Vui lòng Đồng ý thể lệ tham gia'))
              }
            ]}
            required={false}
          >
            <div className="flex items-center gap-3 cursor-pointer w-full pt-2 pb-4 text-white">
              {isAgreedState ? (
                <FaSquareCheck size={24} className="flex-shrink-0" onClick={() => !isAgreed && setIsAgreedState(!isAgreedState)} />
              ) : (
                <FaSquare size={24} className="flex-shrink-0" onClick={() => !isAgreed && setIsAgreedState(!isAgreedState)} />
              )}
              <span className="text-white text-base">
                Đồng ý <span className="underline text-primary" onClick={() => handleReadPolicy()}>thể lệ</span> và quan tâm Zalo OA
              </span>
            </div>
          </Form.Item>
          <Button
            text="Tham gia quay thưởng"
            className="w-full"
            onClick={handleSubmit}
          />
        </Form>
      </div>
      <div className="w-full max-w-lg flex flex-col items-center pt-20 px-4">
        <img src={Gift} className="w-full" />
        <div className="bg-[#FFF8DF] p-4 w-[calc(100%-20px)] rounded-b-xl -mt-2 text-center border-2 border-[#81000200] ">
          <Slider dotColor="red" heightClass="h-96">
            {
              productGroups?.map((group, groupIndex) => (
                <div key={groupIndex} className="p-4 h-96">
                  {groupIndex === 0 ? (
                    <div className="flex flex-col gap-4 h-full justify-center">
                      <div className="flex justify-center">
                        <div className="w-full flex flex-col items-center ">
                          <div className="relative">
                            <img
                              src={group[0]?.image_path}
                              alt={group[0]?.name || 'Product 1'}
                              className="w-full h-60 object-contain"
                            />
                            {group[0]?.remaining_count !== undefined && (
                              <div className="absolute top-12 right-4 bg-secondary text-white text-base px-2 py-1 rounded-full min-h-8 min-w-8">
                                {FORMAT_NUMBER(group[0]?.remaining_count)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {group.slice(1, 3).map((product, productIndex) => (
                          <div key={productIndex} className="flex flex-col items-center relative">
                            <img
                              src={product?.image_path}
                              alt={product?.name || `Product ${productIndex + 2}`}
                              className="w-full h-28 object-contain"
                            />
                            {product?.remaining_count !== undefined && (
                              <div className="absolute top-0 left-3 bg-secondary text-white text-base px-2 py-1 rounded-full min-h-8 min-w-8">
                                {FORMAT_NUMBER(product?.remaining_count)}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4 h-full justify-center">
                      <div className="grid grid-cols-2 gap-4">
                        {group.slice(0, 2).map((product, productIndex) => (
                          <div key={productIndex} className="flex flex-col items-center relative">
                            <img
                              src={product?.image_path}
                              alt={product?.name || `Product ${productIndex + 1}`}
                              className="w-full h-24 object-contain"
                            />
                            {product?.remaining_count !== undefined && (
                              <div className="absolute top-0 left-3 bg-secondary text-white text-base px-2 py-1 rounded-full min-h-8 min-w-8">
                                {FORMAT_NUMBER(product?.remaining_count)}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      {group[2] && (
                        <div className="flex justify-center">
                          <div className="w-1/2 flex flex-col items-center relative">
                            <img
                              src={group[2]?.image_path}
                              alt={group[2]?.name || 'Product 3'}
                              className="w-full h-24 object-contain"
                            />
                            {group[2]?.remaining_count !== undefined && (
                              <div className="absolute top-0 left-3 bg-secondary text-white text-base px-2 py-1 rounded-full min-h-8 min-w-8">
                                {FORMAT_NUMBER(group[2]?.remaining_count)}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      {group.length > 3 && (
                        <div className="grid grid-cols-2 gap-4">
                          {group.slice(3, 5).map((product, productIndex) => (
                            <div key={productIndex} className="flex flex-col items-center relative">
                              <img
                                src={product?.image_path}
                                alt={product?.name || `Product ${productIndex + 4}`}
                                className="w-full h-24 object-contain"
                              />
                              {product?.remaining_count !== undefined && (
                                <div className="absolute top-0 left-3 bg-secondary text-white text-base px-2 py-1 rounded-full min-h-8 min-w-8">
                                  {FORMAT_NUMBER(product?.remaining_count)}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))
            }
          </Slider>
          <ul className="list-none mt-16">
            {
              homeRules.map((rule, index) => (
                <li key={index} className="text-base text-black text-left mb-2 flex items-start gap-2">
                  <span className="text-black mt-1">*</span>
                  <span dangerouslySetInnerHTML={{ __html: rule }}></span>
                </li>
              ))
            }
          </ul>
          <p className="font-semibold text-left text-base">Các sản phẩm không áp dụng trong chương trình:</p>
          <ul className="list-none mt-2">
            {
              products.map((rule, index) => (
                <li key={index} className="text-base text-black text-left mb-2 flex items-start gap-2">
                  <span className="text-black mt-1">•</span>
                  <span dangerouslySetInnerHTML={{ __html: rule }}></span>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
      <div className="px-4 w-full mx-auto max-w-lg">
        <div className="sub-card mt-8 w-full max-w-lg rounded-xl p-4">
          <p className="text-xl text-primary text-center font-semibold">CÔNG TY CỔ PHẦN <br /> CHUỖI THỰC PHẨM TH</p>
          <p className="text-center text-base mt-4 text-white">Hotline hỗ trợ: <strong>1800 54 54 40 (phím 4)</strong> <br /> 8:30 đến 18:00, từ thứ 2 đến thứ 6</p>
          <p className="text-center text-base text-white">Trụ sở: 166 Nguyễn Thái Học,<br /> P.Thành Vinh, Tỉnh Nghệ An</p>
        </div>
      </div>
    </>

  );
};

export default index;