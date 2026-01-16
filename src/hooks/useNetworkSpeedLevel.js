import { SPEED_TEST_URL } from '@/utils/consts/url';
import { useGuidesStore } from '@/state';

export function useNetworkSpeedLevel () {
  const { fileSize } = useGuidesStore();
  const testSpeed = async () => {
    try {
      const url = `${SPEED_TEST_URL}?bytes=${fileSize * 1024 * 1024}`;
      const start = performance.now();
      const res = await fetch(url, { cache: 'no-store' });
      await res.blob();
      const end = performance.now();
      const seconds = (end - start) / 1000;
      const mbps = (fileSize * 8) / seconds;

      const value = +mbps.toFixed(2);
      console.log('Network speed test value (Mbps):', value, 'seconds: ', seconds);
      let calculatedLevel;
      if (value < 3) calculatedLevel = 1;
      else if (value < 8) calculatedLevel = 2;
      else calculatedLevel = 3;
      return calculatedLevel;
    } catch (e) {
      return 1;
    }
  };

  return {
    testSpeed,
  };
}
