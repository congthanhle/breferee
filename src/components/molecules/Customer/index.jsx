import { useState, useEffect } from 'react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import Button from '@/components/atoms/Button/Icon';
import { HiOutlineGiftTop } from 'react-icons/hi2';
import { MdOutlinePlace } from 'react-icons/md';

const index = ({ customer, listVersion }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setIsExpanded(false);
  }, [listVersion]);

  return (
    <div className="sub-card px-4 py-5 rounded-2xl">
      <div className={`flex justify-between items-center ${isExpanded ? 'dashed-custom pb-4' : ''}`}>
        <p className="text-white font-medium text-lg">{customer?.user_name} - {customer?.user_phone}</p>
        <Button
          icon={isExpanded ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
          onClick={() => setIsExpanded(!isExpanded)}
        />
      </div>
      {
        isExpanded && (
          <div className="pt-4 space-y-4 text-base transition-all duration-300 ease-in-out">
            <div className="text-white flex items-start gap-2">
              <HiOutlineGiftTop size={24} className="flex-shrink-0" />
              <p>{customer?.coupon_name}</p>
            </div>
            <div className="text-white flex items-start gap-2">
              <MdOutlinePlace size={24} className="flex-shrink-0" />
              <p>{customer?.store_name || '--'}</p>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default index;