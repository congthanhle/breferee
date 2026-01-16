import { useLoadingStore } from '@/state';
import { Box } from 'zmp-ui';
import Star from '@/assets/icons/star.png';
import { useEffect } from 'react';

const Loading = () => {
  const { loading, text } = useLoadingStore();

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [loading]);

  return (
    <>
      {
        loading && (
          <Box
            className={
              loading
                ? 'fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.8)] z-[999]'
                : 'hidden'
            }
            flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <img
              src={Star}
              alt="Loading"
              className="w-14 h-14 animate-spin"
            />
            <p className="mt-4 text-primary text-lg font-medium">{text}</p>
          </Box>
        )
      }
    </>
  );
};

export default Loading;
