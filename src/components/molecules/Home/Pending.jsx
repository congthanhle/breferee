import EndedIcon from '@/assets/icons/items/ended.png';
import { useGuidesStore } from '@/state';

const Ended = () => {
  const { pendingInfo } = useGuidesStore();
  return (
    <div className="flex flex-col items-center justify-center text-center text-base">
      <img src={pendingInfo?.pending_image || EndedIcon} className="mb-6 w-32" />
      <p className="font-semibold text-xl mb-4">{pendingInfo?.pending_warning}</p>
      <p dangerouslySetInnerHTML={{ __html: pendingInfo?.pending_message }} />
    </div>
  );
};

export default Ended;