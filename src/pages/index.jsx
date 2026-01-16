import { useState, useEffect } from 'react';
import { Input, Tag } from 'antd';
import { toOptions } from '@/utils/convert';
import { MatchStatus, MatchStatusLabel } from '@/utils/enums/match';

const index = () => {
  const [selectedStatus, setSelectedStatus] = useState(String(MatchStatus.NOT_STARTED));

  const mockData = [

  ];

  const renderStatusTags = () => {
    return toOptions(MatchStatusLabel).map(({ value, label }) => {
      const isSelected = selectedStatus === value;
      return (
        <Tag
          key={value}
          className={`text-base px-2 py-1 ${isSelected
            ? 'bg-white !text-teal-500'
            : '!border-white !text-white bg-transparent'
          }`}
          style={{
            borderWidth: isSelected ? 0 : 1,
          }}
          onClick={() => setSelectedStatus(isSelected ? null : value)}
        >
          {label}
        </Tag>
      );
    });
  };

  return (
    <div className="">
      <div className="W-full bg-teal-500 p-4 rounded-b-2xl">
        <Input
          className='h-10 text-lg'
          placeholder='Nhập tên trận đấu, tên VĐV'
        />
        <div className="mt-4 flex justify-between gap-2">
          {renderStatusTags()}
        </div>
      </div>
    </div>
  );
};

export default index;