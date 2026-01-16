import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';

const Slider = ({ children = [], infinite = false, autoPlay = false, autoPlayDelay = 3000, dotColor = 'white', heightClass = 'h-72' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const totalSlides = children.length;

  useEffect(() => {
    if (!autoPlay || totalSlides === 0) return;

    const interval = setInterval(() => {
      handleNext();
    }, autoPlayDelay);

    return () => clearInterval(interval);
  }, [currentIndex, autoPlay, autoPlayDelay, totalSlides]);

  const handleNext = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentIndex((prev) => {
      if (prev === totalSlides - 1) {
        return infinite ? 0 : prev;
      }
      return prev + 1;
    });

    setTimeout(() => setIsTransitioning(false), 300);
  };

  const handlePrev = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentIndex((prev) => {
      if (prev === 0) {
        return infinite ? totalSlides - 1 : prev;
      }
      return prev - 1;
    });

    setTimeout(() => setIsTransitioning(false), 300);
  };

  const goToSlide = (index) => {
    if (isTransitioning || index === currentIndex) return;

    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (Math.abs(distance) < minSwipeDistance) return;

    if (distance > 0) {
      handleNext();
    } else {
      handlePrev();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  if (totalSlides === 0) return null;

  return (
    <div className={clsx('relative w-full', heightClass)}>
      <div
        className="overflow-hidden relative"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-300 ease-in-out will-change-transform"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {children.map((child, index) => (
            <div key={index} className="min-w-full">
              {child}
            </div>
          ))}
        </div>
      </div>
      {totalSlides > 1 && (
        <div className="flex justify-center gap-4 mt-4">
          {children.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="relative"
            >
              {index === currentIndex ? (
                <div
                  className={clsx(
                    'w-4 h-4 rounded-full flex items-center justify-center transition-all duration-300',
                    dotColor === 'red' ? 'border border-secondary' : 'border border-white'
                  )}
                >
                  <div
                    className={clsx(
                      'w-2 h-2 rounded-full',
                      dotColor === 'red' ? 'bg-secondary' : 'bg-white'
                    )}
                  />
                </div>
              ) : (
                <div
                  className={clsx(
                    'w-2 h-2 rounded-full transition-all duration-300',
                    dotColor === 'red' ? 'border border-black' : 'bg-white'
                  )}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Slider;