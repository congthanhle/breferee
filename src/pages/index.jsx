import { useState, useEffect, use } from 'react';
import ItemGraphic from '@/assets/images/graphics/main.png';
import { FETCH_DASHBOARD } from '@/store/campaign';
import HomeRunning from '@/components/molecules/Home/Running';
import HomeUpcoming from '@/components/molecules/Home/Upcoming';
import { isNowAfterDate, isNowBetweenDates } from '@/utils/datetime';
import { useLoadingStore, useGuidesStore } from '@/state';
import Button from '@/components/atoms/Button';
import Ended from '@/components/molecules/Home/Ended';
import Pending from '@/components/molecules/Home/Pending';
import { useSheetStore } from '@/state/sheet';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { rules } from '@/utils/consts/rules';

const index = () => {
  const {
    setGuides,
    setIsEndedShown,
    setIsFetchedDashboard,
    setIsPending,
    setPendingInfo,
    isEndedShown,
    isCheckFollow,
    isPending,
    isFetchedDashboard,
    campaign,
    setCampaign
  } = useGuidesStore();
  const [searchParams] = useSearchParams();
  const { setLoading } = useLoadingStore();
  const { openSheet, closeSheet, setSwipeToClose } = useSheetStore();
  const { checkFollowOa } = useAuth();

  const fetchData = async () => {
    try {
      setLoading(true);
      isCheckFollow && await checkFollowOa();
      if(isFetchedDashboard) return;
      const data = await FETCH_DASHBOARD();
      setCampaign(data);
      setIsEndedShown(isNowAfterDate(data?.campaigns?.end_time));
      setIsPending(isNowBetweenDates(data?.campaigns?.pending_from, data?.campaigns?.pending_to));
      setPendingInfo({
        pending_message: data?.campaigns?.pending_message,
        pending_warning: data?.campaigns?.pending_warning,
        pending_image: data?.campaigns?.pending_image
      });
      setGuides(data?.guiding || []);
      setIsFetchedDashboard(true);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    if(searchParams.get('is_show_rules')){
      setSwipeToClose(true);
      openSheet({
        title: 'Thể lệ chương trình',
        children: (
          <>
            <div dangerouslySetInnerHTML={{ __html: rules }} />;
            <Button text="Quay lại trang chủ" onClick={() => {
              closeSheet();
            }}/>
          </>
        )
      });
      return;
    }
  }, []);

  useEffect(() => {
    if (isEndedShown) {
      setSwipeToClose(true);
      openSheet({
        title: 'Thông báo',
        children: (
          <>
            <Ended />
            <Button
              text="Quay lại trang chủ"
              onClick={() => {
                closeSheet();
              }}
            />
          </>
        )
      });
      return;
    }
  }, [isEndedShown]);

  useEffect(() => {
    if (isPending) {
      setSwipeToClose(true);
      openSheet({
        title: 'Thông báo',
        children: (
          <>
            <Pending />
            <Button
              text="Quay lại trang chủ"
              onClick={() => {
                closeSheet();
              }}
            />
          </>
        )
      });
    }
  }, [isPending]);

  return (
    <div className="flex flex-col items-center pb-12">
      <img src={ItemGraphic} alt="Item Graphic" className="w-full -mt-8" />
      {
        campaign && (isNowAfterDate(campaign?.campaigns?.start_time) ? (
          <HomeRunning start_date={campaign?.campaigns?.start_time} end_date={campaign?.campaigns?.end_time} campaign={campaign}/>
        ) : (
          <HomeUpcoming date={campaign?.campaigns?.start_time}/>
        ))
      }
    </div>
  );
};

export default index;