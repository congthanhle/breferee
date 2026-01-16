import { useState, useEffect } from 'react';
import clsx from 'clsx';
import Slider from '@/components/atoms/Slider';
import { useGuidesStore } from '@/state';

const Upcoming = ({ date, custom = false }) => {
  const { guides } = useGuidesStore();
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    if (!date) return;
    const calculateCountdown = () => {
      const targetDate = new Date(date).getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;
      if (difference <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      setCountdown({ days, hours, minutes, seconds });
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);

    return () => clearInterval(interval);
  }, [date]);

  return (
    <div className="mt-6 px-4">
      {
        date && (
          <div className="flex justify-center items-center mb-4 gap-4 relative z-10">
            <p className="text-white text-base text-right font-bold">Chương trình <br/> bắt đầu sau</p>
            <div className="flex gap-2">
              <div className="border border-white border-opacity-50 p-1 rounded-lg flex flex-col items-center justify-center w-12 h-14">
                <span className="text-primary text-xl font-semibold">{countdown.days}</span>
                <span className="text-white text-base">Ngày</span>
              </div>
              <div className="border border-white border-opacity-50 p-1 rounded-lg flex flex-col items-center justify-center w-12 h-14">
                <span className="text-primary text-xl font-semibold">{countdown.hours}</span>
                <span className="text-white text-base">Giờ</span>
              </div>
              <div className="border border-white border-opacity-50 p-1 rounded-lg flex flex-col items-center justify-center w-12 h-14">
                <span className="text-primary text-xl font-semibold">{countdown.minutes}</span>
                <span className="text-white text-base">Phút</span>
              </div>
              <div className="border border-white border-opacity-50 p-1 rounded-lg flex flex-col items-center justify-center w-12 h-14">
                <span className="text-primary text-xl font-semibold">{countdown.seconds}</span>
                <span className="text-white text-base">Giây</span>
              </div>
            </div>
          </div>
        )
      }
      <div className="pt-4 pb-8 max-w-md">
        <p className={clsx('text-2xl text-center font-bold mb-4', custom ? 'hidden' : 'text-white')}>Hướng dẫn tham gia</p>
        <Slider dotColor={custom ? 'red' : 'white'} infinite>
          {
            guides?.map((slider, index) => (
              <img key={index} src={slider} alt={`Slider ${index + 1}`} className="w-full" />
            ))
          }
        </Slider>
      </div>
    </div>
  );
};

export default Upcoming;