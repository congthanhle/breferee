import { useState, useEffect } from 'react';
import ItemGraphic from '@/assets/images/graphics/sub.png';
import { Select, Input } from 'antd';
import { TbDeviceMobileSearch } from 'react-icons/tb';
import { FiSearch } from 'react-icons/fi';
import Button from '@/components/atoms/Button/Icon';
import ButtonText from '@/components/atoms/Button';
import { FETCH_CUSTOMERS, FETCH_COUPONS } from '@/store/gift';
import CustomerCard from '@/components/molecules/Customer';
import { useLoadingStore } from '@/state';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSheetStore } from '@/state/sheet';

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const { setLoading } = useLoadingStore();
  const { openSheet, closeSheet, setSwipeToClose } = useSheetStore();
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [searchedPhone, setSearchedPhone] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [listVersion, setListVersion] = useState(0);

  const handleChange = (value) => {
    setSelectedCoupon(value);
  };

  const SearchSheet = () => {
    const [phone, setPhone] = useState(searchedPhone);
    const handleSubmit = async () => {
      setSearchedPhone(phone);
      setHasMore(true);
      await fetchCustomers(1, phone);
      closeSheet();
    };
    return (
      <div className="w-full space-y-6">
        <div className="space-y-2">
          <label className="text-lg">Số điện thoại</label>
          <Input
            className="h-12 border-black rounded-full text-lg"
            inputMode='numeric'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Nhập số điện thoại"
            allowClear
          />
        </div>
        <ButtonText
          text="Xác nhận"
          onClick={handleSubmit}
        />
      </div>
    );
  };

  const handleSheetSearch = () => {
    setSwipeToClose(true);
    openSheet({
      title: 'Tra cứu',
      children: <SearchSheet />
    });
  };

  const handleSearchCoupon = async () => {
    setHasMore(true);
    await fetchCustomers(1, searchedPhone, selectedCoupon);
  };

  const fetchCustomers = async (pageNum = 1, phone = searchedPhone, coupon_id = selectedCoupon) => {
    try {
      if (pageNum === 1) {
        setLoading(true, 'Đang tải danh sách trúng thưởng...');
      }
      const data = await FETCH_CUSTOMERS({ page: pageNum, phone: phone?.trim(), coupon_id });
      if (pageNum === 1) {
        setListVersion(prev => prev + 1);
        setCustomers(data);
      } else {
        setCustomers(prev => [...prev, ...data]);
      }
      if (!data || data.length === 0) {
        setHasMore(false);
      }
      setPage(pageNum);
    } catch (error) {
      console.error('Error fetching customers:', error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreCustomers = () => {
    fetchCustomers(page + 1);
  };

  const fetchCoupons = async () => {
    try {
      const coupons = await FETCH_COUPONS();
      setCoupons([{ label: 'Tất cả quà tặng', value: null }, ...coupons]);
    } catch (error) {
      console.error('Error fetching coupons:', error);
    }
  };

  useEffect(() => {
    Promise.all([fetchCoupons(), fetchCustomers()]);
  }, []);


  return (
    <div className="flex flex-col items-center">
      <img src={ItemGraphic} alt="Item Graphic" className="w-full -mt-6 mb-6" />
      <div className="w-full px-4 space-y-4 max-w-lg mx-auto">
        <p className="text-center text-white font-semibold text-2xl">Danh sách trúng thưởng</p>
        <div className="flex gap-2">
          <div className="w-full flex justify-between items-center">
            <Select
              defaultValue={null}
              onChange={handleChange}
              options={coupons}
              className="custom-select flex-1"
              placeholder="Chọn quà tặng"
            />
            <div className="h-12 bg-white flex items-center justify-center rounded-r-full py-2 flex-shrink-0">
              <div className="border-l pl-2 pr-3 h-full flex items-center justify-center">
                <TbDeviceMobileSearch onClick={handleSheetSearch} size={24} />
              </div>
            </div>
          </div>
          <Button
            icon={<FiSearch size={26} />}
            className="p-3 flex-shrink-0"
            onClick={handleSearchCoupon}
          />
        </div>
        {customers?.length === 0 ? (
          <p className="text-center py-4 text-primary text-base">Chưa có dữ liệu</p>
        ) : (
          <InfiniteScroll
            dataLength={customers.length}
            next={fetchMoreCustomers}
            hasMore={hasMore}
            loader={<div className="text-center py-4 text-primary text-base">Đang tải...</div>}
            endMessage={<div className="text-center p2-4 text-primary text-base">Đã hiển thị tất cả</div>}
            height="calc(100vh - 380px)"
            className="pb-8 space-y-3"
          >
            {
              customers.map((customer, index) => (
                <CustomerCard
                  key={index}
                  listVersion={listVersion}
                  customer={customer}
                />
              ))
            }
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};

export default Customer;