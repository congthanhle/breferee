import { Sheet } from 'zmp-ui';
import { useEffect } from 'react';
import Background from '@/assets/images/backgrounds/sub.jpg';
import { useSheetStore } from '@/state/sheet';

const CustomSheet = () => {
  const { visible, title, children, closeSheet, swipeToClose } = useSheetStore();

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [visible]);

  return (
    <Sheet
      swipeToClose={swipeToClose}
      visible={visible}
      onClose={closeSheet}
      autoHeight
      mask
      maskClosable={swipeToClose}
      handler={false}
    >
      <div
        className="overflow-visible max-h-[90vh] min-h-[40vh] rounded-2xl bg-secondary"
        style={{ backgroundImage: `url(${Background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute h-1 w-16 -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary z-[1001]"></div>
        {title && (
          <div className="relative px-4 py-4">
            <h3 className="text-xl font-semibold text-center text-primary uppercase">
              {title}
            </h3>
          </div>
        )}
        <div className="px-6 pt-6 pb-12 flex flex-col items-center justify-between space-y-8  max-w-lg mx-auto overflow-y-auto bg-[#FFF8DF] rounded-t-3xl min-h-[calc(40vh-56px)] max-h-[calc(90vh-56px)]">
          {children}
        </div>
      </div>
    </Sheet>
  );
};

export default CustomSheet;